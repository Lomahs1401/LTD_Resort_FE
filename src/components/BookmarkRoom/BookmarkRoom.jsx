import React, { useState } from 'react'
import styles from './BookmarkRoom.module.scss'
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';
import { bookmarkRoomsSelector, checkinDateSelector, checkoutDateSelector } from '../../redux/selectors';
import AuthUser from '../../utils/AuthUser';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const BookmarkRoom = ({ 
  id, 
  roomName, 
  status = '', 
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

  const handleSelectRoom = (e, status) => {
    if (status === 'BOOKED') {
      e.preventDefault();
    } else {
      const timeStart = dayjs(checkinDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');
      const timeEnd = dayjs(checkoutDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');
      
      const formData = new FormData();

      if (!bookmarked) {

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
        toast.success('We\'ll keep your room in 30 minutes', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      } else {
        http.delete(`/customer/delete-resevation_room/${id}/${timeStart}/${timeEnd}`, formData)
          .then((resolve) => {
            console.log(resolve);
          })
          .catch((reject) => {
            console.log(reject);
          })

        toast.success('Successfully unmark room', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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