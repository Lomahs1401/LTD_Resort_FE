import React, { useState, useEffect } from "react";
import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import { BsFlagFill } from "react-icons/bs";
import { Divider } from "antd";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'

const cx = classNames.bind(styles);

const Comment = ({ key, comment, fullName, rating, avatar, }) => {
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  // Fetch image state
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Create a reference from a Google Cloud Storage URI
  const imageRef = ref(storage, avatar);

  useEffect(() => {
    const fetchAvatar = () => {
      getDownloadURL(imageRef).then((resolve) => {
        setAvatarUrl(resolve);
      }).catch((reject) => {
        console.log(reject)
      })
    }
    
    fetchAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className={cx("comment-wrapper")}>
      <div className={cx("comment-wrapper__left")}>
        <img src={avatarUrl} alt="Avatar" className={cx("avatar")} />
      </div>
      <div className={cx("comment-wrapper__middle")}>
        <div className={cx("score")}>
          <div className={cx("score-detail")}>
            <h4>{rating}.0 {RATING_DESC[rating-1]}</h4>
          </div>
          <Divider
            type="vertical"
            className={cx("seperate-line")}
            style={{ height: 30 }}
          />
          <div className={cx("score-username")}>
            <p>{fullName}</p>
          </div>
        </div>
        <div className={cx("comment-detail")}>
          <p>{comment}</p>
        </div>

      </div>
      <button className={cx("comment-wrapper__right")}>
        <div className={cx("report")}>
          <BsFlagFill />
        </div>
      </button>
    </div>
  );
};

export default Comment;
