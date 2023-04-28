import React from 'react'
import styles from './BookingCard.module.scss'
import classNames from "classnames/bind";
import { Divider, Rate } from 'antd';
import { FaBed, FaCoffee, FaUser } from 'react-icons/fa';
import { BsFillHeartFill, BsHouseCheckFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

const BookingCard = ({
  image,
  title = '',
  price,
  ranking,
  type,
  capacity = '',
  listRooms = '',
  area = '',
  totalReviews,
}) => {
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  return (
    <div className={cx("booking-container")}>
      <div className={cx("booking-container__left")}>
        <img src={image} alt={`${title}`} />
        <div className={cx("booking-container__left-images")}>
          <span>9 images</span>
        </div>
      </div>
      <div className={cx("booking-container__right")}>
        <div className={cx("top-content")}>
          <div className={cx("top-content__left")}>
            <h2>{title}</h2>
            <Rate
              disabled
              tooltips={RATING_DESC}
              defaultValue={ranking}
              style={{ color: '#FF8682' }}
            />
            <p className="ant-rate-text" style={{ fontSize: 16 }}>{ranking} Star {type}</p>
            {type === 'Room' && (
              <>
                <FaCoffee className={cx("amenities")} size={16} />
                <span>20+ Amenities</span>
              </>
            )}
          </div>
          <div className={cx("top-content__right")}>
            <p>Price from</p>
            <h1>{price} VND{type === 'Room' && <sub>/Night</sub>}</h1>
          </div>
        </div>
        {type === 'Room' && (
          <div className={cx("middle-content")}>
            <div className={cx("middle-content__top")}>
              <span>
                <FaUser size={20} className={cx("middle-content__top-icon")} />
                {capacity} persons
              </span>
              <span>
                <FaBed size={20} className={cx("middle-content__top-icon")} />
                {listRooms} rooms
              </span>
              <span>
                <BsHouseCheckFill size={20} className={cx("middle-content__top-icon")} />
                {area}m<sup>2</sup>
              </span>
            </div>
            <div className={cx("middle-content_bottom")}>

            </div>
          </div>
        )}
        
        <Divider className={cx("seperate-line")} />
        <div className={cx("bottom-content")}>
          <div className={cx("bottom-content__left")}>
            <button>
              <BsFillHeartFill size={16}/>
            </button>
          </div>
          <div className={cx("bottom-content__right")}>
            <button>
              <h3>View detail</h3>
            </button>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default BookingCard