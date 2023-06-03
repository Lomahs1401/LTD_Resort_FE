import React, { useState, useEffect } from 'react'
import styles from "./UserProfileModal.module.scss";
import classNames from "classnames/bind";
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { Diamond } from '@mui/icons-material';
import AuthUser from '../../utils/AuthUser';

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
  rankingPoint
}) => {

  const { http } = AuthUser();

  const RANKING_BRONZE = "Bronze";
  const RANKING_SILVER = "Silver";
  const RANKING_GOLD = "Gold";
  const RANKING_PLATINUM = "Platinum";
  const RANKING_DIAMOND = "Diamond";

  const [isLoading, setIsLoading] = useState(false);
  const [customerRanking, setCustomerRanking] = useState();

  useEffect(() => {
    http.get(`/customer/ranking/${accountId}`)
      .then((resolve) => {
        setCustomerRanking(resolve.data.ranking_name);
      })
      .catch((reject) => {
        console.log(reject);
      })

    setIsLoading(true);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoading) {
    return <></>
  } else {
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
                  if (customerRanking === RANKING_BRONZE) {
                    return <Diamond style={{ fontSize: 32, marginRight: '-6px', color: '#A77044' }} />
                  }
                  else if (customerRanking === RANKING_SILVER) {
                    return <Diamond style={{ fontSize: 32, marginRight: '-6px', color: '#D7D7D7' }} />
                  }
                  else if (customerRanking === RANKING_GOLD) {
                    return <Diamond style={{ fontSize: 32, marginRight: '-6px', color: '#FEE101' }} />
                  }
                  else if (customerRanking === RANKING_PLATINUM) {
                    return <Diamond style={{ fontSize: 32, marginRight: '-6px', color: '#79CCE4' }} />
                  }
                  else if (customerRanking === RANKING_DIAMOND) {
                    return <Diamond style={{ fontSize: 32, marginRight: '-6px', color: '#225684' }} />
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfileModal