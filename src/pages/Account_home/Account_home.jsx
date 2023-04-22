import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Steps, theme } from 'antd';
import styles from "./Account_home.module.scss";
import classNames from "classnames/bind";
// import 'antd/dist/reset.css';

import info from "../../components/Account_info_/Customer_info/Customer_info";


const cx = classNames.bind(styles);
const steps = [
  {
    title: 'Accout',
    content: 'Accout-content',
  },
  {
    title: 'Hisstory',
    content: 'Hisstory-content',
  },
  {
    title: 'Booking',
    content: 'Booking-content',
  },
];

const Account_home = () => {
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
            <Link className={cx("button-head")} to="/login">
              Login
            </Link>
            <Link className={cx("button-head")} to="/register">
              Register
            </Link>
            <div className={cx("button-head")}> Find Rooms </div>
            <div className={cx("button-head")}> Find Services </div>
            <div className={cx("button-head")}> Manage Accounts </div>
          </div>
          <div className={cx("right")}>
            <div className={cx("frame-010")}>
              <div className={cx("welcome")}>
                <div className={cx("frame-007")}>welcome</div>
                <div className={cx("Name")}>duc</div>
              </div>
            </div>
            <div>
              <img
                className={cx("account__image-small")}
                src="./photo/icon@2x.png"
              />
            </div>
            <div>
              <button className={cx("Logout")}>LOG OUT</button>
            </div>
          </div>
        </div>
        <div className={cx("picture")}>
          <div className={cx("image")}>
            <img src="./photo/rectangle-3.png" />
          </div>
          <div className={cx("image")}>
            <img
              className={cx("account__image-larger")}
              src="./photo/icon@2x.png"
            />
          </div>
        </div>

        <div className={cx("action")}>
          <Steps current={current} items={items} type="navigation" onChange={onChange} />
        </div>
        <div style={contentStyle}>{steps[current].content}</div>


        
        <div className={cx("end")}>
          <div
            className={cx("end")}
            style={{ alignItems: "center", padding: "0%" }}
          >
            <div className={cx("frame-044")}>
              <div className={cx("frame-045")}>
                <div className={cx("text-1")}>About Us</div>
                <div className={cx("text-1")}>Treatment</div>
                <div className={cx("text-1")}>Entertainment</div>
                <div className={cx("text-1")}>Cosmetology</div>
                <div className={cx("text-1")}>Contacts</div>
              </div>
              <div className={cx("frame-045")}>
                <div className={cx("text-1")} style={{ fontSize: "25px" }}>
                  Address
                </div>

                <div className={cx("text-1")}>
                  103 - 105 Vo Nguyen Giap Street, Khue My Ward
                </div>
                <div className={cx("text-1")}>
                  Ngu Hanh Son District, Danang City, Vietnam
                </div>
              </div>
              <div className={cx("frame-045")}>
                <div className={cx("text-1")} style={{ fontSize: "25px" }}>
                  Contacts
                </div>
                <div className={cx("text-1")}>Tel.: 84-236-3847 333/888</div>
                <div className={cx("text-1")}>Fax: 84-236-3847 666</div>
                <div className={cx("text-1")}>ltdresort@gmail.com</div>
              </div>
              <div className={cx("frame-045")}>
                <div className={cx("text-1")} style={{ fontSize: "25px" }}>
                  Follow us
                </div>
                <div className={cx("text-1")}>ldtresort.kz</div>
                <div className={cx("text-1")}>instagram/ltdresort</div>
              </div>
            </div>
          </div>
          <div
            className={cx("label-1")}
            style={{ color: "aliceblue", gap: "5%" }}
          >
            <div>© 2023 LTD Resort Danang</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account_home;
