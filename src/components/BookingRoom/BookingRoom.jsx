import React from 'react'
import styles from './BookingRoom.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const BookingRoom = () => {
  return (
    <div className={cx("booking-room-container")}>
      <h1>Area A</h1>
      <div className={cx("booking-room-detail")}>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 1</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item")}>
              <p>A101</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A102</p>
            </button>
            <button className={cx("room-item")}>
              <p>A103</p>
            </button>
            <button className={cx("room-item")}>
              <p>A104</p>
            </button>
            <button className={cx("room-item")}>
              <p>A105</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 2</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item__booked")}>
              <p>A201</p>
            </button>
            <button className={cx("room-item")}>
              <p>A202</p>
            </button>
            <button className={cx("room-item")}>
              <p>A203</p>
            </button>
            <button className={cx("room-item")}>
              <p>A204</p>
            </button>
            <button className={cx("room-item")}>
              <p>A205</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 3</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item")}>
              <p>A301</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A302</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A303</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A304</p>
            </button>
            <button className={cx("room-item")}>
              <p>A305</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 4</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item")}>
              <p>A401</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A402</p>
            </button>
            <button className={cx("room-item")}>
              <p>A403</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A404</p>
            </button>
            <button className={cx("room-item")}>
              <p>A405</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 5</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item")}>
              <p>A501</p>
            </button>
            <button className={cx("room-item")}>
              <p>A502</p>
            </button>
            <button className={cx("room-item")}>
              <p>A503</p>
            </button>
            <button className={cx("room-item")}>
              <p>A504</p>
            </button>
            <button className={cx("room-item")}>
              <p>A505</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 6</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item")}>
              <p>A601</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A602</p>
            </button>
            <button className={cx("room-item")}>
              <p>A603</p>
            </button>
            <button className={cx("room-item")}>
              <p>A604</p>
            </button>
            <button className={cx("room-item")}>
              <p>A605</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 7</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item")}>
              <p>A701</p>
            </button>
            <button className={cx("room-item")}>
              <p>A702</p>
            </button>
            <button className={cx("room-item")}>
              <p>A703</p>
            </button>
            <button className={cx("room-item")}>
              <p>A704</p>
            </button>
            <button className={cx("room-item__booked")}>
              <p>A705</p>
            </button>
          </div>
        </div>
        <div className={cx("booking-room-detail__floor")}>
          <h3>Floor 8</h3>
          <div className={cx("booking-room-detail__room")}>
            <button className={cx("room-item__booked")}>
              <p>A801</p>
            </button>
            <button className={cx("room-item")}>
              <p>A802</p>
            </button>
            <button className={cx("room-item")}>
              <p>A803</p>
            </button>
            <button className={cx("room-item")}>
              <p>A804</p>
            </button>
            <button className={cx("room-item")}>
              <p>A805</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingRoom