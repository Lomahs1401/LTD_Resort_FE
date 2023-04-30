import React, { useEffect, useState } from 'react'
import styles from './FindService.module.scss'
import classNames from "classnames/bind";
import findServices from '../../img/FindServices.png'
import overviewService1 from '../../img/overviewService1.png'
import overviewService2 from '../../img/overviewService2.png'
import overviewService3 from '../../img/overviewService3.png'
import overviewService4 from '../../img/overviewService4.png'
import overviewService5 from '../../img/overviewService5.png'
import golf from '../../img/golf.png'
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
const { Panel } = Collapse;

const cx = classNames.bind(styles);

const FindService = () => {

  const { http, user } = AuthUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const [listServices, setListServices] = useState([]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Create a reference from a Google Cloud Storage URI
  const avatarRef = ref(storage, user.avatar);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = listServices.slice(firstPostIndex, lastPostIndex);

  const onChange = (value) => {
    console.log('onChange: ', value);
  };

  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
  };

  const handleClickPaginate = (page) => {
    console.log('Page:', page);
    setCurrentPage(page);
  }

  //   const handleClickPaginate = (page) => {
  //     console.log('Page:', page);
  //     setCurrentPage(page);
  //   }

  useEffect(() => {
    getDownloadURL(avatarRef).then(url => {
      setImageUrl(url);
      setLoading(true);
    })
  }, [avatarRef]);

  useEffect(() => {
    http.get('/list-services')
    .then((resolve) => {
      setListServices(resolve.data.list_services);
      console.log(resolve);
      console.log('List Services:', resolve.data.list_services.length);
    })
    .catch((reject) => {
      console.log(reject);
      message.error('Opps. Fetch data failed!')
    })
  }, [http]);

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
                  <div className={cx("filter-by-service-type__bottom")}>
                    <Checkbox className={cx("service-type-item")}>Spa - Massage</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Pool</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Fitness</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Poolside Bar</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Karaoke</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Golf</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Tennis</Checkbox>
                    <Checkbox className={cx("service-type-item")}>Complex Amusement Park</Checkbox>
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
            <h2>List Services</h2>
            <div className={cx("list-rooms-container__result")}>
              Showing 4 of <span>{listServices.length} services</span>
            </div>
            {currentPost.map((service, index) => {
              return (
                <BookingCard
                  key={service.id}
                  image={golf}
                  title={service.service_name}
                  price={service.price}
                  ranking={5}
                  type={'Service'}
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
