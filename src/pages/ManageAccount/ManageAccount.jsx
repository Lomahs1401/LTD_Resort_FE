import React, { useState, useEffect } from "react";
import styles from "./ManageAccount.module.scss";
import classNames from "classnames/bind";
import { Steps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../layouts/Footer/Footer';
import cover from '../../img/content1.jpg'
import Headers from '../../layouts/Header/Header'
import AuthUser from "../../utils/AuthUser";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import AccountHistory from "../../components/AccountHistory/AccountHistory";
import AccountBooking from "../../components/AccountBooking/AccountBooking";
import { FaBookmark, FaHistory, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { avatarSelector } from "../../redux/selectors";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from '../../utils/firebase'
import { v4 } from "uuid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ConfirmationToast from "../../components/ConfirmationToast/ConfirmationToast";
import { addAvatar } from "../../redux/actions";

const cx = classNames.bind(styles);

const ManageAccount = () => {
  const { http, user } = AuthUser();
  const [current, setCurrent] = useState(0);
  
  // Fetch acustomer info state
  const [customerInfo, setCustomerInfo] = useState();
  const [customerRanking, setCustomerRanking] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  // Create a reference from a Google Cloud Storage URI
  const avatar = useSelector(avatarSelector);

  const items = [
    {
      title: 'Account',
      content: <AccountInfo customerInfo={customerInfo} customerRanking={customerRanking} />,
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

  const onChange = (value) => {
    setCurrent(value);
  };

  const handleChangeAvatar = () => {
    document.getElementById('fileInput').click();
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile !== imageUpload) {
        toast.info(
          <ConfirmationToast
            message="Do you want to save avatar?"
            onConfirm={() => uploadImage(selectedFile)}
            onCancel={() => setImageUpload(null)}
          />, {
          position: "top-center",
          closeOnClick: true,
          draggable: false,
          progress: 1,
          theme: "colored",
          style: { cursor: 'default' },
        })
      }
    }
  }

  const uploadImage = (file) => {
    // Gửi đường dẫn ảnh đến Laravel để lưu vào database
    // (Sử dụng API hoặc các phương thức khác để thực hiện tác vụ này)

    const avatarRef = ref(storage, `avatars/${file.name + v4()}`);
    uploadBytes(avatarRef, file).then(() => {
      getDownloadURL(avatarRef).then((url) => {
        // Upload ảnh lên Firebase Storage
        const formData = new FormData();

        formData.append('avatar_url', url);

        http.patch(`auth/accounts/${user.id}`, formData)
          .then((resolve) => {
            console.log(resolve);
            Swal.fire(
              'Update!',
              'You have successfully update your avatar',
              'success'
            ).then(() => {
              dispatch(addAvatar(url));
              navigate(0);
            })
          })
          .catch((reject) => {
            console.log(reject);
          })
      })
    })
  }

  // --------------------------     Fetch API     --------------------------
  useEffect(() => {
    const fetchData = () => {
      http.get(`/customer/account/${user.id}`)
        .then((resolve) => {
          setCustomerInfo(resolve.data.customer);
        })
        .catch((reject) => {
          console.log(reject);
        })
      http.get(`/customer/ranking/${user.id}`)
        .then((resolve) => {
          setCustomerRanking(resolve.data.ranking_name);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoading) {
    return (
      <></>
    )
  } else {
    return (
      <div>
        <div className={cx("manage-account-wrapper")}>
          <Headers active='Manage Accounts' userInfo={user} imageUrl={avatar} />
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
                  src={avatar}
                  alt="User Avatar"
                />
                <button
                  className={cx("btn-edit")}
                  onClick={handleChangeAvatar}
                >
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
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