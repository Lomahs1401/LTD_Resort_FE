import React, { useState } from 'react'
import styles from './FindRoom.module.scss'
import classNames from "classnames/bind";
import findRooms from '../../img/FindRooms.png'
import overviewRoom1 from '../../img/overviewRoom1.png'
import overviewRoom2 from '../../img/overviewRoom2.png'
import overviewRoom3 from '../../img/overviewRoom3.png'
import overviewRoom4 from '../../img/overviewRoom4.png'
import overviewRoom5 from '../../img/overviewRoom5.png'
import singleBedroom from '../../img/single-bedroom.jpg'
import twinBedroom from '../../img/twin-bedroom.jpg'
import doubleBedroom from '../../img/double-bedroom.jpg'
import tripleBedroom from '../../img/triple-bedroom.jpg'
import { BsFillCalendar2CheckFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Form, Divider, Slider, DatePicker, Select, Collapse, Checkbox, Pagination } from 'antd';
import { FaBed, FaDollarSign, FaUser } from 'react-icons/fa';
import { BiSearch } from "react-icons/bi"
import BookingCard from '../../components/BookingCard/BookingCard';
import dayjs from 'dayjs';
const { Panel } = Collapse;
const cx = classNames.bind(styles);

const FindRoom = () => {

  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  // const [checkInDate, setCheckInDate] = useState(dayjs(dayjs().hour()).minute(dayjs().minute()).second(0))
  // const [checkOutDate, setCheckOutDate] = useState(dayjs(dayjs().hour()).minute(dayjs().minute()).add(1, 'date'))

  const onChange = (value) => {
    console.log('onChange: ', value);
  };

  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  // const handleSelectCheckInDate = (date, dateString) => {
  //   console.log(date, dateString);
  //   setCheckInDate(date);
  // }

  // const handleSelectCheckOutDate = (date, dateString) => {
  //   console.log(date, dateString);
  //   setCheckOutDate(date);
  // }

  const handleSubmitFindRoom = (values) => {
    console.log('Success:', values);
  };

  const handleSubmitFindRoomFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleClickPaginate = (page) => {
    console.log('Page:', page);
    setCurrentPage(page);
  }

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <nav className={cx("nav")}>
          <div className={cx("header-navbar")}>
            <div className={cx("header-navbar__logo")}>
              <p className={cx("logo-main")}>LUXURY</p>
              <p className={cx("logo-title")}>HOTELS</p>
            </div>
            <div className={cx("header-navbar__link")}>
              <ul className={cx("link-container")}>
                <li className={cx("link-item")}>
                  <Link to="/" className={cx("navbar-link__active")}>
                    <span>Home</span>
                  </Link>
                </li>
                <li className={cx("link-item")}>
                  <Link to="/facilities" className={cx("navbar-link")}>
                    <span>Facilities</span>
                  </Link>
                </li>
                <li className={cx("link-item")}>
                  <Link to="/rooms" className={cx("navbar-link")}>
                    <span>Rooms</span>
                  </Link>
                </li>
                <li className={cx("link-item")}>
                  <Link to="/news" className={cx("navbar-link")}>
                    <span>News</span>
                  </Link>
                </li>
                <li className={cx("link-item")}>
                  <Link to="/contact_us" className={cx("navbar-link")}>
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={cx("header-navbar__auth")}>
              <Link to="/login">
                <button className={cx("auth-login")}>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className={cx("auth-signup")}>
                  Sign up
                </button>
              </Link>
            </div>
          </div>
          <div className={cx("header-middle")}>
            <div className={"header-middle__content"}>
              <p className={cx("header-middle__title")}>Make your travel whishlist, we'll do the rest</p>
              <p className={cx("header-middle__desc")}>
                Special offers to suit your plan
              </p>
            </div>
          </div>
        </nav>
        <div className={cx("header-bottom")}>
          <Link to="/register">

            <button className={cx("btn-booking")}>
              <BsFillCalendarCheckFill size={24} />
              <span className={cx("btn-booking__title")}>BOOK NOW</span>
            </button>
          </Link>
        </div>
        <div className={cx("image-container")}>
          <img
            src={findRooms}
            alt="Girl sitting at pool"
            className={cx("header-image")}
          />
        </div>
      </div>

      <div className={cx("section-overview__title")}>
        <h1>Fall into travel</h1>
        <p>Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
      </div>

      <div className={cx("section-overview")}>
        <div className={cx("section-overview__list-rooms")}>
          <OverviewCard 
            image={overviewRoom1}
            bedroomType={'Single Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewRoom2}
            bedroomType={'Twin Bedroom'}
            roomType={'Superior Room'}
            price={'600.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewRoom3}
            bedroomType={'Double Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewRoom4}
            bedroomType={'Triple Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewRoom5}
            bedroomType={'Quad Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
        </div>
      </div>

      <div className={cx("section-find-rooms")}>
        <h1 style={{textAlign: 'center'}}>Find your room</h1>
        <Form
          form={form}
          layout='inline'
          name='find_room_form'
          autoComplete="off"
          onFinish={handleSubmitFindRoom}
          onFinishFailed={handleSubmitFindRoomFailed}
          className={cx("find-rooms-container")}
        >
          <Form.Item 
            name='check_in'
            label={
              <div className={cx("find-rooms-item")}>
                <BsFillCalendar2CheckFill size={24} />
                <span>Check in</span>
              </div>
            }
            required={false}
            colon={false}
            rules={[
              { required: true, 
                message: 'Please select check in date' 
              }
            ]}
            style={{marginBottom: 30}}
          >
            <DatePicker
              picker='date'
              size='large'
              placeholder='Select check in date'
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              // onChange={handleSelectCheckInDate} 
            />
          </Form.Item>
          <Form.Item 
            name='check_out'
            label={
              <div className={cx("find-rooms-item")}>
                <BsFillCalendar2CheckFill size={24} />
                <span>Check out</span>
              </div>
            }
            required={false}
            colon={false}
            rules={[
              { 
                required: true, 
                message: 'Please select check out date' 
              }
            ]}
            style={{marginBottom: 30}}
          >
            <DatePicker 
              picker='date' 
              size='large'
              placeholder='Select check out date'
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              // onChange={handleSelectCheckOutDate} 
            />
          </Form.Item>
          <Form.Item 
            name='bedrooms'
            label={
              <div className={cx("find-rooms-item")}>
                <FaBed size={24} />
                <span>Bedrooms</span>
              </div>
            }
            required={false}
            colon={false}
            style={{marginBottom: 30}}
          >
            <Select
              allowClear
              showSearch
              size='large'
              placeholder="Select bedrooms"
              options={[
                {
                  value: 'single_bedroom',
                  label: 'Single Bedroom',
                },
                {
                  value: 'twin_bedroom',
                  label: 'Twin Bedroom',
                },
                {
                  value: 'double_bedroom',
                  label: 'Double Bedroom',
                },
                {
                  value: 'triple_bedroom',
                  label: 'Triple Bedroom',
                },
                {
                  value: 'quad_bedroom',
                  label: 'Quad Bedroom',
                },
              ]}
            />
          </Form.Item>
          <Form.Item 
            name='capicities'
            label={
              <div className={cx("find-rooms-item")}>
                <FaUser size={24} />
                <span>Capicilites</span>
              </div>
            }
            required={false}
            colon={false}
            style={{marginBottom: 30}}
          >
            <Select
              allowClear
              showSearch
              size='large'
              placeholder="Select capicities"
              options={[
                {
                  value: '1',
                  label: '1 Guest',
                },
                {
                  value: '2',
                  label: '2 Guests',
                },
                {
                  value: '3',
                  label: '3 Guests',
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <button className={cx("btn-search")}>
              <BiSearch size={24} />
            </button>
          </Form.Item>
        </Form>
      <div>

        </div>
      </div>

      <div className={cx("section-list-type-rooms")}>
        <div className={cx("filter-rooms")}>
          <h2>Filters</h2>
          <div className={cx("filter-by-price")}>
            <Collapse
              size='large'
              ghost
              defaultActiveKey={["Price"]}
            >
              <Panel
                header='Price'
                extra={<FaDollarSign />}
                key="Price"
              >
                <Slider
                  onChange={onChange}
                  onAfterChange={onAfterChange}
                  defaultValue={0}
                  min={0}
                  max={5000000}
                />
                <div className={cx("filter-by-price__bottom")}>
                  <p>200.000 VND</p>
                  <p>5.000.000 VND</p>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className={cx("filter-by-room-area")}>
            <Collapse
              size='large'
              ghost
              defaultActiveKey={["RoomArea"]}
            >
              <Panel
                header="Room Area"
                extra={<FaBed />}
                key="RoomArea"
              >
                <Slider
                  onChange={onChange}
                  onAfterChange={onAfterChange}
                  defaultValue={18}
                  min={18}
                  max={70}
                />
                <div className={cx("filter-by-room-area__bottom")}>
                  <p>18m<sup>2</sup></p>
                  <p>70m<sup>2</sup></p>
                </div>
              </Panel>
            </Collapse>
          </div>

          <Divider className={cx("seperate-line")}/>

          <div className={cx("filter-by-bedroom-type")}>
            <Collapse
              size='large'
              ghost
              defaultActiveKey={["BedroomType"]}
            >
              <Panel
                header='Bedroom'
                extra={<FaBed />}
                key="BedroomType"
              >
                <div className={cx("filter-by-bedroom-type__bottom")}>
                  <Checkbox className={cx("bedroom-type-item")}>Single Bedroom</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Twin Bedroom</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Double Bedroom</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Triple Bedroom</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Quad Bedroom</Checkbox>
                </div>
              </Panel>
            </Collapse>
          </div>

          <Divider className={cx("seperate-line")}/>

          <div className={cx("filter-by-room-type")}>
            <Collapse
              size='large'
              ghost
              defaultActiveKey={["RoomType"]}
            >
              <Panel
                header='Room'
                extra={<FaBed />}
                key="RoomType"
              >
                <div className={cx("filter-by-room-type__bottom")}>
                  <Checkbox className={cx("room-type-item")}>Superior Bedroom</Checkbox>
                  <Checkbox className={cx("room-type-item")}>Deluxe Bedroom</Checkbox>
                  <Checkbox className={cx("room-type-item")}>Executive Bedroom</Checkbox>
                  <Checkbox className={cx("room-type-item")}>Suite Bedroom</Checkbox>
                </div>
              </Panel>
            </Collapse>
          </div>

          <button className={cx("btn-filter")}>
            Filter
          </button>
          
        </div>
        <div className={cx("list-rooms-container")}>
          <h2>List Type Rooms</h2>
          <div className={cx("list-rooms-container__result")}>
            Showing 4 of <span>20 type rooms</span>
          </div>
          <BookingCard
            image={singleBedroom}
            bedroomType={'Single Bedroom'}
            roomType={'Superior Room'}
            price={'203.000'}
            ranking={5}
            capacity={1}
            listRooms={50}
            area={18}
            totalReviews={54}
          />
          <BookingCard
            image={twinBedroom}
            bedroomType={'Twin Bedroom'}
            roomType={'Superior Room'}
            price={'203.000'}
            ranking={5}
            capacity={2}
            listRooms={50}
            area={20}
            totalReviews={54}
          />
          <BookingCard
            image={doubleBedroom}
            bedroomType={'Double Bedroom'}
            roomType={'Superior Room'}
            price={'280.000'}
            ranking={5}
            capacity={2}
            listRooms={50}
            area={25}
            totalReviews={136}
          />
          <BookingCard
            image={tripleBedroom}
            bedroomType={'Triple Bedroom'}
            roomType={'Superior Room'}
            price={'400.000'}
            ranking={5}
            capacity={3}
            listRooms={50}
            area={30}
            totalReviews={154}
          />
          <div className={cx("list-room-pagination")}>
            <Pagination
              showSizeChanger
              showQuickJumper
              current={currentPage}
              defaultCurrent={1} 
              total={100}
              itemRender={itemRender}
              onChange={handleClickPaginate}
            />
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default FindRoom
