import React from 'react'
import styles from './Step2.module.scss'
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';
import { checkinDateSelector, checkoutDateSelector, roomTypesSelector } from '../../../redux/selectors';
import BookingReview from '../../../components/BookingReview/BookingReview';
import { Divider } from 'antd';
import checkin from "../../../img/checkin.jpg"
import checkout from "../../../img/chekout.png"
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const Step2 = () => {

  const roomTypes = useSelector(roomTypesSelector);
  const checkinDate = useSelector(checkinDateSelector);
  const checkoutDate = useSelector(checkoutDateSelector);
  console.log(checkinDate);

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
              </div>
            )
          })
        }
        <Divider className={cx("seperate-line")} />
        <h2>List Services Booking</h2>
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

        <div>

        </div>

        <Divider className={cx("seperate-line")} />

        <div>

        </div>
      </div>
    </div>
  )
}

export default Step2