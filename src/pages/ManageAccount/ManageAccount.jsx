import React, { useEffect, useState } from "react";
import styles from "./ManageAccount.module.scss";
import classNames from "classnames/bind";
import { Steps, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../layouts/Footer/Footer';
import cover from '../../img/content1.jpg'
import Headers from '../../layouts/Header/Header'
import AuthUser from "../../utils/AuthUser";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Loading from '../../components/Loading/Loading';
import AccountHistory from "../../components/AccountHistory/AccountHistory";
import AccountBooking from "../../components/AccountBooking/AccountBooking";
import { FaBookmark, FaHistory, FaUser } from "react-icons/fa";

const cx = classNames.bind(styles);

const ManageAccount = () => {

  const items = [
    {
      title: 'Account',
      content: <AccountInfo />,
      icon: <FaUser />,
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

  const { user } = AuthUser();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Create a reference from a Google Cloud Storage URI
  const avatarRef = ref(storage, user.avatar);

  const onChange = (value) => {
    setCurrent(value);
  };

  useEffect(() => {
    getDownloadURL(avatarRef).then(url => {
      setImageUrl(url);
      setLoading(true);
    })
  }, [avatarRef])

  if (!loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div>
        <div className={cx("manage-account-wrapper")}>
          <Headers active='Manage Accounts' userInfo={user} imageUrl={imageUrl} />
          <div className={cx("manage-account-wrapper__top")}>
            <div className={cx("image-bg")} >
              <img 
                src={cover} 
                alt="Background Manage Account" 
              />
            </div>
            <div className={cx("image-avatar")}>
              <div className={cx("avatar-container")}>
                <img
                  src={imageUrl}
                  alt="User Avatar"
                />
                <button className={cx("btn-edit")}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
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
}

export default ManageAccount