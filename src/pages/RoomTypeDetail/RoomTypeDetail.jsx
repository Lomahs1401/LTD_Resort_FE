import React, { useState } from "react";
import styles from "./RoomTypeDetail.module.scss";
import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Comment from "../../components/Comment/Comment";
import AuthUser from "../../utils/AuthUser";
import { Rate, Divider, Pagination } from "antd";
import { BiArrowBack } from "react-icons/bi"
import { BsFillHeartFill, BsFillShareFill, BsWifi } from "react-icons/bs";
import { IoSparkles, IoRestaurant, IoCafe, IoPersonSharp, IoBedSharp } from "react-icons/io5";
import { FaSwimmingPool, FaConciergeBell } from "react-icons/fa";
import { BiSpa, BiDrink } from "react-icons/bi";
import { IoIosFitness } from "react-icons/io";
import { GiAchievement } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { avatarSelector, favouritesRoomsSelector } from "../../redux/selectors";
import currency from "../../utils/currency";
import { addFavouriteRoom, removeFavouriteRoom } from "../../redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ref, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../../utils/firebase";
import Loading from "../../components/Loading/Loading";
import checkin from "../../img/checkin.jpg"
import checkout from "../../img/chekout.png"
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

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

  const settings = {
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

  // Fetch room type state
  const [roomTypeDetail, setRoomTypeDetail] = useState({});
  // Fetch feedbacks state
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch list image state
  const [imageList, setImageList] = useState([]);
  const imageRef = ref(storage, FIREBASE_URL);

  const dispatch = useDispatch();
  const avatar = useSelector(avatarSelector);
  const favouritesRooms = useSelector(favouritesRoomsSelector);

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

  var totalRating = 0;
  var averageRating = 0;
  var totalVerifiedReviews = 0;

  totalRating = feedbacks.reduce((sum, feedback) => {
    return sum + feedback.rating
  }, 0);

  averageRating = totalRating / feedbacks.length;

  totalVerifiedReviews = feedbacks.reduce((sum, feedback) => {
    if (feedback.feedback_status === "Feedbacked") {
      return sum + 1;
    }
    return sum;
  }, 0);

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
      http.get(`/auth/room-types/${roomTypeId}`)
        .then((resolve) => {
          setRoomTypeDetail(resolve.data.room_type);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchFeedbacks = () => {
      http.get(`/auth/feedbacks/room-type/${roomTypeId}`).then((resolve) => {
        console.log(resolve);
        setFeedbacks(resolve.data.list_feedback_rooms);
      }).catch((error) => {
        console.log(error);
      })
    }

    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                  <p>
                    {
                      roomTypeDetail.number_customers > 1
                        ? `${roomTypeDetail.number_customers} persons`
                        : `${roomTypeDetail.number_customers} person`
                    }
                  </p>
                </div>
                <div className={cx("detail-rooms")}>
                  <IoBedSharp />
                  <p>{roomTypeDetail.number_rooms} rooms</p>
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
                  <button>Book now</button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("image-carousel")}>
            <Slider {...settings}>
              {imageList.map((image, index) => {
                return (
                  <div className={cx("image-container")} key={index}>
                    <img src={image} title={`Image ${index}`} alt="Room Type" />
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
                <h3>{averageRating}</h3>
                <div>
                  {(() => {
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
                  })()}
                  {feedbacks.length === 1 ? `${feedbacks.length} Review` : `${feedbacks.length} Reviews`}
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

          <div className={cx("review-wrapper")}>
            <div className={cx("review-wrapper__left")}>
              <h2>Reviews</h2>
              <div className={cx("score")}>
                <h1>{averageRating}</h1>
                <div className={cx("summary")}>
                  {(() => {
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
                  })()}
                  <p>{totalVerifiedReviews} verified {totalVerifiedReviews <= 1 ? "review" : "reviews"}</p>
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
            <div className="pagination">
              <Pagination defaultCurrent={1} total={12} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
};

export default RoomTypeDetail;
