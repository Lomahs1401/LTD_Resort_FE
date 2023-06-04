import React from 'react'
import styles from "./UserProfileModal.module.scss";
import classNames from "classnames/bind";
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { MdDiamond } from 'react-icons/md';

const cx = classNames.bind(styles);

const UserProfileModal = ({
  accountId,
  avatar,
  username,
  fullName,
  email,
  gender,
  birthDate,
  ID_Card,
  address,
  phone,
  rankingPoint,
  rankingName
}) => {

  const RANKING_BRONZE = "Bronze";
  const RANKING_SILVER = "Silver";
  const RANKING_GOLD = "Gold";
  const RANKING_PLATINUM = "Platinum";
  const RANKING_DIAMOND = "Diamond";

  return (
    <div className={cx("user-profile-wrapper")}>
      <h1>User Profile</h1>
      <div className={cx("user-profile-wrapper__top")}>
        <img src={avatar} alt='Avatar' />
        <h2>{username}</h2>
      </div>
      <div className={cx("user-profile-wrapper__bottom")}>
        <div className={cx("bottom-left")}>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Name</div>
              <div className={cx("content-text")}>{fullName ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {fullName ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Email</div>
              <div className={cx("content-text")}>{email ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {email ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Gender</div>
              <div className={cx("content-text")}>{gender ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {gender ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
        </div>
        <div className={cx("bottom-right")}>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Date of birth</div>
              <div className={cx("content-text")}>{birthDate ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {birthDate ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Address</div>
              <div className={cx("content-text")}>{address ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {address ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Ranking point</div>
              <div className={cx("content-text")}>{rankingPoint ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {(() => {
                if (rankingName === RANKING_BRONZE) {
                  return <MdDiamond style={{ fontSize: 32, marginRight: '-6px', color: '#A77044' }} />
                }
                else if (rankingName === RANKING_SILVER) {
                  return <MdDiamond style={{ fontSize: 32, marginRight: '-6px', color: '#D7D7D7' }} />
                }
                else if (rankingName === RANKING_GOLD) {
                  return <MdDiamond style={{ fontSize: 32, marginRight: '-6px', color: '#FEE101' }} />
                }
                else if (rankingName === RANKING_PLATINUM) {
                  return <MdDiamond style={{ fontSize: 32, marginRight: '-6px', color: '#79CCE4' }} />
                }
                else if (rankingName === RANKING_DIAMOND) {
                  return <MdDiamond style={{ fontSize: 32, marginRight: '-6px', color: '#225684' }} />
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal