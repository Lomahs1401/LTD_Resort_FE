import React, { useState } from "react";
import styles from "./ServiceDetail.module.scss";
import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Comment from "../../components/Comment/Comment";
import AuthUser from "../../utils/AuthUser";
import { BsCheckCircleFill } from 'react-icons/bs'
import { Rate, Divider, Pagination, Select, Form, Button, Input } from "antd";
import { BiArrowBack } from "react-icons/bi"
import { BsFillHeartFill, BsFillShareFill } from "react-icons/bs";
import { MdRoomService } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { TbDiamondFilled } from "react-icons/tb"
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { avatarSelector, favouritesServicesSelector } from "../../redux/selectors";
import currency from "../../utils/currency";
import booking_logo from '../../img/booknow.png'
import { addFavouriteService, removeFavouriteService } from "../../redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ref, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../../utils/firebase";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import checkout from "../../img/chekout.png"
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactDateRange from "../../components/ReactDateRange/ReactDateRange";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import { addDays, format } from "date-fns"
import dayjs from "dayjs";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const nameMapper = {
  ar: 'Arabic',
  bg: 'Bulgarian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  enGB: 'English (United Kingdom)',
  enUS: 'English (United States)',
  eo: 'Esperanto',
  es: 'Spanish',
  et: 'Estonian',
  faIR: 'Persian',
  fi: 'Finnish',
  fil: 'Filipino',
  fr: 'French',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  ko: 'Korean',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mk: 'Macedonian',
  nb: 'Norwegian Bokmål',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sr: 'Serbian',
  sv: 'Swedish',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  vi: 'Vietnamese',
  zhCN: 'Chinese Simplified',
  zhTW: 'Chinese Traditional'
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#8dd3bb", borderRadius: '50%', fontSize: 20 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#8dd3bb", borderRadius: '50%', fontSize: 20 }}
      onClick={onClick}
    />
  );
}

export const ServiceDetail = () => {
  const loginFormLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
  };

  const { serviceId } = useParams();
  const { http, user } = AuthUser();
  const location = useLocation();
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const [firebaseUrl, setFirebaseUrl] = useState(`gs://ltd-resort.appspot.com/services/${serviceId}/`)

  const imageSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    speed: 1000,
    nextArrow: <SampleNextArrow style={{ backgroundColor: 'green' }} />,
    prevArrow: <SamplePrevArrow style={{ backgroundColor: 'red' }} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [isLoading, setIsLoading] = useState(false);

  // Fetch random list room types state
  const [listRandomServices, setListRandomServices] = useState([]);

  // Fetch service detail state
  const [serviceDetail, setServiceDetail] = useState({});

  // Fetch list image state
  const imageList = location.state?.imageList || [];
  const [currentImageList, setCurrentImageList] = useState([]);
  const [isImageListLoaded, setIsImageListLoaded] = useState(false);
  const imageRef = ref(storage, firebaseUrl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector(avatarSelector);
  const favouritesServices = useSelector(favouritesServicesSelector);

  const [locale, setLocale] = useState('enUS');
  const [rangeDate, setRangeDate] = useState([{
    startDate: new Date(),
    endDate: addDays(new Date(), 0),
    key: "selection"
  }]);

  const options = Object.entries(nameMapper).map(([value, label]) => ({ value, label }));
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setLocale(value);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const customParseFormat = require('dayjs/plugin/customParseFormat');
  dayjs.extend(customParseFormat);

  // Pagination state
  const pageSizeOptions = [5, 10, 20];
  const DEFAULT_CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE_NUMBER = 5;
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_NUMBER);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [totalVerifiedFeedbacks, setTotalVerifiedFeedbacks] = useState(0);
  const [form] = Form.useForm();

  const [toggleFavourite, setToggleFavourite] = useState(() => {
    let isToggleFavourite = false;
    favouritesServices.some((favouriteService) => {
      if (favouriteService.id === parseInt(serviceId)) {
        isToggleFavourite = true;
        return true;
      } else {
        return false;
      }
    })
    return isToggleFavourite;
  });

  const handleClickFavourite = () => {
    if (!toggleFavourite) {
      dispatch(addFavouriteService({
        id: parseInt(serviceId),
        image: serviceDetail.image,
        title: serviceDetail.room_type_name,
        price: serviceDetail.price,
        ranking: serviceDetail.point_ranking,
        type: "Room",
        capacity: serviceDetail.number_customers,
        listRooms: serviceDetail.number_rooms,
        area: serviceDetail.room_size,
      }));
      setToggleFavourite(true);
    } else {
      dispatch(removeFavouriteService(parseInt(serviceId)));
      setToggleFavourite(false);
    }
  }

  const handleClickPaginate = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  }

  const handleShowSizeChange = (currentPage, pageSize) => {
    console.log(currentPage, pageSize);
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  }

  const handleClickBookingNow = () => {
    document.getElementById('booking-room').scrollIntoView({ behavior: 'smooth' })
  }

  const onFinish = (values) => {
    const formData = new FormData();
    const bookTime = format(rangeDate[0].startDate, "dd/MM/yyyy");
    const bookTimeFormat = dayjs(bookTime, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD')

    formData.append('service_id', serviceId);
    formData.append('quantity', values.quantity);
    formData.append('book_time', bookTimeFormat);

    console.log(bookTimeFormat);

    http.post('/customer/store-bill-service', formData)
      .then((resolve) => {
        console.log(resolve);
        Swal.fire(
          'Successfully Booked!',
          'You have successfully book service',
          'success'
        ).then(() => {
          navigate(1);
        })
      })
      .catch((reject) => {
        console.log(reject);
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Please input all fields', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  };

  useEffect(() => {
    const fetchImage = () => {
      let fetchedImages = []; // Tạo một mảng tạm để lưu trữ các ảnh lấy được từ Firebase

      listAll(imageRef)
        .then((response) => {
          const promises = response.items.map((item) => {
            return getDownloadURL(item)
              .then((url) => {
                fetchedImages.push(url); // Thêm ảnh vào mảng tạm
              })
              .catch((error) => {
                console.log(error);
              });
          });

          Promise.all(promises).then(() => {
            setCurrentImageList(fetchedImages); // Cập nhật state ImageList với các ảnh đã lấy được
            setIsImageListLoaded(true); // Cập nhật giá trị của isImageListLoaded
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (imageList.length === 0) {
      // Chỉ gọi fetchImage khi imageList chưa có ảnh nào
      fetchImage();
    }

    setIsLoading(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

  useEffect(() => {
    const fetchData = () => {
      http.get(`/customer/services/random/${serviceId}`)
        .then((resolve) => {
          setListRandomServices(resolve.data.list_random_services);
        })
        .catch((reject) => {
          console.log(reject);
        })
      http.get(`/customer/services/${serviceId}`)
        .then((resolve) => {
          console.log(resolve);
          setServiceDetail(resolve.data.service);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get(`/auth/feedbacks/service/total/${serviceId}`)
        .then((resolve) => {
          console.log(resolve);
          setTotalFeedbacks(resolve.data.total_feedback_services);
        })
        .catch((error) => {
          console.log(error);
        })

      http.get(`/auth/feedbacks/average-rate/service/${serviceId}`)
        .then((resolve) => {
          console.log(resolve);
          setAverageRating(resolve.data.average_rating_service);
        })
        .catch((error) => {
          console.log(error);
        })

      http.get(`/auth/feedbacks/service/total-verified/${serviceId}`)
        .then((resolve) => {
          console.log(resolve);
          setTotalVerifiedFeedbacks(resolve.data.total_verified_feedback_services);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

  useEffect(() => {
    const fetchFeedbacks = () => {

      http.get(`/auth/feedbacks/${serviceId}/service/paginate/${currentPage}/${pageSize}`)
        .then((resolve) => {
          console.log(resolve);
          setFeedbacks(resolve.data.list_feedbacks);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, serviceId])

  if (!isLoading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div>
        <Header active='Find Services' userInfo={user} imageUrl={avatar} />

        <div className={cx("service-content")}>
          <Link
            to="/find-services"
            className={cx("link-back")}
          >
            <BiArrowBack />
            Back
          </Link>
          <div className={cx("service-info")}>
            <div className={cx("service-info__left")}>
              <h2>{serviceDetail.service_name}</h2>
              <div className={cx("achievement")}>
                <div className={cx("achievement__left")}>
                  <Rate
                    disabled
                    value={Math.round(averageRating).toFixed(0)}
                    tooltips={RATING_DESC}
                    style={{ color: "#FF8682" }}
                  />
                  <p className={cx("achievement-desc")}>{Math.round(averageRating).toFixed(0)} Star Service</p>
                </div>
                <div className={cx("achievement__right")}>
                  <TbDiamondFilled size={25} style={{ color: "#FFD700	" }} />
                  <p className={cx("achievement-desc")}>{serviceDetail.point_ranking} Points</p>
                </div>
              </div>
            </div>
            <div className={cx("service-info__right")}>
              <p>Price from</p>
              <h1 style={{ color: "#FF8682" }}>
                {serviceDetail?.price && currency(serviceDetail?.price)}
              </h1>
              <div className={cx("button")}>
                <div className={cx("button__left")}>
                  <button
                    className={toggleFavourite ? cx("btn-toggle") : cx("btn-untoggle")}
                    onClick={handleClickFavourite}
                  >
                    <BsFillHeartFill />
                  </button>
                  <button>
                    <BsFillShareFill />
                  </button>
                </div>
                <div
                  className={cx("button__right")}
                  onClick={handleClickBookingNow}
                >
                  <button>Book now</button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("image-carousel")}>
            {isImageListLoaded && (
              <Slider {...imageSettings}>
                {currentImageList.map((image, index) => {
                  return (
                    <div className={cx("image-container")} key={index}>
                      <LazyLoadImage
                        key={index}
                        src={image}
                        alt={`Pic ${index}`}
                        effect="blur"
                        placeholderSrc={image}
                      />
                    </div>
                  )
                })}
              </Slider>
            )}
          </div>

          <Divider className={cx("seperate-line")} />

          <div className={cx("overview")}>
            <h1>Overview</h1>
            <p>{serviceDetail.description}</p>
            <div className={cx("strength")}>
              <div className={cx("box__special")}>
                <h3>{averageRating.toFixed(2)}</h3>
                <div>
                  {(() => {
                    if (totalFeedbacks === 0) {
                      return (
                        <h4>No comment yet</h4>
                      )
                    } else {
                      if (averageRating > 4) {
                        return (
                          <h4>Wonderful</h4>
                        )
                      } else if (averageRating > 3 && averageRating <= 4) {
                        return (
                          <h4>Good</h4>
                        )
                      } else if (averageRating > 2 && averageRating <= 3) {
                        return (
                          <h4>Normal</h4>
                        )
                      } else if (averageRating > 1 && averageRating <= 2) {
                        return (
                          <h4>Not Good</h4>
                        )
                      } else {
                        return (
                          <h4>Bad</h4>
                        )
                      }
                    }
                  })()}
                  {totalFeedbacks === 1 ? `${totalFeedbacks} Review` : `${totalFeedbacks} Reviews`}
                </div>
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Near beach
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Near mall
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Amusement Parks
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Clean Room
              </div>
            </div>
          </div>

          <Divider className={cx("seperate-line")} />

          <div id="booking-room" className={cx("booking-room-container")}>
            <h1>Booking Section</h1>
            <div className={cx("find-room")}>
              <div className={cx("booking-title")}>
                <img src={booking_logo} alt='Booking icon' />
                <h1>Choose booking time</h1>
              </div>
              <div className={cx("locale-date-range")}>
                <Select
                  showSearch
                  placeholder="Select Language"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  style={{ width: 200 }}
                  options={options}
                  onChange={onChange}
                  onSearch={onSearch}
                />
              </div>
              <div className={cx("date-range-wrapper")}>
                <div className={cx("date-range-wrapper__left")}>
                  <ReactDateRange locale={locale} rangeDate={rangeDate} setRangeDate={setRangeDate} />
                </div>
                <div className={cx("date-range-wrapper__right")}>
                  <div className={cx("date-range-checkin-time")}>
                    <div className={cx("date-range-checkin-time__title")}>
                      <img src={checkout} alt="checkin" />
                      <h1>Book Date</h1>
                    </div>
                    <div className={cx("date-range-checkin-time__data")}>
                      <h3>Book Date: <span>{format(rangeDate[0].startDate, "dd/MM/yyyy")}</span></h3>
                    </div>
                  </div>

                  <Divider className="seperate-inline" />

                  <div className={cx("find-room-wrapper")}>
                    <Form
                      {...loginFormLayout}
                      form={form}
                      layout='vertical'
                      name='login_form'
                      labelAlign='left'
                      labelWrap='true'
                      size='large'
                      autoComplete="off"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                          {
                            required: true,
                            message: 'Quantity is required!',
                          },
                        ]}
                        hasFeedback
                      >
                        <Input />
                      </Form.Item>
                      <Button className={cx("btn-find-room")} htmlType="submit">
                        <BsCheckCircleFill size={20} />
                        <p>Book Service</p>
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider className={cx("seperate-line")} />

          <div className={cx("review-wrapper")}>
            <div className={cx("review-wrapper__left")}>
              <h2>Reviews</h2>
              <div className={cx("score")}>
                <h1>{averageRating.toFixed(2)}</h1>
                <div className={cx("summary")}>
                  {(() => {
                    if (totalFeedbacks === 0) {
                      return (
                        <h4>Be the first one comment!</h4>
                      )
                    } else {
                      if (averageRating > 4) {
                        return (
                          <>
                            <h4>Wonderful</h4>
                            <p>{totalVerifiedFeedbacks} verified {totalVerifiedFeedbacks <= 1 ? "review" : "reviews"}</p>
                          </>
                        )
                      } else if (averageRating > 3 && averageRating <= 4) {
                        return (
                          <>
                            <h4>Good</h4>
                            <p>{totalVerifiedFeedbacks} verified {totalVerifiedFeedbacks <= 1 ? "review" : "reviews"}</p>
                          </>
                        )
                      } else if (averageRating > 2 && averageRating <= 3) {
                        return (
                          <>
                            <h4>Normal</h4>
                            <p>{totalVerifiedFeedbacks} verified {totalVerifiedFeedbacks <= 1 ? "review" : "reviews"}</p>
                          </>
                        )
                      } else if (averageRating > 1 && averageRating <= 2) {
                        return (
                          <>
                            <h4>Not Good</h4>
                            <p>{totalVerifiedFeedbacks} verified {totalVerifiedFeedbacks <= 1 ? "review" : "reviews"}</p>
                          </>
                        )
                      } else {
                        return (
                          <>
                            <h4>Bad</h4>
                            <p>{totalVerifiedFeedbacks} verified {totalVerifiedFeedbacks <= 1 ? "review" : "reviews"}</p>
                          </>
                        )
                      }
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>

          <div className={cx("comment")}>
            {feedbacks.map((feedback, index) => {
              if (index === feedbacks.length - 1) {
                return (
                  <Comment
                    key={index}
                    accountId={feedback.account_id}
                    avatar={feedback.avatar}
                    comment={feedback.comment}
                    username={feedback.username}
                    rating={feedback.rating}
                    fullName={feedback.full_name}
                    email={feedback.email}
                    gender={feedback.gender}
                    birthDate={feedback.birthday}
                    ID_Card={feedback.CMND}
                    address={feedback.address}
                    phone={feedback.phone}
                    rankingPoint={feedback.ranking_point}
                  />
                )
              } else {
                return (
                  <>
                    <Comment
                      key={feedback.id}
                      accountId={feedback.account_id}
                      avatar={feedback.avatar}
                      comment={feedback.comment}
                      username={feedback.username}
                      rating={feedback.rating}
                      fullName={feedback.full_name}
                      email={feedback.email}
                      gender={feedback.gender}
                      birthDate={feedback.birthday}
                      ID_Card={feedback.CMND}
                      address={feedback.address}
                      phone={feedback.phone}
                      rankingPoint={feedback.ranking_point}
                    />
                    <Divider className={cx("seperate-line")} />
                  </>
                )
              }
            })}
            <div className={cx("pagination")}>
              <Pagination
                current={currentPage}
                defaultCurrent={DEFAULT_CURRENT_PAGE_NUMBER}
                defaultPageSize={DEFAULT_PAGE_SIZE_NUMBER}
                hideOnSinglePage
                total={totalFeedbacks}
                pageSizeOptions={pageSizeOptions}
                showTotal={(totalFeedbacks) => totalFeedbacks <= 1 ? `Total ${totalFeedbacks} feedback` : `Total ${totalFeedbacks} feedbacks`}
                showQuickJumper
                showSizeChanger
                onChange={handleClickPaginate}
                onShowSizeChange={handleShowSizeChange}
              />
            </div>
          </div>

          <Divider className={cx("seperate-line")} />

          <div className={cx("section-random")}>
            <div className={cx("section-random__title")}>
              <MdRoomService size={30} />
              <h1>Some other services you may be interested in</h1>
            </div>
            <div className={cx("section-random__list-rooms")}>
              {listRandomServices.map((randomService) => {
                return (
                  <OverviewCard
                    key={randomService.id}
                    id={randomService.id}
                    image={randomService.image}
                    title={randomService.service_name}
                    price={randomService.price}
                    ranking={randomService.average_rating}
                    type={'Service'}
                    currentImageList={currentImageList}
                    setFirebaseUrl={setFirebaseUrl}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
};

export default ServiceDetail;
