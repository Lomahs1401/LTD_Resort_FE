import React from 'react'
import styles from './Header.module.scss'
import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed , faMugHot, faGear, faPen} from '@fortawesome/free-solid-svg-icons'
import test from '../../img/testimonial1.png'
import logo from '../../img/logo.png'

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("Header")}>
          <div className={cx("left")}>
            <div className={cx("button-head")}> 
              <FontAwesomeIcon icon={faBed} />
              <span>Find Rooms </span>
            </div>
            <div className={cx("button-head")}>
              <FontAwesomeIcon icon={faMugHot} />
              <span>Find Services</span> 
            </div>
            <div className={cx("button-head")} style={{color: "#8DD3BB"}}>
              <FontAwesomeIcon icon={faGear} />
              <span>Manage Accounts</span>
            </div>
          </div>
          <img src={logo} style={{height: "50px"}}/>
          <div className={cx("right")}>
            <div className={cx("frame-010")}>
              <div className={cx("frame-007")}>welcome</div>
              <div className={cx("Name")}>duc</div>
              
            </div>
            <div className={cx("small_avatar")}>
              <img
                className={cx("account__image-small")}
                src={test}
              />
            </div>
            <div className={cx("Button-Logout")}>
              <button className={cx("Logout")}>LOG OUT</button>
            </div>
          </div>
        </div>
  )
}

export default Header