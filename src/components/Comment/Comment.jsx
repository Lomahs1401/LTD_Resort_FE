import React, { useState, useEffect, useRef } from "react";
import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import { BsFlagFill } from "react-icons/bs";
import { Divider, Modal } from "antd";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Draggable from "react-draggable";
import UserProfile from "../UserProfile/UserProfile";
import { LazyLoadImage } from "react-lazy-load-image-component";

const cx = classNames.bind(styles);

const Comment = ({ 
  accountId,
  avatar, 
  comment, 
  username, 
  rating, 
  fullName, 
  email,
  gender, 
  birthDate, 
  ID_Card, 
  address, 
  phone, 
  rankingPoint 
}) => {
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  // Fetch image state
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Create a reference from a Google Cloud Storage URI
  const imageRef = ref(storage, avatar);

  const [openModal, setOpenModal] = useState(false);

  // Handle click out boundary of modal 
  const handleOk = () => {
    setOpenModal(false);
  }

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
  }

  const handleClickUsername = () => {
    setOpenModal(true)
  }

  // ---------------------------      Modal Draggable      ---------------------------
  const draggleRef = useRef(null);
  const [disabled, ] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

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
        <LazyLoadImage
          key={avatarUrl}
          src={avatarUrl}
          alt={`${avatarUrl}`}
          effect="blur"
          placeholderSrc={avatarUrl}
        />
      </div>
      <div className={cx("comment-wrapper__middle")}>
        <div className={cx("score")}>
          <div className={cx("score-detail")}>
            <h4>{rating}.0 {RATING_DESC[rating - 1]}</h4>
          </div>
          <Divider
            type="vertical"
            className={cx("seperate-line")}
            style={{ height: 30 }}
          />
          <div className={cx("score-username")}>
            <p onClick={handleClickUsername}>{username}</p>
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
      <Modal
        title={
          <UserProfile 
            accountId={accountId}
            avatar={avatarUrl} 
            username={username}
            fullName={fullName}
            email={email}
            gender={gender}
            birthDate={birthDate}
            ID_Card={ID_Card}
            address={address}
            phone={phone}
            rankingPoint={rankingPoint}
          />
        }
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      />
    </div>
  );
};

export default Comment;
