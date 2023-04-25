import React, { useState } from 'react'
import styles from './FindService.module.scss'
import classNames from "classnames/bind";
import overviewService1 from '../../img/overviewService1.png'
import overviewService2 from '../../img/overviewService2.png'
import overviewService3 from '../../img/overviewService3.png'
import overviewService4 from '../../img/overviewService4.png'
import overviewService5 from '../../img/overviewService5.png'
import singleBedroom from '../../img/single-bedroom.jpg'
import twinBedroom from '../../img/twin-bedroom.jpg'
import doubleBedroom from '../../img/double-bedroom.jpg'
import tripleBedroom from '../../img/triple-bedroom.jpg'
import { BsFillCalendar2CheckFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Form, Divider, Slider, DatePicker, Select, Collapse, Checkbox, Pagination } from 'antd';
import { FaBed, FaDollarSign, FaUser } from 'react-icons/fa';
import { faStar,faBellConcierge} from '@fortawesome/free-solid-svg-icons'
import { BiSearch } from "react-icons/bi"
import BookingCard from '../../components/BookingCard/BookingCard';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { Panel } = Collapse;
const cx = classNames.bind(styles);

const FindService = () => {

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

//   const handleSubmitFindRoom = (values) => {
//     console.log('Success:', values);
//   };

//   const handleSubmitFindRoomFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const handleClickPaginate = (page) => {
//     console.log('Page:', page);
//     setCurrentPage(page);
//   }

//   const itemRender = (_, type, originalElement) => {
//     if (type === 'prev') {
//       return <a>Previous</a>;
//     }
//     if (type === 'next') {
//       return <a>Next</a>;
//     }
//     return originalElement;
//   };

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("header")}>
        <nav className={cx("nav")}>
          {/* <div className={cx("header-navbar")}>
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
          </div> */}
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
          
        </div>
        
      </div>

      <div className={cx("section-overview__title")}>
        <h1>Fall into travel</h1>
        <p>Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
      </div>

      <div className={cx("section-overview")}>
        <div className={cx("section-overview__list-rooms")}>
          <OverviewCard 
            image={overviewService1}
            bedroomType={'SPA - Massage'}
            price={'230.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewService2}
            bedroomType={'Pool'}
            roomType={'Superior Room'}
            price={'300.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewService3}
            bedroomType={'Double Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewService4}
            bedroomType={'Triple Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
          <OverviewCard 
            image={overviewService5}
            bedroomType={'Quad Bedroom'}
            roomType={'Superior Room'}
            price={'700.000'}
            ranking={5}
          />
        </div>
      </div>

     
      <div className={cx("section-list-type-services")}>
        <div className={cx("filter-services")}>
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
                  min={100000}
                  max={500000}
                />
                <div className={cx("filter-by-price__bottom")}>
                  <p>100.000 VND</p>
                  <p>500.000 VND</p>
                </div>
              </Panel>
            </Collapse>
          </div>

          <Divider className={cx("seperate-line")}/>

          {/* <div className={cx("filter-by-rating")}>
          <Collapse
              size='large'
              ghost
              defaultActiveKey={["Rating"]}
            >
              <Panel
                header='Rating'
                extra={<FontAwesomeIcon icon={faStar} />}
                key="Rating"
              >
                
                
              <div className={cx("filter-rating-button-group")}>
                <div className={cx("filter-rating-button")}> 1</div>
                <button>a</button>
                <button>a</button>
                <button>a</button>
                <button>a</button>
              </div>
              
              </Panel>
            </Collapse>
            
          </div>

          <Divider className={cx("seperate-line")}/> */}
          
          <div className={cx("filter-by-service-type")}>
            <Collapse
              size='large'
              ghost
              defaultActiveKey={["Service"]}
            >
              <Panel
                header='Bedroom'
                extra={<FontAwesomeIcon icon={faBellConcierge} />}
                key="BedroomType"
              >
                <div className={cx("filter-by-service-type__bottom")}>
                  <Checkbox className={cx("bedroom-type-item")}>Spa - Massage</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Pool</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Fitness</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Poolside Bar</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Karaoke</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Golf</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Tennis</Checkbox>
                  <Checkbox className={cx("bedroom-type-item")}>Complex Amusement Park</Checkbox>
                </div>
              </Panel>
            </Collapse>
          </div>

          <Divider className={cx("seperate-line")}/>

          

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
          {/* <div className={cx("list-room-pagination")}>
            <Pagination
              showSizeChanger
              showQuickJumper
              current={currentPage}
              defaultCurrent={1} 
              total={100}
              itemRender={itemRender}
              onChange={handleClickPaginate}
            />
          </div> */}
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default FindService
