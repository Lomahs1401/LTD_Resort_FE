import React from 'react'
import styles from './OverviewCard.module.scss'
import classNames from 'classnames/bind'
import { Divider, Rate } from 'antd';
const cx = classNames.bind(styles);

const OverviewCard = ({ image, bedroomType = '', roomType = '', service = '', price, ranking, type, description }) => {

  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  return (
    <div className={cx("card-container")}>
      <div className={cx("card-content")}>
        {bedroomType && <p className={cx("bedroom-type")}>{bedroomType}</p>}
        {roomType && <p className={cx("room-type")}>{roomType}</p>}
        {service && <p className={cx("service-type")}>{service}</p>}
        <Divider className={cx("seperate-line-content")}/>
        <span className={cx("price")}>{price} VND</span>
        <div className={cx("ranking-container")}>
          <Rate 
            disabled
            tooltips={RATING_DESC}
            defaultValue={ranking}
            style={{color: '#FF8682'}}
          />
          <p className="ant-rate-text">{ranking} Star {type}</p>
        </div>
        <button className={cx("btn-booking")}>
          <p>{description}</p>
        </button>
      </div>
      <div className={cx("card-img")}>
        <img alt={`${bedroomType} - ${roomType} ${service}`} src={image} />
      </div>
    </div>
  )
}

export default OverviewCard