import React from 'react'
import styles from './FindService.module.scss'
import classNames from "classnames/bind";
import findServices from '../../img/FindServices.png'
import overviewService1 from '../../img/overviewService1.png'
import overviewService2 from '../../img/overviewService2.png'
import overviewService3 from '../../img/overviewService3.png'
import overviewService4 from '../../img/overviewService4.png'
import overviewService5 from '../../img/overviewService5.png'
import spa from '../../img/spaMassage.png'
import poolsideBar from '../../img/poolsideBar.png'
import golf from '../../img/golf.png'
import complexAmusementPark from '../../img/complexAmusementPark.png'
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import { Divider, Slider, Collapse, Checkbox, Pagination } from 'antd';
import { FaDollarSign } from 'react-icons/fa';
import { faBellConcierge} from '@fortawesome/free-solid-svg-icons'
import BookingCard from '../../components/BookingCard/BookingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthUser from '../../AuthUser';
const { Panel } = Collapse;

const cx = classNames.bind(styles);

const FindService = () => {

  const { user } = AuthUser();

  const onChange = (value) => {
    console.log('onChange: ', value);
  };

  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
  };

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
      <Header active='Find Services' userInfo={user} />
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

          <Divider className={cx("seperate-line")}/>

          <button className={cx("btn-filter")}>
            Filter
          </button>
          
        </div>
        <div className={cx("list-rooms-container")}>
          <h2>List Services</h2>
          <div className={cx("list-rooms-container__result")}>
            Showing 4 of <span>8 services</span>
          </div>
          <BookingCard
            image={spa}
            service={'SPA - Massage'}
            price={'203.000'}
            ranking={5}
            type={'Service'}
            capacity={1}
            listRooms={50}
            area={18}
            totalReviews={54}
          />
          <BookingCard
            image={poolsideBar}
            service={'Poolside Bar'}
            price={'203.000'}
            ranking={5}
            type={'Service'}
            capacity={2}
            listRooms={50}
            area={20}
            totalReviews={54}
          />
          <BookingCard
            image={golf}
            service={'Golf'}
            price={'280.000'}
            ranking={5}
            type={'Service'}
            capacity={2}
            listRooms={50}
            area={25}
            totalReviews={136}
          />
          <BookingCard
            image={complexAmusementPark}
            service={'Complex Amusement Park'}
            price={'400.000'}
            ranking={5}
            type={'Service'}
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
