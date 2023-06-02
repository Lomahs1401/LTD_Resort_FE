import React, { useState, useEffect } from "react";
import styles from "./RoomTypeDetail.module.scss";
import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Comment from "../../components/Comment/Comment";
import AuthUser from "../../utils/AuthUser";
import { Rate, Divider, Pagination, Select } from "antd";
import { BiArrowBack, BiSpa, BiDrink } from "react-icons/bi"
import { BsFillCartCheckFill, BsFillHeartFill, BsFillShareFill, BsWifi } from "react-icons/bs";
import { IoSparkles, IoRestaurant, IoCafe, IoPersonSharp, IoBedSharp } from "react-icons/io5";
import { FaSwimmingPool, FaConciergeBell, FaSearch } from "react-icons/fa";
import { IoIosBed, IoIosFitness } from "react-icons/io";
import { GiAchievement } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { avatarSelector, bookmarkRoomsSelector, favouritesRoomsSelector } from "../../redux/selectors";
import { addFavouriteRoom, removeFavouriteRoom, addCheckinDate, addCheckoutDate } from "../../redux/actions";
import { ref, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../../utils/firebase";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { addDays, format } from "date-fns"
import BookingRoom from "../../components/BookingRoom/BookingRoom";
import Swal from "sweetalert2";
import currency from "../../utils/currency";
import booking_logo from '../../img/booknow.png'
import checkin from "../../img/checkin.jpg"
import checkout from "../../img/chekout.png"
import Loading from "../../components/Loading/Loading";
import Slider from "react-slick";
import ReactDateRange from "../../components/ReactDateRange/ReactDateRange";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import OverviewCard from "../../components/OverviewCard/OverviewCard";

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

export const RoomTypeDetail = () => {
  const { roomTypeId } = useParams();
  const { http, user } = AuthUser();
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const FIREBASE_URL = `gs://ltd-resort.appspot.com/room-types/${roomTypeId}/`;

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

  const bookingSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
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
  const [listRandomRoomTypes, setListRandomRoomTypes] = useState([]);

  // Fetch room type state
  const [roomTypeDetail, setRoomTypeDetail] = useState({});
  const [totalRooms, setTotalRooms] = useState(0);

  const [listAreas, setListAreas] = useState([]);

  // Fetch list image state
  const [imageList, setImageList] = useState([]);
  const imageRef = ref(storage, FIREBASE_URL);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selector
  const avatar = useSelector(avatarSelector);
  const favouritesRooms = useSelector(favouritesRoomsSelector);
  const bookmarkRooms = useSelector(bookmarkRoomsSelector);

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

  const [locale, setLocale] = useState('enUS');
  const [rangeDate, setRangeDate] = useState([{
    startDate: new Date(),
    endDate: addDays(new Date(), 1), 
    key: "selection"
  }]);

  const options = Object.entries(nameMapper).map(([value, label]) => ({ value, label }));

  const [toggleFavourite, setToggleFavourite] = useState(() => {
    let isToggleFavourite = false;
    favouritesRooms.some((favouriteRoom) => {
      if (favouriteRoom.id === parseInt(roomTypeId)) {
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
      dispatch(addFavouriteRoom({
        id: parseInt(roomTypeId),
        image: roomTypeDetail.image,
        title: roomTypeDetail.room_type_name,
        price: roomTypeDetail.price,
        ranking: roomTypeDetail.point_ranking,
        type: "Room",
        capacity: roomTypeDetail.number_customers,
        listRooms: roomTypeDetail.number_rooms,
        area: roomTypeDetail.room_size,
      }));
      setToggleFavourite(true);
    } else {
      dispatch(removeFavouriteRoom(parseInt(roomTypeId)));
      setToggleFavourite(false);
    }
  }

  const giveYourReview = () => {
    toast.success('Give your review', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
    })
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

  const handleClickBookingRoom = () => {
    if (bookmarkRooms.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No room chosen',
        text: 'You haven\'t selected any room yet!',
      })
    } else {
      // dispatch(addRoomTypes(roomTypeDetail))
      navigate(`/booking/${roomTypeId}`);
    }
  }

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setLocale(value);
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleFindRoom = () => {
    dispatch(addCheckinDate(format(rangeDate[0].startDate, "dd/MM/yyyy")))
    dispatch(addCheckoutDate(format(rangeDate[0].endDate, "dd/MM/yyyy")))
    document.getElementById('reservation-room').scrollIntoView({ behavior: 'smooth' })
  }

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
            setImageList(fetchedImages); // Cập nhật state ImageList với các ảnh đã lấy được
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
  }, [])

  useEffect(() => {
    const fetchData = () => {
      http.get(`/auth/room-types/random`)
        .then((resolve) => {
          setListRandomRoomTypes(resolve.data.list_random_room_types);
        })
        .catch((reject) => {
          console.log(reject);
        })
      http.get(`/auth/room-types/${roomTypeId}`)
        .then((resolve) => {
          setRoomTypeDetail(resolve.data.room_type);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get(`/auth/room-types/total-rooms/${roomTypeId}`)
        .then((resolve) => {
          setTotalRooms(resolve.data.number_of_rooms);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get(`/auth/feedbacks/room-type/total/${roomTypeId}`)
        .then((resolve) => {
          console.log(resolve);
          setTotalFeedbacks(resolve.data.total_feedback_rooms);
        })
        .catch((error) => {
          console.log(error);
        })

      http.get(`/auth/feedbacks/average-rate/room/${roomTypeId}`)
        .then((resolve) => {
          console.log(resolve);
          setAverageRating(resolve.data.average_rating_room_type);
        })
        .catch((error) => {
          console.log(error);
        })

      http.get(`/auth/feedbacks/room-type/total-verified/${roomTypeId}`)
        .then((resolve) => {
          console.log(resolve);
          setTotalVerifiedFeedbacks(resolve.data.total_verified_feedback_room_types);
        })
        .catch((error) => {
          console.log(error);
        })

      http.get(`/auth/areas`)
        .then((resolve) => {
          console.log(resolve);
          setListAreas(resolve.data.list_areas);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchFeedbacks = () => {

      http.get(`/auth/feedbacks/${roomTypeId}/room/paginate/${currentPage}/${pageSize}`)
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
  }, [currentPage, pageSize])

  if (!isLoading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div>
        <Header active='Find Rooms' userInfo={user} imageUrl={avatar} />

        <div className={cx("room-content")}>
          <Link
            to="/find-rooms"
            className={cx("link-back")}
          >
            <BiArrowBack />
            Back
          </Link>
          <div className={cx("room-info")}>
            <div className={cx("room-info__left")}>
              <h2>{roomTypeDetail.room_type_name}</h2>
              <div className={cx("achievement")}>
                <div className={cx("achievement__left")}>
                  <Rate
                    disabled
                    defaultValue={5}
                    tooltips={RATING_DESC}
                    style={{ color: "#FF8682" }}
                  />
                  <p className={cx("achievement-desc")}>5 Star Room</p>
                </div>
                <div className={cx("achievement__right")}>
                  <GiAchievement size={25} style={{ color: "#FFD700	" }} />
                  <p className={cx("achievement-desc")}>Star</p>
                </div>
              </div>
              <div className={cx("detail")}>
                <div className={cx("detail-person")}>
                  <IoPersonSharp />
                  <p>{roomTypeDetail?.number_customers} {roomTypeDetail?.number_customers === 1 ? "person" : "persons"}</p>
                </div>
                <div className={cx("detail-rooms")}>
                  <IoBedSharp />
                  <p>{totalRooms} rooms</p>
                </div>
                <div className={cx("detail-size")}>
                  <RxDimensions />
                  <p>{roomTypeDetail.room_size} m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div className={cx("room-info__right")}>
              <p>Price from</p>
              <h1 style={{ color: "#FF8682" }}>
                {roomTypeDetail?.price && currency(roomTypeDetail?.price)}
                <sub>/Night</sub>
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
                <div className={cx("button__right")}>
                  <button onClick={handleClickBookingNow}>Book now</button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("image-carousel")}>
            <Slider {...imageSettings}>
              {imageList.map((image, index) => {
                return (
                  <div className={cx("image-container")} key={index}>
                    <LazyLoadImage
                      key={image}
                      src={image}
                      alt={`Pic ${index}`}
                      effect="blur"
                      placeholderSrc={image}
                    />
                  </div>
                )
              })}
            </Slider>
          </div>

          <Divider className={cx("seperate-line")} />

          <div className={cx("overview")}>
            <h1>Overview</h1>
            <p>{roomTypeDetail.description}</p>
            <div className={cx("strength")}>
              <div className={cx("box__special")}>
                {totalFeedbacks !== 0 ? <h3>{averageRating.toFixed(2)}</h3> : <h3>No review yet</h3>}
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

          <div className={cx("room-type-info")}>
            <div className={cx("room-type-info__left")}>
              <h1>Check-in time/Check-out time</h1>
              <div className={cx("checkin-container")}>
                <div className={cx("checkin-time")}>
                  <div className={cx("checkin-time__left")}>
                    <img src={checkin} alt="checkin" />
                    <h2>Check-in time</h2>
                  </div>
                  <div className={cx("checkin-time__right")}>
                    <h2>from 2:00 pm</h2>
                  </div>
                </div>
                <div className={cx("checkout-time")}>
                  <div className={cx("checkout-time__left")}>
                    <img src={checkout} alt="checkout" />
                    <h2>Check-out time</h2>
                  </div>
                  <div className={cx("checkout-time__right")}>
                    <h2>before 12.00 am</h2>
                  </div>
                </div>
              </div>
            </div>

            <Divider className={cx("seperate-line")} type="vertical" style={{ height: 200 }} />

            <div className={cx("room-type-info__right")}>
              <h1>Amenities</h1>
              <div className={cx("amenities")}>
                <div className={cx("amenities-attributes")}>
                  <div className={cx("amenities-attributes__icons")}>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <FaSwimmingPool size={20} />
                      Outdoor pool
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <FaSwimmingPool size={20} />
                      Indoor pool
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <BiSpa size={20} />
                      Spa and wellness center
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <IoRestaurant size={20} />
                      Restaurant
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <FaConciergeBell size={20} />
                      Room service
                    </div>
                  </div>
                  <div className={cx("amenities-attributes__icons")}>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <IoIosFitness size={20} />
                      Fitness center
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <BiDrink size={20} />
                      Bar/Lounge
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <BsWifi size={20} />
                      Free Wi-Fi
                    </div>
                    <div className={cx("amenities-attributes__icons-item")}>
                      <IoCafe size={20} />
                      Tea/coffee machine
                    </div>
                    <div
                      className={cx("amenities-attributes__icons-item")}
                      style={{ color: "orange" }}
                    >
                      +24 more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider className={cx("seperate-line")} />

          <div id="booking-room" className={cx("booking-room-container")}>
            <h1>Reservations</h1>
            <div className={cx("find-room")}>
              <div className={cx("booking-title")}>
                <img src={booking_logo} alt='Booking icon' />
                <h1>Find Your Room</h1>
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
                      <img src={checkin} alt="checkin" />
                      <h1>Check-in Date</h1>
                    </div>
                    <div className={cx("date-range-checkin-time__data")}>
                      <h3>Start Date: <span>{format(rangeDate[0].startDate, "dd/MM/yyyy")}</span></h3>
                    </div>
                  </div>
                  <div className={cx("date-range-checkout-time")}>
                    <div className={cx("date-range-checkout-time__title")}>
                      <img src={checkout} alt="checkout" />
                      <h1>Check-out Date</h1>
                    </div>
                    <div className={cx("date-range-checkout-time__data")}>
                      <h3>End Date: <span>{format(rangeDate[0].endDate, "dd/MM/yyyy")}</span></h3>
                    </div>
                  </div>
                  <div className={cx("find-room-wrapper")}>
                    <button className={cx("btn-find-room")} onClick={handleFindRoom}>
                      <FaSearch size={20} />
                      <p>Find Room</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="reservation-room" className={cx("booking-container")}>
              <div className={cx("booking-container__left")}>
                <div className={cx("booking-container__left-detail")}>
                  <Slider {...bookingSettings}>
                    {listAreas.map((area, index) => {
                      return (
                        <div key={index}>
                          <BookingRoom
                            areaId={area.id}
                            areaName={area.area_name}
                            roomTypeId={parseInt(roomTypeId)}
                            roomTypeName={roomTypeDetail.room_type_name}
                            roomSize={roomTypeDetail.room_size}
                            totalRooms={totalRooms}
                            numberCustomers={roomTypeDetail.number_customers}
                            description={roomTypeDetail.description}
                            image={roomTypeDetail.image}
                            price={roomTypeDetail.price}
                            pointRanking={roomTypeDetail.point_ranking}
                          />
                        </div>
                      )
                    })}
                  </Slider>
                </div>
              </div>
              <div className={cx("booking-container__right")}>
                <div className={cx("cart-container")}>
                  <h1>Cart</h1>
                  <div className={cx("cart-detail")}>
                    <div className={cx("cart-detail__top")}>
                      <div className={cx("cart-detail__top-left")}>
                        <IoIosBed size={30} />
                        <h3>Total rooms currently booked</h3>
                      </div>

                      <div className={cx("cart-detail__top-right")}>
                        <h3>{bookmarkRooms.length}</h3>
                      </div>
                    </div>
                    <div className={cx("cart-detail__bottom")}>
                      <button
                        className={cx("cart-btn")}
                        onClick={handleClickBookingRoom}
                      >
                        <BsFillCartCheckFill size={24} />
                        <p>Book</p>
                      </button>
                    </div>
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
                {totalFeedbacks !== 0 ? <h1>{averageRating.toFixed(2)}</h1> : <h1>No review yet</h1>}
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
            <div className={cx("review-wrapper__right")}>
              <button onClick={giveYourReview}>Give your review</button>
            </div>
          </div>

          <div className={cx("comment")}>
            {feedbacks.map((feedback, index) => {
              if (index === feedbacks.length - 1) {
                return (
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
            <h1>Some other room types you may be interested in</h1>
            <div className={cx("section-random__list-rooms")}>
              {listRandomRoomTypes.map((randomRoomType) => {
                return (
                  <OverviewCard
                    key={randomRoomType.id}
                    id={randomRoomType.id}
                    image={randomRoomType.image}
                    title={randomRoomType.room_type_name}
                    price={randomRoomType.price}
                    ranking={5}
                    type={'Room'}
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

export default RoomTypeDetail;
