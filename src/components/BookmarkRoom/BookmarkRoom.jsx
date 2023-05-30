import React, { useState } from 'react'
import styles from './BookmarkRoom.module.scss'
import classNames from "classnames/bind";
import { useDispatch } from 'react-redux';
import { bookmarkRoom } from '../../redux/actions';

const cx = classNames.bind(styles);

const BookmarkRoom = ({ id, roomName, status, areaId, floorId, roomTypeId, setReloadBookmarkRoom }) => {

  const [bookmarkRoom, setBookmarkRoom] = useState(() => {
    let isBookmarkedRoom = false;
    return isBookmarkedRoom;
  });

  const dispatch = useDispatch();

  const handleSelectRoom = (e, status) => {
    if (status === 'BOOKED') {
      e.preventDefault();
    } else {
      if (!bookmarkRoom) {
        dispatch(bookmarkRoom({
          id: id,
          roomName: roomName,
          status: status,
          areaId: areaId,
          floorId: floorId,
          roomTypeId: roomTypeId
        }));
        setBookmarkRoom(true)
      } else {
        dispatch(remove(id));
        setBookmarkRoom(false);
      }
      setReloadBookmarkRoom(true);
    }
  }

  return (
    <div className={cx("bookmark-room-wrapper")}>
      <button
        // style={isBookmarked && {backgroundColor: '#8DD3BB'}}
        className={status === 'BOOKED' ? cx("room-item__booked") : cx("room-item")}
        onClick={(e) => handleSelectRoom(e, status)}
      >
        <p>{roomName}</p>
      </button>
    </div>
  )
}

export default BookmarkRoom