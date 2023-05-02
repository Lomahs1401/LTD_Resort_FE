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
import currency from '../../utils/currency';
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Loading from '../../components/Loading/Loading';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const FindRoom = () => {
  const [form] = Form.useForm();

  const { http, user } = AuthUser();

  // Fetch list room types state
  const [listRoomTypes, setListRoomTypes] = useState([]);

  // Fetch avatar state
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Create a reference from a Google Cloud Storage URI
  const avatarRef = ref(storage, user.avatar);

  // Fetch price state
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  // Fetch room area state
  const [smallestRoomSize, setSmallestRoomSize] = useState(0);
  const [biggestRoomSize, setBiggestRoomSize] = useState(0);

  // Fetch bedroom type state
  const [bedroomTypes, setBedRoomTypes] = useState([]);

  // Fetch room type state
  const [roomTypes, setRoomTypes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const POST_PER_PAGE = 4;
  const lastPostIndex = currentPage * POST_PER_PAGE;
  const firstPostIndex = lastPostIndex - POST_PER_PAGE;
  const currentPost = listRoomTypes.slice(firstPostIndex, lastPostIndex);

  // reload "Favourites" in header
  const [, setReloadHeader] = useState(false);

  // Filter state
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterRoomSize, setFilterRoomSize] = useState(0);
  const [filterBedroomType, setFilterBedroomType] = useState([]);
  const [filterRoomType, setFilterRoomType] = useState([]);

  const bedroomTypeOptions = bedroomTypes.map((bedroomType) => {
    return {
      label: bedroomType,
      value: bedroomType,
    }
  })

  const roomTypeOptions = roomTypes.map((roomType) => {
    return {
      label: roomType,
      value: roomType,
    }
  })

  // --------------------------     Filter Room Type     --------------------------

  const onAfterChangePrice = (value) => {
    setFilterPrice(value);
  };

  const onAfterChangeRoomSize = (value) => {
    setFilterRoomSize(value);
  }

  const handleCheckBedroomType = (checkedValues) => {
    setFilterBedroomType(checkedValues);
  }

  const handleCheckRoomType = (checkedValues) => {
    setFilterRoomType(checkedValues);
  }

  const handleFilter = () => {
    const formData = new FormData();

    formData.append('price', filterPrice);
    formData.append('room_size', filterRoomSize);

    if (filterBedroomType.length !== 0) {
      filterBedroomType.forEach((bedroomType) => {
        formData.append('bedroom_type[]', bedroomType);
      })
    } else {
        formData.append('bedroom_type[]', []);
    }

    if (filterRoomType.length !== 0) {
      filterRoomType.forEach((roomType) => {
        formData.append('room_type[]', roomType);
      })
    } else {
      formData.append('room_type[]', []);
    }

    http.post('/filter-room-type', formData)
      .then((resolve) => {
        setListRoomTypes(resolve.data.list_filter_room_type)
        setCurrentPage(1);
        message.success('Filter successfully!')
      })
      .catch((reject) => {
        console.log(reject);
        message.error('Opps. Something went wrong..')
      })
  }

  // --------------------------     Find Room     --------------------------

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

  // --------------------------     Paginate     --------------------------

  const handleClickPaginate = (page) => {
    setCurrentPage(page);
  }

  // --------------------------     Fetch API     --------------------------

  useEffect(() => {
    const fetchAvatar = () => {
      getDownloadURL(avatarRef).then(url => {
        setImageUrl(url);
        setLoading(true);
      })
    }

    const fetchData = () => {
      http.get('/list-room-types')
        .then((resolve) => {
          setListRoomTypes(resolve.data.list_room_types);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
  
      http.get('/lowest-price-room-type')
        .then((resolve) => {
          setLowestPrice(resolve.data.lowest_price);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
  
      http.get('/highest-price-room-type')
        .then((resolve) => {
          setHighestPrice(resolve.data.highest_price);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
  
      http.get('/smallest-size-room-type')
        .then((resolve) => {
          setSmallestRoomSize(resolve.data.smallest_room_size);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
  
      http.get('/biggest-size-room-type')
        .then((resolve) => {
          setBiggestRoomSize(resolve.data.biggest_room_size);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
  
      http.get('/bedroom-type-names')
        .then((resolve) => {
          setBedRoomTypes(resolve.data.bedroom_type_names);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
  
      http.get('/room-type-names')
        .then((resolve) => {
          setRoomTypes(resolve.data.room_type_names);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
    }

    fetchAvatar();
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    onAfterChange={onAfterChangePrice}
                    defaultValue={lowestPrice}
                    min={lowestPrice}
                    max={highestPrice}
                  />
                  <div className={cx("filter-by-price__bottom")}>
                    <p>{currency(lowestPrice)}</p>
                    <p>{currency(highestPrice)}</p>
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
                    onAfterChange={onAfterChangeRoomSize}
                    defaultValue={smallestRoomSize}
                    min={smallestRoomSize}
                    max={biggestRoomSize}
                  />
                  <div className={cx("filter-by-room-area__bottom")}>
                    <p>{smallestRoomSize}m<sup>2</sup></p>
                    <p>{biggestRoomSize}m<sup>2</sup></p>
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
                  header='Bedroom Type'
                  extra={<FaBed size={20} />}
                  key="BedroomType"
                >
                  <Checkbox.Group
                    options={bedroomTypeOptions}
                    className={cx("bedroom-type-item")}
                    onChange={handleCheckBedroomType}
                  />
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
                  header='Room Type'
                  extra={<FaBed size={20} />}
                  key="RoomType"
                >
                  <Checkbox.Group
                    options={roomTypeOptions}
                    className={cx("room-type-item")}
                    onChange={handleCheckRoomType}
                  />
                </Panel>
              </Collapse>
            </div>

            <Divider className={cx("seperate-line")} />

            <button className={cx("btn-filter")} onClick={handleFilter}>
              Filter
            </button>

          </div>
          <div className={cx("list-rooms-container")}>
            <h2>List Type Rooms</h2>
            <div className={cx("list-rooms-container__result")}>
              {
                listRoomTypes.length < POST_PER_PAGE 
                  ? `Showing ${listRoomTypes.length} of `
                  : `Showing ${firstPostIndex + currentPost.length} of `
              }
              <span>{listRoomTypes.length} type rooms</span>
            </div>
            {currentPost.map((roomType) => {
              return (
                <BookingCard
                  key={roomType.id}
                  id={roomType.id}
                  image={twinBedroom}
                  title={roomType.room_type_name}
                  price={roomType.price}
                  ranking={5}
                  type={'Room'}
                  capacity={roomType.number_customers}
                  listRooms={roomType.number_rooms}
                  area={roomType.room_size}
                  totalReviews={54}
                  setReloadHeader={setReloadHeader}
                />
              )
            })}
            <div className={cx("list-room-pagination")}>
              <Pagination
                showQuickJumper
                current={currentPage}
                defaultCurrent={currentPage}
                pageSize={POST_PER_PAGE}
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
