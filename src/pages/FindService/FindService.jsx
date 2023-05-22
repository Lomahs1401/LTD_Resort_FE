import React, { useEffect, useState } from 'react'
import styles from './FindService.module.scss'
import classNames from "classnames/bind";
import findServices from '../../img/FindServices.png'
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Divider, Slider, Collapse, Checkbox, Pagination } from 'antd';
import { FaDollarSign } from 'react-icons/fa';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons'
import BookingCard from '../../components/BookingCard/BookingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthUser from '../../utils/AuthUser';
import Loading from '../../components/Loading/Loading';
import currency from '../../utils/currency';
import { useSelector } from 'react-redux';
import { avatarSelector } from '../../redux/selectors';
import { toast } from 'react-toastify';
const { Panel } = Collapse;

const cx = classNames.bind(styles);

const FindService = () => {

  const { http, user } = AuthUser();

  // Fetch list top 5 lowest price of room type (Overview section)
  const [listOverviewRoomServices, setListOverviewRoomServices] = useState([]);

  // Fetch data state
  const [loading, setLoading] = useState(false);
  const avatar = useSelector(avatarSelector);

  // Fetch price state
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  // Fetch service type state
  const [serviceTypes, setServiceTypes] = useState([]);

  // Pagination state
  const pageSizeOptions = [3, 4, 5];
  const DEFAULT_CURRENT_PAGE_NUMBER = 1;
  const DEFAULT_PAGE_SIZE_NUMBER = 4;
  const [listServices, setListServices] = useState([]); // Fetch list room types state
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_NUMBER);
  const [totalServices, setTotalServices] = useState(0);

  // reload "Favourites" in header
  const [, setReloadHeader] = useState(false);

  // Filter state
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterServiceType, setFilterServiceType] = useState([]);
  const [listFilterServices, setListFilterServices] = useState([]);

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
      http.get('/auth/services')
        .then((resolve) => {
          setListFilterServices([]);
          setTotalServices(resolve.data.list_services.length);
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
      http.post('/auth/services/filter', formData)
        .then((resolve) => {
          setListFilterServices(resolve.data.list_filter_services)
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
    const fetchData = () => {
      http.get('/auth/services/total')
        .then((resolve) => {
          console.log(resolve);
          setTotalServices(resolve.data.total_services);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/services/list-lowest-price')
        .then((resolve) => {
          setListOverviewRoomServices(resolve.data.list_lowest_price);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/services/lowest-price')
        .then((resolve) => {
          setLowestPrice(resolve.data.lowest_price);
          setFilterPrice(resolve.data.lowest_price)
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/services/highest-price')
        .then((resolve) => {
          setHighestPrice(resolve.data.highest_price);
        })
        .catch((reject) => {
          console.log(reject);
        })

      http.get('/auth/services/names')
        .then((resolve) => {
          setServiceTypes(resolve.data.list_service_names);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = () => {
      if (listFilterServices.length === 0) {
        if (filterPrice !== lowestPrice || filterServiceType.length !== 0) {
          setListServices([]);
          setTotalServices(0);
        } else {
          http.post(`/auth/services/paginate/${currentPage}/${pageSize}`, {
            list_filter_services: listFilterServices
          })
            .then((resolve) => {
              setListServices(resolve.data.list_services);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      } else {
        http.post(`/auth/services/paginate/${currentPage}/${pageSize}`, {
          list_filter_services: listFilterServices
        })
          .then((resolve) => {
            setListServices(resolve.data.list_services);
            setTotalServices(listFilterServices.length);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, listFilterServices])

  if (!loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className={cx("wrapper")}>
        <Header active='Find Services' userInfo={user} imageUrl={avatar} />
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
            {listOverviewRoomServices.map((overviewRoomService) => {
              return (
                <OverviewCard
                  key={overviewRoomService.id}
                  image={overviewRoomService.image}
                  title={overviewRoomService.service_name}
                  price={overviewRoomService.price}
                  ranking={5}
                  type={'Service'}
                />
              )
            })}
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
              {(() => {
                if (totalServices <= pageSize) {
                  return `Showing ${totalServices} of `

                } else {
                  if (pageSize * currentPage <= totalServices) {
                    return `Showing ${pageSize * currentPage} of `
                  } else {
                    const total = pageSize * currentPage;
                    return `Showing ${total - (total - totalServices)} of `
                  }
                }
              })()}
              <span>{totalServices} services</span>
            </div>
            {listServices.map((service) => {
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
                current={currentPage}
                defaultCurrent={DEFAULT_CURRENT_PAGE_NUMBER}
                defaultPageSize={DEFAULT_PAGE_SIZE_NUMBER}
                hideOnSinglePage
                total={totalServices}
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

export default FindService
