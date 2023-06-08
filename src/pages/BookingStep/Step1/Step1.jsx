import React, { useEffect, useState } from 'react'
import styles from './Step1.module.scss'
import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkRoomsSelector, checkinDateSelector, checkoutDateSelector, roomTypesSelector, servicesSelector } from '../../../redux/selectors';
import BookingReview from '../../../components/BookingReview/BookingReview';
import { Divider } from 'antd';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaBed, FaUser, FaIdCard } from 'react-icons/fa';
import { FcOvertime } from 'react-icons/fc';
import { MdRoomService } from 'react-icons/md';
import checkin from "../../../img/checkin.jpg"
import checkout from "../../../img/chekout.png"
import coins from "../../../img/coins.png"
import currency from '../../../utils/currency';
import AuthUser from '../../../utils/AuthUser';
import { addTotalAmount, addTotalPeople, addTotalRooms, nextProgressStep } from '../../../redux/actions';

const cx = classNames.bind(styles);

const Step1 = ({ current, setCurrent, setTotalAmount, setTotalRooms, setTotalPeople }) => {

  const roomTypes = useSelector(roomTypesSelector);
  const services = useSelector(servicesSelector);
  const checkinDate = useSelector(checkinDateSelector);
  const checkoutDate = useSelector(checkoutDateSelector);
  const bookmarkRooms = useSelector(bookmarkRoomsSelector);

  const dispatch = useDispatch();
  const [customerInfo, setCustomerInfo] = useState();

  const checkinParts = checkinDate.split("/");
  const checkoutParts = checkoutDate.split("/");

  const startDate = new Date(checkinParts[2], checkinParts[1] - 1, checkinParts[0]);
  const endDate = new Date(checkoutParts[2], checkoutParts[1] - 1, checkoutParts[0]);

  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const { http } = AuthUser();

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    bookmarkRooms.forEach(bookmarkRoom => {
      const { roomTypeId } = bookmarkRoom;
      const roomType = roomTypes.find(type => type.id === roomTypeId);

      if (roomType) {
        totalPrice += roomType.price * daysDiff;
      }
    });

    if (services.length > 0) {
      services.forEach((service) => {
        totalPrice += service.price
      })
    }

    return totalPrice;
  };

  const calculateTotalPeople = () => {
    let totalPeople = 0;

    bookmarkRooms.forEach(bookmarkRoom => {
      const { roomTypeId } = bookmarkRoom;
      const roomType = roomTypes.find(type => type.id === roomTypeId);

      if (roomType) {
        totalPeople += roomType.numberCustomers;
      }
    });

    return totalPeople;
  };

  const handleConfirmInfo = () => {
    const totalAmount = calculateTotalPrice();
    const totalRooms = bookmarkRooms.length;
    const totalPeople = calculateTotalPeople()
    setTotalAmount(totalAmount);
    setTotalRooms(totalRooms);
    setTotalPeople(totalPeople);
    setCurrent(current + 1);
    dispatch(nextProgressStep(current + 1));
    dispatch(addTotalAmount(totalAmount));
    dispatch(addTotalRooms(totalRooms));
    dispatch(addTotalPeople(totalPeople));
  }

  useEffect(() => {
    const fetchData = () => {
      http.get(`/customer/account-customer`)
        .then((resolve) => {
          console.log(resolve);
          setCustomerInfo(resolve.data.customer);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx("booking-step-wrapper")}>
      <div className={cx("booking-step-wrapper__left")}>
        <h2>List Room Types Booking</h2>
        {
          roomTypes.map((roomType) => {
            return (
              <div key={roomType.id} className={cx("booking-review-wrapper")}>
                <BookingReview
                  image={roomType.image}
                  title={roomType.roomTypeName}
                  price={roomType.price}
                  ranking={5}
                  pointRanking={roomType.pointRanking}
                  type='Room'
                  numberCustomers={roomType.numberCustomers}
                  roomSize={roomType.roomSize}
                  totalRooms={roomType.totalRooms}
                  totalAverage={roomType.totalAverage}
                  totalReviews={roomType.totalFeedbacks}
                />
                <div className={cx("booking-rooms")}>
                  <h2>List Rooms: </h2>
                  <div className={cx("booking-rooms__data")}>
                    {
                      bookmarkRooms.map((bookmarkRoom) => {
                        if (bookmarkRoom.roomTypeId === roomType.id) {
                          return (
                            <button className={cx("room-info")}>
                              <p>{bookmarkRoom.roomName}</p>
                            </button>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
        {
          services.length > 0 && (
            <>
              <Divider className={cx("seperate-line")} />
              <h2>List Services Booking</h2>
              {
                services.map((service) => {
                  return (
                    <div key={service.id} className={cx("booking-review-wrapper")}>
                      <BookingReview
                        id={service.id}
                        image={service.image}
                        title={service.serviceName}
                        price={service.price}
                        ranking={service.totalAverage}
                        pointRanking={service.pointRanking}
                        type='Service'
                        totalAverage={service.totalAverage}
                        totalReviews={service.totalFeedbacks}
                      />
                    </div>
                  )
                })
              }
            </>
          )}
      </div>
      <div className={cx("booking-step-wrapper__right")}>
        <div className={cx("booking-reservation")}>
          <h2>Reservation Date</h2>
          <div className={cx("checkin-time")}>
            <div className={cx("checkin-time__title")}>
              <img src={checkin} alt="checkin" />
              <h3>Check-in Date</h3>
            </div>
            <h3 className={cx("checkin-time__data")}>{checkinDate}</h3>
          </div>
          <div className={cx("checkout-time")}>
            <div className={cx("checkout-time__title")}>
              <img src={checkout} alt="checkout" />
              <h3>Check-out Date</h3>
            </div>
            <h3 className={cx("checkout-time__data")}>{checkoutDate}</h3>
          </div>
        </div>

        <Divider className={cx("seperate-line")} />

        <div className={cx("booking-check-info")}>
          <h2>Booking Information</h2>
          <div className={cx("booking-check-info__date")}>
            <div className={cx("booking-check-title")}>
              <FcOvertime size={30} />
              <h3>Number of days</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{daysDiff}</p>
            </button>
          </div>
          <div className={cx("booking-check-info__totalrooms")}>
            <div className={cx("booking-check-title")}>
              <FaBed size={30} />
              <h3>Total rooms</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{bookmarkRooms.length}</p>
            </button>
          </div>
          <div className={cx("booking-check-info__totalservices")}>
            <div className={cx("booking-check-title")}>
              <MdRoomService size={30} />
              <h3>Total services</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{services.length}</p>
            </button>
          </div>
          <div className={cx("booking-check-info__totalpeople")}>
            <div className={cx("booking-check-title")}>
              <MdRoomService size={30} />
              <h3>Total People</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{calculateTotalPeople()}</p>
            </button>
          </div>
        </div>

        <Divider className={cx("seperate-line")} />

        <div className={cx("booking-user-info")}>
          <h2>Contact Information</h2>
          <div className={cx("booking-user-info__name")}>
            <div className={cx("booking-check-title")}>
              <FaUser size={30} />
              <h3>Full Name</h3>
            </div>
            <p>{customerInfo?.name}</p>
          </div>
          <div className={cx("booking-user-info__card")}>
            <div className={cx("booking-check-title")}>
              <FaIdCard size={30} />
              <h3>ID Card</h3>
            </div>
            <p>{customerInfo?.CMND}</p>
          </div>
          <div className={cx("booking-user-info__phone")}>
            <div className={cx("booking-check-title")}>
              <BsFillTelephoneFill size={30} />
              <h3>Phone</h3>
            </div>
            <p>{customerInfo?.phone}</p>
          </div>
        </div>

        <Divider className={cx("seperate-line")} />

        <div className={cx("booking-confirm-wrapper")}>
          <div className={cx("booking-total-price")}>
            <div className={cx("booking-total-price__title")}>
              <img src={coins} alt={'Coin'} />
              <h3>Total Amount: <span style={{color: '#f35221', fontSize: 24, fontWeight: 'bold'}}>{currency(calculateTotalPrice())}</span></h3>
            </div>
            <h2 className={cx("booking-total-price__total")}></h2>
          </div>
          <div className={cx("booking-confirm-btn")}>
            <button onClick={handleConfirmInfo}>
              <p>Payment</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1