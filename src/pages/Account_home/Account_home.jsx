import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Steps, theme } from 'antd';
import styles from "./Account_home.module.scss";
import classNames from "classnames/bind";
import Customer_info from "../../components/Account_info_/Customer_info/Customer_info";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../layouts/Footer/Footer';
import cover from '../../img/content1.jpg'
import test from '../../img/testimonial1.png'
import logo from '../../img/logo.png'
import Headers from '../../layouts/Header/Header'
import AuthUser from "../../AuthUser";
const cx = classNames.bind(styles);

const steps = [
  {
    title: 'Account',
    content: <Customer_info id = {2} />,
  },
  {
    title: 'History',
    content: 'History-content',
  },
  {
    title: 'Booking',
    content: 'Booking-content',
  },
];

const Account_home = () => {
  const { token } = theme.useToken();
  const { user } = AuthUser();
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div>
      <div className={cx("Account")}>
        <Headers active='Manage Accounts' userInfo={user} />
        
        <div className={cx("Cover")}>
          <div className={cx("image")} >
            <img src={cover} style={{objectFit: "cover",width: "100vw",height: "500px"}} />
          </div>
          <div className={cx("image")} style={{marginTop: "-100px",borderRadius: "50%"}}>
            <img
              className={cx("account__image-larger")}
              src={test}
              style={{justifyContent:"center", border: "2px solid #FF8682"}}
            />
            <button className={cx("Button__Edit")}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <h1>aaa</h1>
          </div>
        </div>
        <div className={cx("info")}>
          <div className={cx("action")}>
            <Steps current={current} items={items} type="navigation" onChange={onChange} />
          </div>
          <div style={contentStyle}>{steps[current].content}</div>
        </div>

        <Footer/>
      </div>
    </div>
  );
};

export default Account_home;
