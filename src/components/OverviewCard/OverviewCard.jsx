import React from 'react'
import styles from './OverviewCard.module.scss'
import classNames from 'classnames/bind'
import { Card, Divider, Rate } from 'antd';
const { Meta } = Card;

const cx = classNames.bind(styles);

const OverviewCard = ({ image, bedroomType, roomType, price, ranking, description }) => {

  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  return (
    <div className={cx("card-container")}>
      <div className={cx("card-content")}>
        <p className={cx("bedroom-type")}>{bedroomType}</p>
        <p className={cx("room-type")}>{roomType}</p>
        <Divider className={cx("seperate-line-content")}/>
        <span className={cx("price")}>{price} VND</span>
        <div className={cx("ranking-container")}>
          <Rate 
            disabled
            tooltips={RATING_DESC}
            defaultValue={ranking}
            style={{color: '#FF8682'}}
          />
          <p className="ant-rate-text">{ranking} Star Room</p>
        </div>
        <button className={cx("btn-booking")}>
          <p>Book room</p>
        </button>
      </div>
      <div className={cx("card-img")}>
        <img alt="example" src={image} />
      </div>
    </div>
  )
}

export default OverviewCard