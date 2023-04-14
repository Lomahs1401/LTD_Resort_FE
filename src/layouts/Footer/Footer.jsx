import React from 'react'
import styles from './Footer.module.scss'
import classNames from "classnames/bind"
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("footer")}>
      <div className={cx("footer-content")}>
        <ul className={cx("footer-list-item")}>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__link")}>
              About Us
            </Link>
          </li>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__link")}>
              Treatment
            </Link>
          </li>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__link")}>
              Entertainment
            </Link>
          </li>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__link")}>
              Cosmetology
            </Link>
          </li>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__link")}>
              Contacts
            </Link>
          </li>
        </ul>
        <ul className={cx("footer-list-item")}>
          <div className={cx("footer-address")}>Address</div>
          <li className={cx("footer-item")}>
            103 - 105 Vo Nguyen Giap Street, Khue My Ward
          </li>
          <li className={cx("footer-item")}>
            Ngu Hanh Son District, Danang City, Vietnam
          </li>
        </ul>
        <ul className={cx("footer-list-item")}>
        <div className={cx("footer-contact")}>Contact</div>
          <li className={cx("footer-item")}>
            Tel.: 84-236-3847 333/888
          </li>
          <li className={cx("footer-item")}>
            Fax: 84-236-3847 666
          </li>
          <li className={cx("footer-item")}>
            ltdresort@gmail.com
          </li>
        </ul>
        <ul className={cx("footer-list-item")}>
          <div className={cx("footer-follow-us")}>Follow us</div>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__navigate")}>
              <FaFacebook />
              ldtresort.kz
            </Link>
          </li>
          <li className={cx("footer-item")}>
            <Link to="/" className={cx("footer-item__navigate")}>
              <FiInstagram />
              instagram
            </Link>
          </li>
        </ul>
      </div>
      <div className={cx("footer-copyright")}>
        <p>© 2023 LTD Resort Danang</p>
      </div>
    </div>
  )
}

export default Footer