import React, { useState, useEffect } from 'react'
import styles from './OverviewCard.module.scss'
import classNames from 'classnames/bind'
import { Divider, Rate } from 'antd';
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Loading from '../Loading/Loading';
import currency from '../../utils/currency';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const OverviewCard = ({
  id,
  image,
  title,
  price,
  ranking,
  type,
}) => {

  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  // Fetch image state
  const [loading, setLoading] = useState(false);
  const [firstImageURL, setFirstImageURL] = useState(null);

  // Create a reference from a Google Cloud Storage URI
  const imageRef = ref(storage, image);

  const navigate = useNavigate();

  const handleClickBooking = () => {
    if (type === 'Room') {
      navigate(`/find-rooms/${id}`);
    } else {
      navigate(`/find-services/${id}`);
    }
  }

  useEffect(() => {
    listAll(imageRef).then((response) => {
      const firstImageRef = response.items[0];

      getDownloadURL(firstImageRef).then((url) => {
        setFirstImageURL(url);
        setLoading(true);
      }).catch((error) => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!loading) {
    return <Loading />
  } else {
    return (
      <div className={cx("card-container")}>
        <div className={cx("card-content")}>
          {(() => {
            if (type === 'Room') {
              return (
                <>
                  <p className={cx("bedroom-type")}>{title.split(" - ")[0]}</p>
                  <p className={cx("room-type")}>{title.split(" - ")[1]}</p>
                </>
              )
            } else {
              return (
                <p className={cx("service-type")}>{title}</p>
              )
            }
          })()}

          <Divider className={cx("seperate-line-content")} />
          <span className={cx("price")}>{currency(price)}</span>
          <div className={cx("ranking-container")}>
            <Rate
              disabled
              tooltips={RATING_DESC}
              defaultValue={ranking}
              style={{ color: '#FF8682' }}
            />
            <p className="ant-rate-text">{ranking} Star {type}</p>
          </div>
          <button 
            className={cx("btn-booking")}
            onClick={handleClickBooking}
          >
            <p>Book {type}</p>
          </button>
        </div>
        <div className={cx("card-img")}>
          <LazyLoadImage
            key={firstImageURL}
            src={firstImageURL}
            alt={`${title}`}
            effect="blur"
            placeholderSrc={firstImageURL}
          />
        </div>
      </div>
    )
  }
}

export default OverviewCard