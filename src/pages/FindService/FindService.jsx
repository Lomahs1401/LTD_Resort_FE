import React, { useEffect, useState } from 'react'
import styles from './FindService.module.scss'
import classNames from "classnames/bind";
import findServices from '../../img/FindServices.png'
import overviewService1 from '../../img/overviewService1.png'
import overviewService2 from '../../img/overviewService2.png'
import overviewService3 from '../../img/overviewService3.png'
import overviewService4 from '../../img/overviewService4.png'
import overviewService5 from '../../img/overviewService5.png'
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Divider, Slider, Collapse, Checkbox, Pagination, message } from 'antd';
import { FaDollarSign } from 'react-icons/fa';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons'
import BookingCard from '../../components/BookingCard/BookingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthUser from '../../utils/AuthUser';
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Loading from '../../components/Loading/Loading';
import currency from '../../utils/currency';
const { Panel } = Collapse;

const cx = classNames.bind(styles);

const FindService = () => {

  const { http, user } = AuthUser();

  // Fetch list services state
  const [listServices, setListServices] = useState([]);

  // Fetch avatar state
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Create a reference from a Google Cloud Storage URI
  const avatarRef = ref(storage, user.avatar);

  // Fetch price state
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  // Fetch service type state
  const [serviceTypes, setServiceTypes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const POST_PER_PAGE = 4;
  const lastPostIndex = currentPage * POST_PER_PAGE;
  const firstPostIndex = lastPostIndex - POST_PER_PAGE;
  const currentPost = listServices.slice(firstPostIndex, lastPostIndex);
  
  // reload "Favourites" in header
  const [, setReloadHeader] = useState(false);
  
  // Filter state
  const [filterPrice, setFilterPrice] = useState(100000);
  const [filterServiceType, setFilterServiceType] = useState([]);

  const serviceTypeOptions = serviceTypes.map((serviceType) => {
    return {
      label: serviceType.service_name,
      value: serviceType.service_name,
    }
  })

  // --------------------------     Filter Service Type     --------------------------

  const onAfterChangePrice = (value) => {
    setFilterPrice(value);
  };

  const handleCheckServiceType = (checkedValues) => {
    setFilterServiceType(checkedValues);
  }

  const handleFilter = () => {
    const formData = new FormData();

    formData.append('price', filterPrice);

    if (filterServiceType.length !== 0) {
      filterServiceType.forEach((serviceType) => {
        formData.append('services[]', serviceType)
      })
    } else {
      formData.append('services[]', [])
    }

    if (
      (filterPrice === 0 || filterPrice === lowestPrice) &&
      (filterServiceType.length === 0)
    ) {
      http.get('/list-services')
        .then((resolve) => {
          setListServices(resolve.data.list_services);
          setCurrentPage(1);
          message.success('Filter successfully!')
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
    } else {
      http.post('/filter-service', formData)
        .then((resolve) => {
          setListServices(resolve.data.list_filter_services)
          setCurrentPage(1);
          message.success('Filter successfully!')
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })
    }
  }

  // --------------------------     Paginate     --------------------------

  const handleClickPaginate = (page) => {
    console.log('Page:', page);
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
      http.get('/list-services')
      .then((resolve) => {
        setListServices(resolve.data.list_services);
      })
      .catch((reject) => {
        console.log(reject);
        message.error('Opps. Fetch data failed!')
      })

      http.get('/lowest-price-service')
        .then((resolve) => {
          setLowestPrice(resolve.data.lowest_price);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })

      http.get('/highest-price-service')
        .then((resolve) => {
          setHighestPrice(resolve.data.highest_price);
        })
        .catch((reject) => {
          console.log(reject);
          message.error('Opps. Fetch data failed!')
        })

      http.get('/list-service-names')
        .then((resolve) => {
          setServiceTypes(resolve.data.list_service_names);
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
        <Header active='Find Services' userInfo={user} imageUrl={imageUrl} />
        <div className={cx("header")}>
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
              src={findServices}
              alt="Services"
              className={cx("header-image")}
            />
          </div>
        </div>

        <div className={cx("section-overview__title")}>
          <h1>Fall into travel</h1>
          <p>Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we’ve got the travel tools to get you to your destination.</p>
        </div>

        <div className={cx("section-overview")}>
          <div className={cx("section-overview__list-services")}>
            <OverviewCard
              image={overviewService1}
              service={'SPA - Massage'}
              price={'230.000'}
              ranking={5}
              type={'Service'}
              description={'Book service'}
            />
            <OverviewCard
              image={overviewService2}
              service={'Pool'}
              price={'300.000'}
              ranking={5}
              type={'Service'}
              description={'Book service'}
            />
            <OverviewCard
              image={overviewService3}
              service={'Fitness'}
              price={'250.000'}
              ranking={5}
              type={'Service'}
              description={'Book service'}
            />
            <OverviewCard
              image={overviewService4}
              service={'Karaoke'}
              price={'200.000'}
              ranking={5}
              type={'Service'}
              description={'Book service'}
            />
            <OverviewCard
              image={overviewService5}
              service={'Tennis'}
              price={'150.000'}
              ranking={5}
              type={'Service'}
              description={'Book service'}
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

            <Divider className={cx("seperate-line")} />

            <div className={cx("filter-by-service-type")}>
              <Collapse
                size='large'
                ghost
                defaultActiveKey={["Service"]}
              >
                <Panel
                  header='Service Type'
                  extra={<FontAwesomeIcon icon={faBellConcierge} />}
                  key="Service"
                >
                  <Checkbox.Group
                    options={serviceTypeOptions}
                    className={cx("service-type-item")}
                    onChange={handleCheckServiceType}
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
            <h2>List Services</h2>
            <div className={cx("list-rooms-container__result")}>
              {
                listServices.length < POST_PER_PAGE 
                  ? `Showing ${listServices.length} of `
                  : `Showing ${firstPostIndex + currentPost.length} of `
              }
              <span>{listServices.length} services</span>
            </div>
            {currentPost.map((service) => {
              return (
                <BookingCard
                  key={service.id}
                  id={service.id}
                  image={service.image}
                  title={service.service_name}
                  price={service.price}
                  ranking={5}
                  type={'Service'}
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
                total={listServices.length}
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

export default FindService
