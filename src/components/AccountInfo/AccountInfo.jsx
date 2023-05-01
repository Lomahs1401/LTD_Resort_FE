import React from 'react'
import styles from './AccountInfo.module.scss'
import classNames from 'classnames/bind'
import { EditOutlined } from '@ant-design/icons';
import diamond from '../../img/rankDiamond.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-solid-svg-icons'
import { Divider } from 'antd';
import { FaCheckCircle } from 'react-icons/fa';

const cx = classNames.bind(styles)

const AccountInfo = () => {

  const handleChange = () => {

  }

  return (
    <div className={cx("account-info-wrapper")}>
      <div className={cx("account-info-wrapper__top")}>
        <h1 className={cx("header")}>Account Information</h1>
        <button 
          className={cx("btn-change")} 
          onClick={handleChange}
        >
          <EditOutlined />
          <span>Change</span>
        </button>
      </div>
      <Divider className={cx("seperate-line")} />  
      <div className={cx("account-info-wrapper__bottom")}>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Name</div>
            <div className={cx("content-text")}>Duc</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Gender</div>
            <div className={cx("content-text")}>Nữ</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Email</div>
            <div className={cx("content-text")}>john.doe@gmail.com</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Password</div>
            <div className={cx("content-text")}>************</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Phone number</div>
            <div className={cx("content-text")}>+1 000-000-0000</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Address</div>
            <div className={cx("content-text")}>St 32 main downtown, Los Angeles, California, USA</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Date of birth</div>
            <div className={cx("content-text")}>01-01-1992</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Ranking point</div>
            <div className={cx("content-text")}>15000</div>
          </div>
          <div className={cx("info-container__right")}>
            <img src={diamond} alt="Ranking" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInfo