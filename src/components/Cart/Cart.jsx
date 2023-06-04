import React from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../utils/AuthUser";
import BookingCard from "../../components/BookingCard/BookingCard";
import { useState } from "react";
import { Divider, Pagination } from "antd";
import { useSelector } from "react-redux";
import { BsFillCartCheckFill } from "react-icons/bs"
import { roomTypesSelector, servicesSelector } from "../../redux/selectors";
import BookingReview from "../BookingReview/BookingReview";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Cart() {
  const { http } = AuthUser();
  const navigate = useNavigate();

  const [toggleState, setToggleState] = useState(1);
  const [postPerPage, ] = useState(4);

  const roomTypes = useSelector(roomTypesSelector);
  const services = useSelector(servicesSelector);

  // Pagination state
  const pageSizeOptions = [3, 4, 5];
  const DEFAULT_CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE_NUMBER = 4;
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
  const totalRoomTypes = roomTypes.length;
  const totalServices = services.length;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPostRoomTypes = roomTypes.slice(firstPostIndex, lastPostIndex);
  const currentPostServices = services.slice(firstPostIndex, lastPostIndex);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClickPaginate = (page) => {
    console.log('Page:', page);
    setCurrentPage(page);
  }
  
  const handleBooking = () => {
    if (roomTypes.length === 0) {
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
                  roomTypes.length > 0 ?
                    currentPostRoomTypes.map((roomType) => {
                      return (
                        <div key={roomType.id} className={cx("booking-review-wrapper")}>
                          <BookingReview
                            image={roomType.image}
                            title={roomType.roomTypeName}
                            price={roomType.price}
                            ranking={roomType.totalAverage}
                            pointRanking={roomType.pointRanking}
                            type='Room'
                            numberCustomers={roomType.numberCustomers}
                            roomSize={roomType.roomSize}
                            totalAverage={roomType.totalAverage}
                            totalReviews={roomType.totalFeedbacks}
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
                  services.length > 0 ?
                    currentPostServices.map((service, index) => {
                      return (
                        <BookingReview
                          key={index}
                          id={service.id}
                          image={service.image}
                          title={service.serviceName}
                          price={service.price}
                          ranking={service.totalAverage}
                          pointRanking={service.pointRanking}
                          type='Service'
                          totalAverage={service.totalAverage}
                          totalReviews={service.totalFeedbacks}
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
