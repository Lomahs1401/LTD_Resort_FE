import React, { useState } from 'react'
import styles from './BookmarkRoom.module.scss'
import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux';
import { addRoomTypes, bookmarkRoom, removeRoomType, unmarkRoom } from '../../redux/actions';
import { bookmarkRoomsSelector, roomTypesSelector } from '../../redux/selectors';

const cx = classNames.bind(styles);

const BookmarkRoom = ({ 
  id, 
  roomName, 
  status, 
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
  setReloadBookmarkRoom 
}) => {

  const bookmarkRooms = useSelector(bookmarkRoomsSelector);
  const roomTypes = useSelector(roomTypesSelector);

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

  const checkRoomTypeExists = (roomTypes, roomTypeId) => {
    for (let i = 0; i < roomTypes.length; i++) {
      if (roomTypes[i].id === roomTypeId) {
        return true;
      }
    }
    return false;
  }

  const checkRoomTypeRemoveAll = (bookmarkRooms, roomTypeId) => {
    const roomTypesById = bookmarkRooms.filter((markRoom) => {
      return markRoom.roomTypeId === roomTypeId;
    })
    for (let i = 0; i < roomTypesById.length; i++) {
      if (parseInt(roomTypesById[i].roomTypeId) === roomTypeId && roomTypesById.length === 1) {
        return false;
      }
    }
    return true;
  }

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
        if (!checkRoomTypeExists(roomTypes, roomTypeId)) {
          dispatch(addRoomTypes({
            id: roomTypeId,
            roomTypeName: roomTypeName,
            roomSize: roomSize,
            totalRooms: totalRooms,
            numberCustomers: numberCustomers,
            description: description,
            image: image,
            price: price,
            pointRanking: pointRanking, 
          }))
        }
        setBookmarked(true)
      } else {
        dispatch(unmarkRoom(id));
        if (!checkRoomTypeRemoveAll(bookmarkRooms, parseInt(roomTypeId))) {
          console.log(bookmarkRooms);
          dispatch(removeRoomType(parseInt(roomTypeId)))
        }
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