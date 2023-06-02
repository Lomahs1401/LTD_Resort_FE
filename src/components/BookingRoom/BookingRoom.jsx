import React, { useEffect } from 'react'
import styles from './BookingRoom.module.scss'
import classNames from "classnames/bind";
import { useState } from 'react';
import AuthUser from '../../utils/AuthUser';
import Loading from '../Loading/Loading';
import BookmarkRoom from '../BookmarkRoom/BookmarkRoom';

const cx = classNames.bind(styles);

const BookingRoom = ({ 
  areaId, 
  areaName, 
  roomTypeId,
  roomTypeName,
  roomSize,
  totalRooms,
  numberCustomers,
  description,
  image,
  price,
  pointRanking
}) => {

  const { http } = AuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [listFloors, setListFloors] = useState([]);
  const [listRooms, setListRooms] = useState([]);

  // reload "Favourites" in header
  const [, setReloadBookmarkRoom] = useState(false);
  
  useEffect(() => {
    const fetchData = () => {
      http.get(`/auth/floors`)
        .then((resolve) => {
          console.log(resolve);
          setListFloors(resolve.data.list_floors);
        })
        .catch((error) => {
          console.log(error);
        })

      http.get(`/auth/room/room-type/${roomTypeId}`)
        .then((resolve) => {
          console.log(resolve);
          setListRooms(resolve.data.list_rooms);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    fetchData();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading) {
    return <Loading />
  } else {
    return (
      <div className={cx("booking-room-container")}>
        <h1>{areaName}</h1>
        <div className={cx("booking-room-detail")}>
          {listFloors.map((floor, index) => {
            return (
              <div
                key={index} 
                className={cx("booking-room-detail__floor")}
              >
                <h3>{floor.floor_name}</h3>
                <div className={cx("booking-room-detail__room")}>
                {listRooms.map((room, index) => {
                  if (room.floor_id === floor.id && room.area_id === areaId) {
                    return (
                      <BookmarkRoom 
                        key={index} 
                        id={room.id}
                        roomName={room.room_name} 
                        status={room.status} 
                        areaId={areaId}
                        floorId={floor.id}
                        roomTypeId={roomTypeId}
                        roomTypeName={roomTypeName}
                        roomSize={roomSize}
                        totalRooms={totalRooms}
                        numberCustomers={numberCustomers}
                        description={description}
                        image={image}
                        price={price}
                        pointRanking={pointRanking}
                        setReloadBookmarkRoom={setReloadBookmarkRoom}
                      />
                    )
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

}

export default BookingRoom