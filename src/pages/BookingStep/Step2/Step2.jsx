import React from 'react'
import styles from './Step2.module.scss'
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';
import { roomTypesSelector } from '../../../redux/selectors';
import BookingCard from '../../../components/BookingCard/BookingCard';

const cx = classNames.bind(styles);

const Step2 = () => {

  const roomTypes = useSelector(roomTypesSelector);
  
  return (
    <div className={cx("booking-step-wrapper")}>
      <div className={cx("booking-step-wrapper__left")}>
        {
          roomTypes.map((roomType, index) => {
            return (
              <BookingCard
                key={index}
                id={roomType.id}
                image={roomType.image}
                title={roomType.roomTypeName}
                price={roomType.price}
                ranking={roomType.pointRanking}
                type={roomType.type}
                capacity={roomType.numberCustomers}
                area={roomType.roomSize}
              />
            )
          })
        }
      </div>
      <div className={cx("booking-step-wrapper__right")}>
        <div>
          <h1>Your booking is protected by LTD</h1>
        </div>
      </div>
    </div>
  )
}

export default Step2