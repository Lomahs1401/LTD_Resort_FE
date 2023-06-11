import React, { useState } from 'react'
import styles from './BookmarkRoom.module.scss'
import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux';
import { addRoomTypes, bookmarkRoom, removeRoomType, unmarkRoom } from '../../redux/actions';
import { bookmarkRoomsSelector, checkinDateSelector, checkoutDateSelector } from '../../redux/selectors';
import AuthUser from '../../utils/AuthUser';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

const BookmarkRoom = ({ 
  id, 
  roomName, 
  status = '', 
  areaId, 
  floorId, 
  roomTypeId,
  roomTypeName,
  roomSize,
  totalRooms,
  numberCustomers,
  description,
  image,
  price,
  pointRanking, 
  totalAverage,
  totalFeedbacks,
  setReloadBookmarkRoom 
}) => {
  const customParseFormat = require('dayjs/plugin/customParseFormat');
  dayjs.extend(customParseFormat);

  const bookmarkRooms = useSelector(bookmarkRoomsSelector);
  const checkinDate = useSelector(checkinDateSelector);
  const checkoutDate = useSelector(checkoutDateSelector);
  const { http } = AuthUser();

  const [bookmarked, setBookmarked] = useState(() => {
    let isBookmarkedRoom = false;
    bookmarkRooms.some((bookmarkRoom) => {
      if (bookmarkRoom.id === id) {
        isBookmarkedRoom = true;
        return true;
      } else {
        return false;
      }
    })
    return isBookmarkedRoom;
  });

  const dispatch = useDispatch();

  const handleSelectRoom = (e, status) => {
    if (status === 'BOOKED') {
      e.preventDefault();
    } else {
      const timeStart = dayjs(checkinDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');
      const timeEnd = dayjs(checkoutDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');
      console.log(timeStart);
      console.log(timeEnd);
      
      const formData = new FormData();

      if (!bookmarked) {
        dispatch(bookmarkRoom({
          id: id,
          roomName: roomName,
          status: status,
          areaId: areaId,
          floorId: floorId,
          roomTypeId: roomTypeId
        }));

        console.log(timeStart);
        console.log(timeEnd);
        
        formData.append('time_start', timeStart);
        formData.append('time_end', timeEnd);
        formData.append('room_id', id)

        http.post('/customer/store-reservation_room', formData)
          .then((resolve) => {
            console.log(resolve);
          })
          .catch((reject) => {
            console.log(reject);
          })

        setBookmarked(true)
      } else {
        dispatch(unmarkRoom(id));

        http.delete(`/customer/delete-resevation_room/${id}/${timeStart}/${timeEnd}`, formData)
          .then((resolve) => {
            console.log(resolve);
          })
          .catch((reject) => {
            console.log(reject);
          })

        setBookmarked(false);
      }
      setReloadBookmarkRoom(true);
    }
  }

  return (
    <div className={cx("bookmark-room-wrapper")}>
      <button
        className={status === 'BOOKED' ? cx("room-item__booked") : cx("room-item")}
        style={bookmarked ? {backgroundColor: '#8DD3BB'} : {}}
        onClick={(e) => handleSelectRoom(e, status)}
      >
        <p>{roomName}</p>
      </button>
    </div>
  )
}

export default BookmarkRoom