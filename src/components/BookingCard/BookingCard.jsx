import React, { useEffect, useState } from 'react'
import styles from './BookingCard.module.scss'
import classNames from "classnames/bind";
import { Divider, Rate } from 'antd';
import { FaBed, FaCoffee, FaUser } from 'react-icons/fa';
import { BsFillHeartFill, BsHouseCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteRoom, addFavouriteService, removeFavouriteRoom, removeFavouriteService } from '../../redux/actions';
import { favouritesRoomsSelector, favouritesServicesSelector } from "../../redux/selectors";
import currency from '../../utils/currency';
import { Link } from 'react-router-dom';
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from '../../utils/firebase'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from '../Loading/Loading';

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
  disableFavouriteCheck,
  setReloadFavouriteItem,
}) => {
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  const dispatch = useDispatch();

  // Fetch image state
  const [loading, setLoading] = useState(false);
  const [firstImageURL, setFirstImageURL] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  // Create a reference from a Google Cloud Storage URI
  const imageRef = ref(storage, image);

  const favouritesRooms = useSelector(favouritesRoomsSelector);
  const favouritesServices = useSelector(favouritesServicesSelector);

  const [toggleFavourite, setToggleFavourite] = useState(() => {
    let isToggleFavourite = false;
    if (type === "Room") {
      favouritesRooms.some((favouriteRoom) => {
        if (favouriteRoom.id === id) {
          isToggleFavourite = true;
          return true;
        } else {
          return false;
        }
      })
    } else if (type === "Service") {
      favouritesServices.some((favouriteService) => {
        if (favouriteService.id === id) {
          isToggleFavourite = true;
          return true;
        } else {
          return false;
        }
      })
    }
    return isToggleFavourite;
  });

  const handleClickFavourite = () => {
    if (type === "Room") {
      if (!toggleFavourite) {
        dispatch(addFavouriteRoom({
          id: id,
          image: image,
          title: title,
          price: price,
          ranking: ranking,
          type: type,
          capacity: capacity,
          listRooms: listRooms,
          area: area
        }));
        setToggleFavourite(true);
      } else {
        dispatch(removeFavouriteRoom(id));
        setToggleFavourite(false);
      }
    } else if (type === "Service") {
      if (!toggleFavourite) {
        dispatch(addFavouriteService({
          id: id,
          image: image,
          title: title,
          price: price,
          ranking: ranking,
          type: type,
        }));
        setToggleFavourite(true);
      } else {
        dispatch(removeFavouriteService(id));
        setToggleFavourite(false);
      }
    }
    setReloadFavouriteItem(true);
  }

  useEffect(() => {
    listAll(imageRef).then((response) => {
      const firstImageRef = response.items[0];
      setTotalImages(response.items.length);

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
    return <></>
  } else {
    return (
      <div className={cx("booking-container")}>
        <div className={cx("booking-container__left")}>
          <LazyLoadImage
            key={firstImageURL}
            src={firstImageURL}
            alt={`${title}`}
            effect='blur'
            placeholderSrc={firstImageURL}
          />
          <div className={cx("booking-container__left-images")}>
            <span>{totalImages} images</span>
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
              <h1>{currency(price)}{type === 'Room' && <sub>/Night</sub>}</h1>
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
                style={disableFavouriteCheck ? { display: 'none' } : { display: 'inline-block' }}
                className={toggleFavourite ? cx("btn-toggle") : cx("btn-untoggle")}
                onClick={handleClickFavourite}
              >
                <BsFillHeartFill size={16} />
              </button>
            </div>
            <div
              className={cx("bottom-content__right")}
            >
              <Link
                to={type === "Room" ? `/find-rooms/${id}` : `/find-services/${id}`}
                className={cx("view-detail-link")}
                style={disableFavouriteCheck ? { width: '100%', marginLeft: 0 } : { width: '90%', marginLeft: 12}}
              >
                <button >
                  <h3>View detail</h3>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookingCard