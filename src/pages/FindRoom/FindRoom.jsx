import React, { useState, useEffect } from 'react'
import styles from './FindRoom.module.scss'
import classNames from "classnames/bind";
import findRooms from '../../img/FindRooms.png'
import { BsFillCalendar2CheckFill } from 'react-icons/bs'
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Form, Divider, Slider, DatePicker, Select, Collapse, Checkbox, Pagination } from 'antd';
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
import { useDispatch, useSelector } from 'react-redux';
import { addAvatar } from '../../redux/actions';
import { avatarSelector } from '../../redux/selectors';
import { toast } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const FindRoom = () => {
  const [form] = Form.useForm();

  const { http, user } = AuthUser();

  // Fetch list top 5 lowest price of room type (Overview section)
  const [listOverviewRoomTypes, setListOverviewRoomTypes] = useState([]);

  // Fetch avatar state
  const [loading, setLoading] = useState(false);

  // Create a reference from a Google Cloud Storage URI
  const avatar = useSelector(avatarSelector);
  const avatarRef = ref(storage, avatar ? avatar : user.avatar);

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
  const pageSizeOptions = [3, 4, 5];
  const DEFAULT_CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE_NUMBER = 4;
  const [listRoomTypes, setListRoomTypes] = useState([]); // Fetch list room types state
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_NUMBER);
  const [totalRoomTypes, setTotalRoomTypes] = useState(0);

  // reload "Favourites" in header
  const [, setReloadFavouriteItem] = useState(false);
  const dispatch = useDispatch();

  // Filter state
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterRoomSize, setFilterRoomSize] = useState(0);
  const [filterBedroomType, setFilterBedroomType] = useState([]);
  const [filterRoomType, setFilterRoomType] = useState([]);
  const [listFilterRoomTypes, setListFilterRoomTypes] = useState([]);

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

    console.log(filterRoomType);

    if (
      (filterPrice === 0 || filterPrice === lowestPrice) &&
      (filterRoomSize === 0 || filterRoomSize === smallestRoomSize) &&
      (filterBedroomType.length === 0) && (filterRoomType.length === 0)
    ) {
      http.get('/auth/room-types')
        .then((resolve) => {
          setListFilterRoomTypes([]);
          setTotalRoomTypes(resolve.data.list_room_types.length)
          setCurrentPage(1);
          toast.success('Filter successfully!', {
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
        .catch((reject) => {
          console.log(reject);
          toast.error('Opps. Something went wrong..', {
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
    } else {
      http.post('/auth/room-types/filter', formData)
        .then((resolve) => {
          console.log(resolve);
          setListFilterRoomTypes(resolve.data.list_filter_room_type);
          setCurrentPage(1);
          toast.success('Filter successfully!', {
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
        .catch((reject) => {
          console.log(reject);
          toast.error('Opps. Something went wrong..', {
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
  }

  // --------------------------     Paginate     --------------------------

  const handleClickPaginate = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  }

  const handleShowSizeChange = (currentPage, pageSize) => {
    console.log(currentPage, pageSize);
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  }

  // --------------------------     Fetch API     --------------------------

  useEffect(() => {
    const fetchAvatar = () => {
      console.log(user);
      getDownloadURL(avatarRef).then(url => {
        dispatch(addAvatar(url));
      })
    }

    fetchAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchData = () => {
      http.get('/auth/room-types/total')
        .then((resolve) => {
          console.log('Total Room Types: ', resolve);
          setTotalRoomTypes(resolve.data.total_room_types);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/list-lowest-price')
        .then((resolve) => {
          console.log('List Lowest Price: ', resolve);
          setListOverviewRoomTypes(resolve.data.list_lowest_price);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/lowest-price')
        .then((resolve) => {
          console.log('Lowest Price: ', resolve)
          setLowestPrice(resolve.data.lowest_price);
          setFilterPrice(resolve.data.lowest_price);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/highest-price')
        .then((resolve) => {
          console.log('Highest Price: ', resolve)
          setHighestPrice(resolve.data.highest_price);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/smallest-size')
        .then((resolve) => {
          console.log('Smallest Room Size: ', resolve)
          setSmallestRoomSize(resolve.data.smallest_room_size);
          setFilterRoomSize(resolve.data.smallest_room_size);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/biggest-size')
        .then((resolve) => {
          console.log('Biggest Room Size: ', resolve)
          setBiggestRoomSize(resolve.data.biggest_room_size);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/bedroom-names')
        .then((resolve) => {
          console.log('Bedroom Type Names: ', resolve)
          setBedRoomTypes(resolve.data.bedroom_type_names);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/room-types/room-names')
        .then((resolve) => {
          console.log('Room Type Names: ', resolve)
          setRoomTypes(resolve.data.room_type_names);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchData = () => {
      if (listFilterRoomTypes.length === 0) {
        if (
          filterPrice !== lowestPrice || 
          filterRoomSize !== smallestRoomSize ||
          filterBedroomType.length !== 0 || 
          filterRoomType.length !== 0
        ) {
          setListRoomTypes([]);
          setTotalRoomTypes(0);
        } else {
          http.post(`/auth/room-types/paginate/${currentPage}/${pageSize}`, {
            list_filter_room_types: listFilterRoomTypes
          })
            .then((resolve) => {
              setListRoomTypes(resolve.data.list_room_types);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      } else {
        http.post(`/auth/room-types/paginate/${currentPage}/${pageSize}`, {
          list_filter_room_types: listFilterRoomTypes
        })
          .then((resolve) => {
            setListRoomTypes(resolve.data.list_room_types);
            setTotalRoomTypes(listFilterRoomTypes.length);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, listFilterRoomTypes])

  if (!loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <Header active='Find Rooms' userInfo={user} imageUrl={avatar} />
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
            <LazyLoadImage
              key={findRooms}
              src={findRooms}
              alt='Pool outside'
              effect='blur'
              placeholderSrc={findRooms}
            />
          </div>
        </div>

        <div className={cx("section-overview__title")}>
          <h1>Fall into travel</h1>
          <p>Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.</p>
        </div>

        <div className={cx("section-overview")}>
          <div className={cx("section-overview__list-rooms")}>
            {listOverviewRoomTypes.map((overviewRoomType) => {
              return (
                <OverviewCard
                  key={overviewRoomType.id}
                  id={overviewRoomType.id}
                  image={overviewRoomType.image}
                  title={overviewRoomType.room_type_name}
                  price={overviewRoomType.price}
                  ranking={5}
                  type={'Room'}
                />
              )
            })}
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
              {(() => {
                if (totalRoomTypes <= pageSize) {
                  return `Showing ${totalRoomTypes} of `

                } else {
                  if (pageSize * currentPage <= totalRoomTypes) {
                    return `Showing ${pageSize * currentPage} of `
                  } else {
                    const total = pageSize * currentPage;
                    return `Showing ${total - (total - totalRoomTypes)} of `
                  }
                }
              })()}
              <span>{totalRoomTypes} type rooms</span>
            </div>
            {listRoomTypes.map((roomType) => {
              return (
                <BookingCard
                  key={roomType.id}
                  id={roomType.id}
                  image={roomType.image}
                  title={roomType.room_type_name}
                  price={roomType.price}
                  ranking={5}
                  type={'Room'}
                  capacity={roomType.number_customers}
                  listRooms={roomType.number_rooms}
                  area={roomType.room_size}
                  totalReviews={54}
                  setReloadFavouriteItem={setReloadFavouriteItem}
                />
              )
            })}
            <div className={cx("list-room-pagination")}>
              <Pagination
                current={currentPage}
                defaultCurrent={DEFAULT_CURRENT_PAGE_NUMBER}
                defaultPageSize={DEFAULT_PAGE_SIZE_NUMBER}
                hideOnSinglePage
                total={totalRoomTypes}
                pageSizeOptions={pageSizeOptions}
                showQuickJumper
                showSizeChanger
                onChange={handleClickPaginate}
                onShowSizeChange={handleShowSizeChange}
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
