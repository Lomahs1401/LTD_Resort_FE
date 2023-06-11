import React, { useState, useEffect } from "react";
import styles from "./ManageAccount.module.scss";
import classNames from "classnames/bind";
import { Steps } from 'antd';
import Footer from '../../layouts/Footer/Footer';
import background from '../../img/resort.jpg'
import Headers from '../../layouts/Header/Header'
import AuthUser from "../../utils/AuthUser";
import AccountHistory from "../../components/AccountHistory/AccountHistory";
import AccountBooking from "../../components/AccountBooking/AccountBooking";
import { FaBookmark, FaHistory, FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { avatarSelector } from "../../redux/selectors";
import Cart from "../../components/Cart/Cart";

const cx = classNames.bind(styles);

const ManageAccount = () => {
  const { http, user } = AuthUser();
  const [current, setCurrent] = useState(0);

  // Create a reference from a Google Cloud Storage URI
  const avatar = useSelector(avatarSelector);

  const items = [
    {
      title: 'Cart',
      content: <Cart />,
      icon: <FaCartArrowDown />,
    },
    {
      title: 'History',
      content: <AccountHistory />,
      icon: <FaHistory />,
    },
    {
      title: 'Booking',
      content: <AccountBooking />,
      icon: <FaBookmark />,
    },
  ]

  const onChange = (value) => {
    setCurrent(value);
  };

  // --------------------------     Fetch API     --------------------------
  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className={cx("manage-account-wrapper")}>
        <Headers active='Manage Accounts' userInfo={user} imageUrl={avatar} />
        <div className={cx("manage-account-wrapper__top")}>
          <div className={cx("image-bg")} >
            <img
              src={background}
              alt="Background Manage Account"
              style={{objectFit: 'cover'}}
            />
          </div>
          <div className={cx("image-avatar")}>
            <div className={cx("avatar-container")}>
              <img
                src={avatar}
                alt="User Avatar"
              />
            </div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className={cx("manage-account-wrapper__bottom")}>
          <div className={cx("action")}>
            <Steps
              current={current}
              items={items}
              type="navigation"
              onChange={onChange}
            />
          </div>
          <div className={cx("content")}>{items[current].content}</div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ManageAccount