import React, { useEffect, useState } from 'react'
import styles from './BookingReview.module.scss'
import classNames from "classnames/bind";
import { Divider, Rate } from 'antd';
import { FaBed, FaCoffee, FaUser } from 'react-icons/fa';
import { BsHouseCheckFill } from 'react-icons/bs';
import { MdReviews } from "react-icons/md";
import { SlDiamond } from 'react-icons/sl';
import currency from '../../utils/currency';
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from '../../utils/firebase'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const cx = classNames.bind(styles);

const BookingReview = ({
  image = '',
  title = '',
  price = 0,
  ranking = 0,
  pointRanking = 0,
  type = '',
  numberCustomers = 0,
  roomSize = 0,
  totalAverage = 0,
  totalReviews = 0,
}) => {
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  // Fetch image state
  const [firstImageURL, setFirstImageURL] = useState(null);

  // Create a reference from a Google Cloud Storage URI
  const imageRef = ref(storage, image);

  useEffect(() => {
    listAll(imageRef).then((response) => {
      const firstImageRef = response.items[0];
      getDownloadURL(firstImageRef).then((url) => {
        setFirstImageURL(url);
      }).catch((error) => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx("booking-review-container")}>
      <div className={cx("booking-review-container__left")}>
        <LazyLoadImage
          key={firstImageURL}
          src={firstImageURL}
          alt={`${title}`}
          effect='blur'
          placeholderSrc={firstImageURL}
        />
      </div>
      <div className={cx("booking-review-container__right")}>
        <div className={cx("top-content")}>
          <div className={cx("top-content__left")}>
            <h2>{title}</h2>
            <Rate
              disabled
              tooltips={RATING_DESC}
              defaultValue={Math.round(ranking).toFixed(0)}
              style={{ color: '#FF8682' }}
            />
            <p className="ant-rate-text" style={{ fontSize: 16 }}>{Math.round(ranking).toFixed(0)} Star {type}</p>
            {type === 'Room' && (
              <>
                <FaCoffee className={cx("amenities")} size={16} />
                <span>20+ Amenities</span>
              </>
            )}
          </div>
          <div className={cx("top-content__right")}>
            <p>Price from</p>
            <h1>{currency(price)}{type === 'Room' && <sub>/Night</sub>}</h1>
          </div>
        </div>
        {type === 'Room' && (
          <div className={cx("middle-content")}>
            <div className={cx("middle-content__top")}>
              <span>
                <FaUser size={20} className={cx("middle-content__top-icon")} />
                {`${numberCustomers} person`}
              </span>
              <span>
                <BsHouseCheckFill size={20} className={cx("middle-content__top-icon")} />
                {roomSize}m<sup>2</sup>
              </span>
              <span>
                <SlDiamond size={20} className={cx("middle-content__top-icon")} />
                {pointRanking} points
              </span>
            </div>
          </div>
        )}
        <Divider className={cx("seperate-line")} />
        <div className={cx("bottom-content")}>
          <div className={cx("bottom-content__left")}>
            <button
              disabled
              className={cx("btn-review")}
            >
              <p>{totalAverage.toFixed(2)}</p>
            </button>
          </div>
          <div className={cx("summary")}>
            {(() => {
              if (Math.round(totalAverage).toFixed(0) > 4) {
                return (
                  <h4>Wonderful</h4>
                )
              } else if (Math.round(totalAverage).toFixed(0) > 3 && Math.round(totalAverage).toFixed(0) <= 4) {
                return (
                  <h4>Good</h4>
                )
              } else if (Math.round(totalAverage).toFixed(0) > 2 && Math.round(totalAverage).toFixed(0) <= 3) {
                return (
                  <h4>Normal</h4>
                )
              } else if (Math.round(totalAverage).toFixed(0) > 1 && Math.round(totalAverage).toFixed(0) <= 2) {
                return (
                  <h4>Not Good</h4>
                )
              } else {
                return (
                  <h4>Bad</h4>
                )
              }
            })()}
          </div>
          <div className={cx("bottom-content__right")}>
            <MdReviews size={20} />
            <p>{totalReviews === 1 ? `${totalReviews} Review` : `${totalReviews} Reviews`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingReview