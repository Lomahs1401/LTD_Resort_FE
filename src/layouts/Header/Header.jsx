import React from 'react'
import styles from './Header.module.scss'
import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faMugHot, faGear, faHeart } from '@fortawesome/free-solid-svg-icons'
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import AuthUser from '../../utils/AuthUser'

const cx = classNames.bind(styles);

const Header = ({active, userInfo, imageUrl}) => {

  const FIND_ROOM = 'Find Rooms';
  const FIND_SERVICE = 'Find Services';
  const MANAGE_ACCOUNT = 'Manage Accounts';
  
  const { logout } = AuthUser();

  const handleLogout = () => {
    logout();
  }

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
            <img
              src={imageUrl}
              alt='Avatar'
            />
          </div>
        </div>
        <div className={cx("header__right-favourites")}>
          <div className={cx("favourites-container")}>
            <FontAwesomeIcon icon={faHeart} />
            <Link to={'/favourites'} className={cx("favourites-link")}>
              <span>Favourites</span>
            </Link>
          </div>
        </div>
        <div className={cx("btn-logout__container")}>
          <button className={cx("btn-logout")} onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Header