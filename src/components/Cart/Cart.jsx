import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../utils/AuthUser";
import { useState } from "react";
import { Divider, Pagination } from "antd";
import { useSelector } from "react-redux";
import { BsFillCartCheckFill } from "react-icons/bs"
import { checkinDateSelector, checkoutDateSelector } from "../../redux/selectors";
import BookingReview from "../BookingReview/BookingReview";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const cx = classNames.bind(styles);

function Cart() {
  const customParseFormat = require('dayjs/plugin/customParseFormat');
  dayjs.extend(customParseFormat);
  
  const { http } = AuthUser();
  const navigate = useNavigate();

  const [toggleState, setToggleState] = useState(1);
  const [postPerPage, ] = useState(4);

  // Pagination state
  const pageSizeOptions = [3, 4, 5];
  const DEFAULT_CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE_NUMBER = 4;
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
  const [listReservationRooms, setListReservationRooms] = useState([]);
  const [listReservationServices, setListReservationServices] = useState([]);
  const totalRoomTypes = listReservationRooms.length;
  const totalServices = listReservationServices.length;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPostRoomTypes = listReservationRooms.slice(firstPostIndex, lastPostIndex);
  const currentPostServices = listReservationServices.slice(firstPostIndex, lastPostIndex);

  const checkinDate = useSelector(checkinDateSelector);
  const checkoutDate = useSelector(checkoutDateSelector);
  const timeStart = dayjs(checkinDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');
  const timeEnd = dayjs(checkoutDate, "DD/MM/YYYY").locale('vi').format('YYYY-MM-DD');

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClickPaginate = (page) => {
    console.log('Page:', page);
    setCurrentPage(page);
  }
  
  const handleBooking = () => {
    if (listReservationRooms.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No room chosen',
        text: 'You haven\'t selected any room yet!',
      })
    } else {
      http.get('/customer/account-customer')
        .then((resolve) => {
          console.log(resolve);
          const { name, CMND, phone } = resolve.data.customer;
          if (name === null || CMND === null || phone === null) {
            Swal.fire(
              'Missing user information',
              'Please provide enough personal information before booking',
              'error'
            ).then(() => {
              navigate('/user-profile');
            })
          } else {
            navigate('/booking');
          }
        })
        .catch((reject) => {
          console.log(reject);
          Swal.fire(
            'Oops!',
            'Please try again',
            'error'
          ).then(() => {
            navigate(1);
          })
        })
    }
  }

  useEffect(() => {
    const fetchData = () => {
      http.get(`/customer/show-bill-not-pay-by-customer/${timeStart}/${timeEnd}`)
        .then((resolve) => {
          console.log(resolve);
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
    <div className={cx("cart-wrapper")}>
      <div className={cx("body")}>
        <div className={cx("container")}>
          <div className={cx("bloc-tabs")}>
            <button
              className={
                toggleState === 1
                  ? cx("tabs__active")
                  : cx("tabs")
              }
              onClick={() => toggleTab(1)}
            >
              <div>
                <h4 className={cx("label-tabs")}>Room Type Cart</h4>
                <div>{totalRoomTypes} Booking Cart</div>
              </div>
            </button>

            <Divider className={cx("seperate-line-vertical")} type="vertical" />

            <button
              className={
                toggleState === 2
                  ? cx("tabs__active")
                  : cx("tabs")
              }
              onClick={() => toggleTab(2)}
            >
              <div>
                <h4 className={cx("label-tabs")}>Service Cart</h4>
                <div>{totalServices} Booking Cart</div>
              </div>
            </button>
          </div>

          <div className={cx("cart-bottom-wrapper")}>
            <div className={cx("booking-cart-wrapper__top")}>
              <h1 className={cx("header")}>Booking Cart</h1>
              <button
                className={cx("btn-booking")}
                onClick={handleBooking}
              >
                <BsFillCartCheckFill size={20} />
                <span>Booking</span>
              </button>
            </div>

            <Divider className={cx("seperate-line")} />

            <div className={cx("content-tabs")}>
              <div
                className={
                  toggleState === 1
                    ? cx("active-content")
                    : cx("content")
                }
              >
                {
                  listReservationRooms.length > 0 ?
                    currentPostRoomTypes.map((roomType) => {
                      return (
                        <div key={roomType.id} className={cx("booking-review-wrapper")}>
                          <BookingReview
                            image={roomType.image}
                            title={roomType.room_type_name}
                            price={roomType.price}
                            ranking={roomType.average_rating_room_type}
                            pointRanking={roomType.point_ranking}
                            type='Room'
                            numberCustomers={roomType.number_customers}
                            roomSize={roomType.room_size}
                            totalAverage={roomType.average_rating_room_type}
                            totalReviews={roomType.total_feedback}
                          />
                        </div>
                      )
                    })
                    : (
                      <div>
                        <h1 style={{ textAlign: 'center' }}>There is no list of room types in the booking cart</h1>
                      </div>
                    )
                }
              </div>

              <div
                className={
                  toggleState === 2
                    ? cx("active-content")
                    : cx("content")
                }
              >
                {
                  listReservationServices.length > 0 ?
                    currentPostServices.map((service, index) => {
                      return (
                        <BookingReview
                          key={index}
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
                      )
                    })
                    : (
                      <div>
                        <h1 style={{ textAlign: 'center' }}>There is no list of services in the booking cart</h1>
                      </div>
                    )
                }
              </div>
            </div>

            <div className={cx("pagination")}>
              {toggleState === 1 ? (
                <Pagination
                  current={currentPage}
                  defaultCurrent={DEFAULT_CURRENT_PAGE_NUMBER}
                  defaultPageSize={DEFAULT_PAGE_SIZE_NUMBER}
                  hideOnSinglePage
                  total={totalRoomTypes}
                  pageSizeOptions={pageSizeOptions}
                  showTotal={(totalRoomTypes) => totalRoomTypes <= 1 ? `Total ${totalRoomTypes} room type` : `Total ${totalRoomTypes} room types`}
                  showQuickJumper
                  onChange={handleClickPaginate}
                />
              ) : (
                <Pagination
                  current={currentPage}
                  defaultCurrent={DEFAULT_CURRENT_PAGE_NUMBER}
                  defaultPageSize={DEFAULT_PAGE_SIZE_NUMBER}
                  hideOnSinglePage
                  total={totalServices}
                  pageSizeOptions={pageSizeOptions}
                  showTotal={(totalServices) => totalServices <= 1 ? `Total ${totalServices} service` : `Total ${totalServices} services`}
                  showQuickJumper
                  onChange={handleClickPaginate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
