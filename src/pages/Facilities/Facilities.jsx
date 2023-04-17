import React from 'react'
import styles from './Facilities.module.scss'
import classNames from "classnames/bind";
import facilities from '../../img/facilities.jpg'
import poolside_bar from '../../img/poolside_bar.jpg'
import ImageSlider from '../../components/ImageSlider/ImageSlider';

import booknow from '../../img/booknow.png'
import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer/Footer';

const cx = classNames.bind(styles);

const Facilities = () => {

  const slides = [
    { url: 'http://localhost:3000/img/gym.png', title: 'Gym' },
    { url: 'http://localhost:3000/img/poolside.jpg', title: 'Poolside Bar' },
    { url: 'http://localhost:3000/img/spa.jpg', title: 'The SPA' },
    { url: 'http://localhost:3000/img/oceans.jpg', title: 'The oceans' },
    { url: 'http://localhost:3000/img/restaurants.jpg', title: 'The restaurants' },
    { url: 'http://localhost:3000/img/laundry.jpg', title: 'Laundry' },
  ]

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
                  <Link to="/" className={cx("navbar-link")}>
                    <span>Home</span>
                  </Link>
                </li>
                <li className={cx("link-item")}>
                  <Link to="/facilities" className={cx("navbar-link__active")}>
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
              <p className={cx("header-middle__title")}>WELCOME TO</p>
              <p className={cx("header-middle__brand")}>LTD RESORTS</p>
              <p className={cx("header-middle__desc")}>
                Book your stay and enjoy Luxury redefined at the most affordable rates.
              </p>
            </div>
          </div>
        </nav>
        <div className={cx("header-bottom")}>
          <Link to="/register">
            <button className={cx("btn-booking")}>
              <img
                src={booknow}
                alt="Book Now"
                style={{ width: 40 }}
              />
              <span className={cx("btn-booking__title")}>BOOK NOW</span>
            </button>
          </Link>
        </div>
        <div className={cx("image-container")}>
          <img
            src={facilities}
            alt="Girl sitting at pool"
            className={cx("header-image")}
          />
        </div>
      </div>

      <div className={cx("section-overview")}>
        <p className={cx("section-overview__title")}>FACILITIES</p>
        <p className={cx("section-overview__desc")}>
          We want your stay at our lush hotel to be truly unforgettable.  That is why we give special attention to all of your needs so
          that we can ensure an experience quite uniquw. Luxury hotels offers the perfect setting with stunning views for leisure
          and our modern luxury resort facilities will help you enjoy the best of all.
        </p>
        <div className={cx("section-overview__content")}>
          <div className={cx("content-left")}>
            <img src={poolside_bar} alt="Room" className={cx("content-img")} />
          </div>
          <div className={cx("content-right")}>
            <h1 className={cx("content-right__title")}>Luxury redefined</h1>
            <span className={cx("content-right__detail")}>
              The resort offers recreational activities such as diving, swimming pool, gym, kayaking, surfing, golfing, and many more. 
              Moreover, we provide additional services such as laundry, spa care, etc. 
              All of these will bring tourists a great experience and memorable memories at the resort.
            </span>
          </div>
        </div>
      </div>

      {/* <div className={cx("galleries")}>
        <div className={cx("galleries__title")}>OUR FACILITIES</div>
        <div className={cx("galleries__slide")}>
          <ImageSlider slides={slides} parentWidth={800} />
        </div>
      </div> */}

      <Footer />

    </div>
  )
}

export default Facilities;