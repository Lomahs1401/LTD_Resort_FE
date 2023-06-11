import React, { useEffect, useState } from 'react'
import styles from './Step1.module.scss'
import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux';
import { checkinDateSelector, checkoutDateSelector, } from '../../../redux/selectors';
import BookingReview from '../../../components/BookingReview/BookingReview';
import { Divider } from 'antd';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaBed, FaUser, FaIdCard } from 'react-icons/fa';
import { FcOvertime } from 'react-icons/fc';
import { MdRoomService } from 'react-icons/md';
import checkin from "../../../img/checkin.jpg"
import checkout from "../../../img/chekout.png"
import coins from "../../../img/coins.png"
import currency from '../../../utils/currency';
import AuthUser from '../../../utils/AuthUser';
import { addTotalAmount, nextProgressStep } from '../../../redux/actions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Step1 = ({ current, setCurrent }) => {
  const dayjs = require('dayjs');
  const customParseFormat = require('dayjs/plugin/customParseFormat');
  dayjs.extend(customParseFormat);

  const checkinDate = useSelector(checkinDateSelector);
  const checkoutDate = useSelector(checkoutDateSelector);
  const timeStart = dayjs(checkinDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');
  const timeEnd = dayjs(checkoutDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');

  const dispatch = useDispatch();
  const [customerInfo, setCustomerInfo] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [listReservationRooms, setListReservationRooms] = useState([]);
  const [listReservationServices, setListReservationServices] = useState([]);

  const { http } = AuthUser();

  const handleConfirmInfo = () => {
    setCurrent(current + 1);
    dispatch(nextProgressStep(current + 1));
    dispatch(addTotalAmount(totalAmount));
  }

  const navigate = useNavigate();

  const handleDeleteRoom = (room) => {
    console.log(room);
    Swal.fire({
      title: 'Delete this room?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        http.delete(`/customer/delete-resevation_room/${room}/${timeStart}/${timeEnd}`)
          .then((resolve) => {
            console.log(resolve);
            Swal.fire(
              'Deleted!',
              'Successfully deleted room!',
              'success'
            ).then(() => {
              navigate(1);
              window.location.reload();
            })
          })
          .catch((reject) => {
            console.log(reject);
            toast.error('Oops. Try again', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          })
      }
    })
  }

  useEffect(() => {
    const fetchData = () => {
      http.get(`/customer/account-customer`)
        .then((resolve) => {
          console.log(resolve);
          setCustomerInfo(resolve.data.customer);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get(`/customer/show-bill-not-pay-by-customer/${timeStart}/${timeEnd}`)
        .then((resolve) => {
          console.log(resolve);
          setNumberOfDays(resolve.data.numberOfDays);
          setTotalAmount(resolve.data.total_money);
          setTotalPeople(resolve.data.total_people);
          setTotalRoom(resolve.data.total_room);
          setTotalService(resolve.data.bill_service_count);
          setListReservationRooms(resolve.data.reservation_rooms);
          setListReservationServices(resolve.data.service_bill_pay);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx("booking-step-wrapper")}>
      <div className={cx("booking-step-wrapper__left")}>
        <h2>List Room Types Booking</h2>
        {
          listReservationRooms.map((reservationRoom) => {
            return (
              <div key={reservationRoom.id} className={cx("booking-review-wrapper")}>
                <BookingReview
                  image={reservationRoom.image}
                  title={reservationRoom.room_type_name}
                  price={reservationRoom.price}
                  ranking={5}
                  pointRanking={reservationRoom.point_ranking}
                  type='Room'
                  numberCustomers={reservationRoom.number_customers}
                  roomSize={reservationRoom.room_size}
                  totalRooms={reservationRoom.number_customers}
                  totalAverage={reservationRoom.average_rating_room_type}
                  totalReviews={reservationRoom.total_feedback}
                />
                <div className={cx("booking-rooms")}>
                  <h2>List Rooms: </h2>
                  <div className={cx("booking-rooms__data")}>
                    {                     
                      reservationRoom.room.map((room) => {
                        return (
                          <button className={cx("room-info__detail")}>
                            <p>{room.room_name}</p>
                            <button className={cx("room-info__detail-delete")} onClick={() => handleDeleteRoom(room.id)}>
                              X
                            </button>
                          </button>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
        {
          listReservationServices.length > 0 && (
            <>
              <Divider className={cx("seperate-line")} />
              <h2>List Services Booking</h2>
              {
                listReservationServices.map((service) => {
                  return (
                    <div key={service.id} className={cx("booking-review-wrapper")}>
                      <BookingReview
                        id={service.id}
                        image={service.image}
                        title={service.service_name}
                        price={service.price}
                        ranking={service.average_rating_service}
                        pointRanking={service.point_ranking}
                        type='Service'
                        totalAverage={service.average_rating_service}
                        totalReviews={service.total_feedback}
                      />
                    </div>
                  )
                })
              }
            </>
          )}
      </div>
      <div className={cx("booking-step-wrapper__right")}>
        <div className={cx("booking-reservation")}>
          <h2>Reservation Date</h2>
          <div className={cx("checkin-time")}>
            <div className={cx("checkin-time__title")}>
              <img src={checkin} alt="checkin" />
              <h3>Check-in Date</h3>
            </div>
            <h3 className={cx("checkin-time__data")}>{checkinDate}</h3>
          </div>
          <div className={cx("checkout-time")}>
            <div className={cx("checkout-time__title")}>
              <img src={checkout} alt="checkout" />
              <h3>Check-out Date</h3>
            </div>
            <h3 className={cx("checkout-time__data")}>{checkoutDate}</h3>
          </div>
        </div>

        <Divider className={cx("seperate-line")} />

        <div className={cx("booking-check-info")}>
          <h2>Booking Information</h2>
          <div className={cx("booking-check-info__date")}>
            <div className={cx("booking-check-title")}>
              <FcOvertime size={30} />
              <h3>Number of days</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{numberOfDays}</p>
            </button>
          </div>
          <div className={cx("booking-check-info__totalrooms")}>
            <div className={cx("booking-check-title")}>
              <FaBed size={30} />
              <h3>Total rooms</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{totalRoom}</p>
            </button>
          </div>
          <div className={cx("booking-check-info__totalservices")}>
            <div className={cx("booking-check-title")}>
              <MdRoomService size={30} />
              <h3>Total services</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{totalService}</p>
            </button>
          </div>
          <div className={cx("booking-check-info__totalpeople")}>
            <div className={cx("booking-check-title")}>
              <MdRoomService size={30} />
              <h3>Total People</h3>
            </div>
            <button className={cx("btn-info")}>
              <p>{totalPeople}</p>
            </button>
          </div>
        </div>

        <Divider className={cx("seperate-line")} />

        <div className={cx("booking-user-info")}>
          <h2>Contact Information</h2>
          <div className={cx("booking-user-info__name")}>
            <div className={cx("booking-check-title")}>
              <FaUser size={30} />
              <h3>Full Name</h3>
            </div>
            <p>{customerInfo?.name}</p>
          </div>
          <div className={cx("booking-user-info__card")}>
            <div className={cx("booking-check-title")}>
              <FaIdCard size={30} />
              <h3>ID Card</h3>
            </div>
            <p>{customerInfo?.CMND}</p>
          </div>
          <div className={cx("booking-user-info__phone")}>
            <div className={cx("booking-check-title")}>
              <BsFillTelephoneFill size={30} />
              <h3>Phone</h3>
            </div>
            <p>{customerInfo?.phone}</p>
          </div>
        </div>

        <Divider className={cx("seperate-line")} />

        <div className={cx("booking-confirm-wrapper")}>
          <div className={cx("booking-total-price")}>
            <div className={cx("booking-total-price__title")}>
              <img src={coins} alt={'Coin'} />
              <h3>Total Amount: <span style={{ color: '#f35221', fontSize: 24, fontWeight: 'bold' }}>{currency(totalAmount)}</span></h3>
            </div>
            <h2 className={cx("booking-total-price__total")}></h2>
          </div>
          <div className={cx("booking-confirm-btn")}>
            <button onClick={handleConfirmInfo}>
              <p>Payment</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1