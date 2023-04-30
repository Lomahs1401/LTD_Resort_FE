import React, { useState, useEffect } from 'react'
import styles from './FindRoom.module.scss'
import classNames from "classnames/bind";
import findRooms from '../../img/FindRooms.png'
import overviewRoom1 from '../../img/overviewRoom1.png'
import overviewRoom2 from '../../img/overviewRoom2.png'
import overviewRoom3 from '../../img/overviewRoom3.png'
import overviewRoom4 from '../../img/overviewRoom4.png'
import overviewRoom5 from '../../img/overviewRoom5.png'
import twinBedroom from '../../img/twin-bedroom.jpg'
import { BsFillCalendar2CheckFill } from 'react-icons/bs'
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Form, Divider, Slider, DatePicker, Select, Collapse, Checkbox, Pagination, message } from 'antd';
import { FaBed, FaDollarSign, FaUser } from 'react-icons/fa';
import { BiSearch } from "react-icons/bi"
import BookingCard from '../../components/BookingCard/BookingCard';
import dayjs from 'dayjs';
import Header from '../../layouts/Header/Header';
import AuthUser from '../../utils/AuthUser';
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Loading from '../../components/Loading/Loading';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const FindRoom = () => {
  const [form] = Form.useForm();

  const { http, user } = AuthUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const [listRoomTypes, setListRoomTypes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Create a reference from a Google Cloud Storage URI
  const avatarRef = ref(storage, user.avatar);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = listRoomTypes.slice(firstPostIndex, lastPostIndex);

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

  useEffect(() => {
    getDownloadURL(avatarRef).then(url => {
      setImageUrl(url);
      setLoading(true);
    })
  }, [avatarRef]);

  useEffect(() => {
    http.get('/list-room-types')
    .then((resolve) => {
      setListRoomTypes(resolve.data.list_room_types);
      console.log(resolve);
      console.log('List room types:', resolve.data.list_room_types.length);
    })
    .catch((reject) => {
      console.log(reject);
      message.error('Opps. Fetch data failed!')
    })
  }, [http])

  if (!loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <Header active='Find Rooms' userInfo={user} imageUrl={imageUrl} />
          <nav className={cx("nav")}>
            <div className={cx("header-middle")}>
              <div className={"header-middle__content"}>
                <p className={cx("header-middle__title")}>Make your travel whishlist, we'll do the rest</p>
                <p className={cx("header-middle__desc")}>
                  Special offers to suit your plan
                </p>
              </div>
            </div>
          </nav>
          <div className={cx("image-container")}>
            <img
              src={findRooms}
              alt="Pool outside"
              className={cx("header-image")}
            />
          </div>
        </div>

        <div className={cx("section-overview__title")}>
          <h1>Fall into travel</h1>
          <p>Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.</p>
        </div>

        <div className={cx("section-overview")}>
          <div className={cx("section-overview__list-rooms")}>
            <OverviewCard
              image={overviewRoom1}
              bedroomType={'Single Bedroom'}
              roomType={'Superior Room'}
              price={'700.000 VND'}
              ranking={5}
              type={'Room'}
              description={'Book room'}
            />
            <OverviewCard
              image={overviewRoom2}
              bedroomType={'Twin Bedroom'}
              roomType={'Superior Room'}
              price={'600.000 VND'}
              ranking={5}
              description={'Book room'}
            />
            <OverviewCard
              image={overviewRoom3}
              bedroomType={'Double Bedroom'}
              roomType={'Superior Room'}
              price={'700.000 VND'}
              ranking={5}
              description={'Book room'}
            />
            <OverviewCard
              image={overviewRoom4}
              bedroomType={'Triple Bedroom'}
              roomType={'Superior Room'}
              price={'700.000 VND'}
              ranking={5}
              description={'Book room'}
            />
            <OverviewCard
              image={overviewRoom5}
              bedroomType={'Quad Bedroom'}
              roomType={'Superior Room'}
              price={'700.000 VND'}
              ranking={5}
              description={'Book room'}
            />
          </div>
        </div>

        <div className={cx("section-find-rooms")}>
          <h1 style={{ textAlign: 'center' }}>Find your room</h1>
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
                {
                  required: true,
                  message: 'Please select check in date'
                }
              ]}
              style={{ marginBottom: 30 }}
            >
              <DatePicker
                picker='date'
                size='large'
                placeholder='Select check in date'
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
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
              style={{ marginBottom: 30 }}
            >
              <DatePicker
                picker='date'
                size='large'
                placeholder='Select check out date'
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
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
              style={{ marginBottom: 30 }}
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
              style={{ marginBottom: 30 }}
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
                  extra={<FaDollarSign size={20} />}
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
                  extra={<FaBed size={20} />}
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

            <Divider className={cx("seperate-line")} />

            <div className={cx("filter-by-bedroom-type")}>
              <Collapse
                size='large'
                ghost
                defaultActiveKey={["BedroomType"]}
              >
                <Panel
                  header='Bedroom'
                  extra={<FaBed size={20} />}
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

            <Divider className={cx("seperate-line")} />

            <div className={cx("filter-by-room-type")}>
              <Collapse
                size='large'
                ghost
                defaultActiveKey={["RoomType"]}
              >
                <Panel
                  header='Room'
                  extra={<FaBed size={20} />}
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

            <Divider className={cx("seperate-line")} />

            <button className={cx("btn-filter")}>
              Filter
            </button>

          </div>
          <div className={cx("list-rooms-container")}>
            <h2>List Type Rooms</h2>
            <div className={cx("list-rooms-container__result")}>
              Showing 4 of <span>{listRoomTypes.length} type rooms</span>
            </div>
            {currentPost.map((roomType, index) => {
              return (
                <BookingCard
                  key={roomType.id}
                  image={twinBedroom}
                  title={roomType.room_type_name}
                  price={roomType.price}
                  ranking={5}
                  type={'Room'}
                  capacity={roomType.number_customers}
                  listRooms={roomType.number_rooms}
                  area={roomType.room_size}
                  totalReviews={54}
                />
              )
            })}
            <div className={cx("list-room-pagination")}>
              <Pagination
                showSizeChanger
                showQuickJumper
                current={currentPage}
                defaultCurrent={1}
                pageSize={4}
                total={listRoomTypes.length}
                onChange={handleClickPaginate}
              />
            </div>
          </div>
        </div>

        <Footer />

      </div>
    )
  }
}

export default FindRoom
