import React from 'react'
import styles from './Header.module.scss'
import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faMugHot, faGear } from '@fortawesome/free-solid-svg-icons'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import AuthUser from '../../utils/AuthUser'
import { useSelector } from 'react-redux'
import { favouritesRoomsSelector, favouritesServicesSelector } from "../../redux/selectors";
import { Divider, Popover } from 'antd'
import { FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdFavorite } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const cx = classNames.bind(styles);

const Header = ({active, userInfo, imageUrl}) => {

  const FIND_ROOM = 'Find Rooms';
  const FIND_SERVICE = 'Find Services';
  const MANAGE_ACCOUNT = 'Manage Accounts';

  const favouritesRooms = useSelector(favouritesRoomsSelector);
  const favouritesServices = useSelector(favouritesServicesSelector);
  const totalFavouritesItem = favouritesRooms.length + favouritesServices.length;

  const { logout } = AuthUser();

  const handleLogout = () => {
    logout();
  }

  const title = (
    <div className={cx("title-wrapper")}>
      <h3>{userInfo.username}</h3>
      <Divider className={cx("seperate-line")} />
    </div>
  )

  const content = (
    <div className={cx("content-wrapper")}>
      <div className={cx("content-wrapper__link")}>
        <Link to="/favourites" className={cx("content-wrapper__link-item")}>
          <MdFavorite />
          <p>Favourites</p>
          <div className={cx("favourites-couter")} style={totalFavouritesItem > 0 ? {display: 'block'} : {display: 'none'}}>
            <span>{totalFavouritesItem}</span>
          </div>
        </Link>
        <Link to="/user-profile" className={cx("content-wrapper__link-item")}>
          <FaUser />
          <p>User Profile</p>
        </Link>
      </div>
      <Divider className={cx("seperate-line")} />
      <button className={cx("content-wrapper__logout")} onClick={handleLogout}>
        <FiLogOut size={16} />
        <p>Logout</p>
      </button>
    </div>
  );

  return (
    <div className={cx("header")}>
      <div className={cx("header__left")}>
        <div className={ active === FIND_ROOM ? cx("link-container__active") : cx("link-container")}>
          <div className={cx("link-nav")}>
            <FontAwesomeIcon icon={faBed} />
            <Link to={'/find-rooms'} className={cx("link-item")}>
              <span>Find Rooms</span>
            </Link>
          </div>
        </div>
        <div className={ active === FIND_SERVICE ? cx("link-container__active") : cx("link-container")}>
          <div className={cx("link-nav")}>
            <FontAwesomeIcon icon={faMugHot} />
            <Link to={'/find-services'} className={cx("link-item")}>
              <span>Find Services</span>
            </Link>
          </div>
        </div>
        <div className={ active === MANAGE_ACCOUNT ? cx("link-container__active") : cx("link-container")}>
          <div className={cx("link-nav")}>
            <FontAwesomeIcon icon={faGear} />
            <Link to={'/manage-account'} className={cx("link-item")}>
              <span>Manage Accounts</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={cx("header__middle")}>
        <img src={logo} alt='Logo'/>
      </div>
      <div className={cx("header__right")}>
        <div className={cx("header__right-info")}>
          <div className={cx("info-container")}>
            <div className={cx("info-container__welcome")}>WELCOME</div>
            <div className={cx("info-container__name")}>{userInfo.username}</div>
          </div>
        </div>
        <div className={cx("header__right-avatar")}>
          <div className={cx("avatar")}>
            <Popover content={content} title={title} trigger='click'>
              <LazyLoadImage
                key={imageUrl}
                src={imageUrl}
                alt='Avatar'
                effect='blur'
                placeholderSrc={imageUrl}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header