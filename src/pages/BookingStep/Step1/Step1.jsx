import React from 'react'
import styles from './Step1.module.scss'
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';
import { favouritesRoomsSelector } from '../../../redux/selectors';
import BookingCard from '../../../components/BookingCard/BookingCard';

const cx = classNames.bind(styles);

const Step1 = () => {

  const favouritesRooms = useSelector(favouritesRoomsSelector);

  return (
    <div className={cx("booking-step-wrapper")}>
      <div className={cx("booking-step-wrapper__left")}>
        <h1>Checkin Checkout Time</h1>
      </div>
      <div className={cx("booking-step-wrapper__right")}>
        {
          // favouritesRooms.map((favouriteRoom, index) => {
          //   return (
          //     <BookingCard
          //       key={index}
          //       id={favouriteRoom.id}
          //       image={favouriteRoom.image}
          //       title={favouriteRoom.title}
          //       price={favouriteRoom.price}
          //       ranking={favouriteRoom.ranking}
          //       type={favouriteRoom.type}
          //       capacity={favouriteRoom.capacity}
          //       listRooms={favouriteRoom.listRooms}
          //       area={favouriteRoom.area}
          //       totalReviews={54}
          //       disableFavouriteCheck={true}
          //     />
          //   )
          // })
        }
      </div>
    </div>
  )
}

export default Step1