import React from 'react'
import styles from './Home.module.scss'
import classNames from "classnames/bind";
import home from '../../img/home.jpg'
import content1 from '../../img/content1.jpg'
import content2 from '../../img/content2.jpg'
import comfortableRoom from '../../img/comfortableRoom.png'
import treatment from '../../img/treatments.png'
import cuisine from '../../img/cuisine.png'
import facilities1 from '../../img/facilities1.png'
import facilities2 from '../../img/facilities2.png'
import treatments1 from '../../img/treatments1.png'
import treatments2 from '../../img/treatments2.png'
import { BsFillCalendarCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer/Footer';

const cx = classNames.bind(styles);

const Home = () => {
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
            src={home}
            alt="Girl sitting at pool"
            className={cx("header-image")}
          />
        </div>
      </div>

      <div className={cx("section-overview__title")}>
        <p>All our room types are including complementary breakfast!</p>
      </div>

      <div className={cx("section-overview")}>
        <div className={cx("section-overview__content")}>
          <div className={cx("content-left")}>
            <h1 className={cx("content-left__title")}>Luxury redefined</h1>
            <span className={cx("content-left__detail")}>Our rooms are designed to transport
              you into an environment made for leisure.
              Take your mind off the day-to-day of home
              life and find a private paradise for yourself.
            </span>
            <Link to="/rooms" className={cx("explore-container")}>
              <button className={cx("content-left__explore")}>
                Explore
              </button>
            </Link>
          </div>
          <div className={cx("content-right")}>
            <img src={content1} alt="Room" className={cx("content-img")} />
          </div>
        </div>
        <div className={cx("section-overview__content")}>
          <div className={cx("content-left")}>
            <h1 className={cx("content-left__title")}>Leave your worries in the sand</h1>
            <span className={cx("content-left__detail")}>We love life at the beach. Being close to the ocean with access to endless sandy beach ensures a relaxed state of mind.
              It seems like time stands still watching the ocean.
            </span>
            <Link to="/facilities" className={cx("explore-container")}>
              <button className={cx("content-left__explore")}>
                Explore
              </button>
            </Link>
          </div>
          <div className={cx("content-right")}>
            <img src={content2} alt="Beach" className={cx("content-img")} />
          </div>
        </div>
      </div>

      <div className={cx("section-overview__service")}>
        <p>WHAT DO WE OFFER</p>
      </div>

      <div className={cx("section-service")}>
        <div className={cx("service-left")}>
          <div className={cx("service-left__image")}>
            <img src={comfortableRoom} alt="Rooms" />
          </div>
          <div className={cx("service-left__desc")}>
            <h1 className={cx("service-middle__desc__title")}>COMFORTABLE ROOMS</h1>
            <p className={cx("service-middle__desc__overview")}>Your comfort is our concern</p>
            <p className={cx("service-middle__desc__overview")}>Fresh renovation</p>
            <p className={cx("service-middle__desc__overview")}>Helpful staff</p>
          </div>
        </div>
        <div className={cx("service-middle")}>
          <div className={cx("service-middle__image")}>
            <img src={treatment} alt="SPA" />
          </div>
          <div className={cx("service-middle__desc")}>
            <h1 className={cx("service-middle__desc__title")}>WELLNESS TREATMENTS</h1>
            <p className={cx("service-middle__desc__overview")}>Circular shower</p>
            <p className={cx("service-middle__desc__overview")}>Fresh drinking water</p>
            <p className={cx("service-middle__desc__overview")}>Health for the whole family</p>
          </div>
        </div>
        <div className={cx("service-right")}>
          <div className={cx("service-right__image")}>
            <img src={cuisine} alt="Cuisine" />
          </div>
          <div className={cx("service-right__desc")}>
            <h1 className={cx("service-middle__desc__title")}>NATIONAL CUISINE</h1>
            <p className={cx("service-middle__desc__overview")}>Tasty</p>
            <p className={cx("service-middle__desc__overview")}>Healthy</p>
            <p className={cx("service-middle__desc__overview")}>Unique</p>
          </div>
        </div>
      </div>

      <div className={cx("section-facilities")}>
        <div className={cx("section-facilities__container")}>
          <div className={cx("section-facilities__left")}>
            <img 
              src={facilities1} 
              alt="Cafe"  
              className={cx("facilities-1")}
            />
            <img 
              src={facilities2} 
              alt="Pool" 
              className={cx("facilities-2")}
            />
          </div>
          <div className={cx("section-facilities__right")}>
            <h1 className={cx("facilities-title")}>FACILITIES</h1>
            <div className={cx("facilities__desc")}>
              <p>We want your stay at our lush hotel to be truly unforgettable.  That is why we give special attention to all of your needs so that we can ensure an experience quite unique. </p>
            </div>
            <div className={cx("facilities__desc")}>
              <p>Luxury hotels offers the perfect setting with stunning views for leisure and our modern luxury resort facilities will help you enjoy the best of all. </p>
            </div>
            <div className={cx("facilities__desc")}>
              <p>The staff at the resort are always ready to serve customers 24/7, from picking up customers at the airport, advising on the best choice of rooms, services such as dining, entertainment and tours. local tourism. At the same time, we also have high-class facilities such as swimming pool, spa, gym, sports center, children's play area and high-class restaurant with famous chef, ensuring to meet all needs. needs of customers during their stay here.</p>
            </div>
            <div className={cx("facilities__learn-more")}>
              <Link to="/facilities" className={cx("learn-more__link")}>
                <span>LEARN MORE ➜</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("section-treatments")}>
        <div className={cx("section-treatments__container")}>
          <div className={cx("section-treatments__right")}>
            <img 
              src={treatments1} 
              alt="Treatment 1"  
              className={cx("treatments-1")}
            />
            <img 
              src={treatments2} 
              alt="Treatment 2" 
              className={cx("treatments-2")}
            />
          </div>
          <div className={cx("section-treatments__left")}>
            <h1 className={cx("treatments-title")}>TREATMENT AND COSMETOLOGY SERVICES</h1>
            <div className={cx("treatments__desc")}>
              <p>Among the many highly effective treatments are services such as mud baths, physiotherapy, prevention and treatment of skin diseases, sinusitis and liver disease. And thanks to our specialists in the field of cosmetology, your skin will become softer than the skin of a baby.</p>
            </div>
            <div className={cx("treatments__desc")}>
              <p>Work is carried out here all year round so that every vacationer is surrounded by attention and is in a favorable environment. </p>
            </div>
            <div className={cx("treatments__desc")}>
              <p>For vacationers and patients of the sanatorium, we have created and regularly maintain conditions under which everyone feels in a friendly and relaxed atmosphere.</p>
            </div>
            <div className={cx("treatments__learn-more")}>
              <Link to="/facilities" className={cx("learn-more__link")}>
                <span>LEARN MORE ➜</span>
              </Link>
            </div>
          </div>
        </div>
      </div>


      <Footer/>
      
    </div>
  )
}

export default Home