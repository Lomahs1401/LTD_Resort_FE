import React from 'react'
import styles from './BookingCard.module.scss'
import classNames from "classnames/bind";
import { Divider, Rate } from 'antd';
import { FaBed, FaCoffee, FaUser } from 'react-icons/fa';
import { BsFillHeartFill, BsHouseCheckFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addFavouriteRoom, addFavouriteService } from '../../redux/actions';

const cx = classNames.bind(styles);

const BookingCard = ({
  id,
  image,
  title = '',
  price,
  ranking,
  type,
  capacity = '',
  listRooms = '',
  area = '',
  totalReviews,
  disableFavouriteCheck,
}) => {
  const priceFormat = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});

  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  const dispatch = useDispatch();

  const handleClickFavourite = () => {
    if (type === "Room") {
      dispatch(addFavouriteRoom({
        id: id,
        title: title,
        price: price,
        ranking: ranking,
        type: type,
        capacity: capacity,
        listRooms: listRooms,
        area: area
      }));
    } else if (type === "Service") {
      dispatch(addFavouriteService({
        id: id,
        title: title,
        price: price,
        ranking: ranking,
        type: type,
      }));
    }
  }

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
            <h1>{priceFormat}{type === 'Room' && <sub>/Night</sub>}</h1>
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
            <button 
              style={disableFavouriteCheck ? {display: 'none'} : {display: 'inline-block'}}
              onClick={handleClickFavourite} 
            >
              <BsFillHeartFill size={16}/>
            </button>
          </div>
          <div 
            className={cx("bottom-content__right")} 
            style={disableFavouriteCheck && {width: '100%', marginLeft: 0}}
          >
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