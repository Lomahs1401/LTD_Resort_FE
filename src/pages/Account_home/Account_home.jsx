import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Steps, theme } from 'antd';
import styles from "./Account_home.module.scss";
import classNames from "classnames/bind";

import Customer_info from "../../components/Account_info_/Customer_info/Customer_info";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed , faMugHot, faGear, faPen} from '@fortawesome/free-solid-svg-icons'
import Footer from '../../layouts/Footer/Footer';
import cover from '../../img/content1.jpg'
import test from '../../img/testimonial1.png'
import logo from '../../img/logo.png'

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
   //
   //

  const { token } = theme.useToken();
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
        <div className={cx("Header")}>
          <div className={cx("left")}>
            {/* <Link className={cx("button-head")} to="/login" >
            <span>Login</span>
            </Link>
            
            <Link className={cx("button-head")} to="/register">
              Register
            </Link> */}
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
