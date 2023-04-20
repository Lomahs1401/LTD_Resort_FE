import React from 'react'
import styles from './Facilities.module.scss'
import classNames from "classnames/bind";
import facilities from '../../img/facilities.jpg'
import poolside_bar from '../../img/poolside_bar.jpg'
import testimonial1 from '../../img/testimonial1.png'
import testimonial2 from '../../img/testimonial2.png'
import testimonial3 from '../../img/testimonial3.png'
import testimonial4 from '../../img/testimonial4.png'
import testimonial5 from '../../img/testimonial5.png'
import { BsFillCalendarCheckFill } from 'react-icons/bs'
import { ImQuotesLeft } from 'react-icons/im'
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
              <BsFillCalendarCheckFill size={24} />
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

      <div className={cx("section-testimonial")}>
        <h1 className={cx("section-testimonial__title")}>WHAT OUR CUSTOMERS SAY</h1>
        <div className={cx("section-testimonial__container")}>
            <div className={cx("testimonial-content")}>
                <div className={cx("testimonial-slide")}>
                    <img src={testimonial1} alt="Testimonials 1" />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. 
                    </p>
                    <ImQuotesLeft className={cx("quote-icon")} />
                    <div className={cx("testimonial-detail")}>
                        <span className={cx("testimonial-name")}>Marnie Lotter</span>
                        <span className={cx("testimonial-job")}>Web Developer</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Facilities;