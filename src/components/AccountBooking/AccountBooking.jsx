import React from 'react'
import styles from './AccountBooking.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AccountBooking = () => {
  return (
    <div className={cx("account-booking-wrapper")}>
        Account Booking
    </div>
  )
}

export default AccountBooking