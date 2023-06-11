import React from 'react'
import styles from './BookingRoom.module.scss'
import classNames from "classnames/bind";
import { useState } from 'react';
import BookmarkRoom from '../BookmarkRoom/BookmarkRoom';

const cx = classNames.bind(styles);

const BookingRoom = ({
  areaName,
  listFloors,
  reservationFloors,
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
}) => {

  // reload "Favourites" in header
  const [, setReloadBookmarkRoom] = useState(false);

  return (
    <div className={cx("booking-room-container")}>
      <h1>{areaName}</h1>
      <div className={cx("booking-room-detail")}>
        {listFloors.map((floor, floorIndex) => {
          const listRooms = floor.list_rooms;
          var listReservationRooms = [];
          if (reservationFloors.length !== 0) {
            listReservationRooms = reservationFloors[floorIndex].list_rooms;
          }

          return (
            <div
              key={floorIndex}
              className={cx("booking-room-detail__floor")}
            >
              <h3>{floor.floor_name}</h3>
              <div className={cx("booking-room-detail__room")}>
                {listRooms.map((room, roomIndex) => { 
                  if (listReservationRooms.length === 0) {
                    return (
                      <BookmarkRoom
                        key={roomIndex}
                        id={room.id}
                        roomName={room.room_name}
                        setReloadBookmarkRoom={setReloadBookmarkRoom}
                      />
                    )
                  } else {
                    const isRoomReserved = listReservationRooms.some((reservationRoom) => {
                      return reservationRoom.id === room.id
                    });
                    if (isRoomReserved) {
                      return (
                        <BookmarkRoom
                          key={roomIndex}
                          id={room.id}
                          roomName={room.room_name}
                          status='BOOKED'
                          setReloadBookmarkRoom={setReloadBookmarkRoom}
                        />
                      )
                    } else {
                      return (
                        <BookmarkRoom
                          key={roomIndex}
                          id={room.id}
                          roomName={room.room_name}
                          setReloadBookmarkRoom={setReloadBookmarkRoom}
                        />
                      )
                    }
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingRoom