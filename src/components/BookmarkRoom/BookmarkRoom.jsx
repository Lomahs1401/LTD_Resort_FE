import React, { useState } from 'react'
import styles from './BookmarkRoom.module.scss'
import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkRoom, unmarkRoom } from '../../redux/actions';
import { bookmarkRoomsSelector } from '../../redux/selectors';

const cx = classNames.bind(styles);

const BookmarkRoom = ({ id, roomName, status, areaId, floorId, roomTypeId, setReloadBookmarkRoom }) => {

  const bookmarkRooms = useSelector(bookmarkRoomsSelector);

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
      if (!bookmarked) {
        dispatch(bookmarkRoom({
          id: id,
          roomName: roomName,
          status: status,
          areaId: areaId,
          floorId: floorId,
          roomTypeId: roomTypeId
        }));
        setBookmarked(true)
      } else {
        dispatch(unmarkRoom(id));
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