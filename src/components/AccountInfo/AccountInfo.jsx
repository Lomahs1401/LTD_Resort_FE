import React from 'react'
import styles from './AccountInfo.module.scss'
import classNames from 'classnames/bind'
import { EditOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import AuthUser from '../../utils/AuthUser';
import { useEffect } from 'react';
import { useState } from 'react';
import { Diamond } from '@mui/icons-material';

const cx = classNames.bind(styles)

const AccountInfo = () => {

  const { http, user } = AuthUser();

  const RANKING_BRONZE = "Bronze";
  const RANKING_SILVER = "Silver";
  const RANKING_GOLD = "Gold";
  const RANKING_PLATINUM = "Platinum";
  const RANKING_DIAMOND = "Diamond";


  // Fetch acustomer info state
  const [customerInfo, setCustomerInfo] = useState();
  const [customerRanking, setCustomerRanking] = useState();

  const handleChange = () => {

  }

  const [isLoading, setIsLoading] = useState(false);

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
      http.get(`/customer-ranking/${user.id}`)
        .then((resolve) => {
          setCustomerRanking(resolve.data.ranking_name);
        })
        .catch((reject) => {
          console.log(reject);
        })
    }

    fetchData();
    setIsLoading(true);
  }, [])

  if (!isLoading) {
    return (
      <></>
    )
  } else {
    return (
      <div className={cx("account-info-wrapper")}>
        <div className={cx("account-info-wrapper__top")}>
          <h1 className={cx("header")}>Account Information</h1>
          <button
            className={cx("btn-change")}
            onClick={handleChange}
          >
            <EditOutlined />
            <span>Change</span>
          </button>
        </div>
        <Divider className={cx("seperate-line")} />
        <div className={cx("account-info-wrapper__bottom")}>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Name</div>
              <div className={cx("content-text")}>{customerInfo?.full_name ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {customerInfo?.full_name ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Gender</div>
              <div className={cx("content-text")}>{customerInfo?.gender ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {customerInfo?.gender ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Date of birth</div>
              <div className={cx("content-text")}>{customerInfo?.birthday ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {customerInfo?.birthday ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>ID Card</div>
              <div className={cx("content-text")}>{customerInfo?.CMND ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {customerInfo?.CMND ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Address</div>
              <div className={cx("content-text")}>{customerInfo?.address ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {customerInfo?.address ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Phone number</div>
              <div className={cx("content-text")}>{customerInfo?.phone ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {customerInfo?.phone ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Ranking point</div>
              <div className={cx("content-text")}>{customerInfo?.ranking_point ?? "No information provided"}</div>
            </div>
            <div className={cx("info-container__right")}>
              {(() => {
                if (customerRanking == RANKING_BRONZE) {
                  return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#A77044' }} />
                }
                else if (customerRanking === RANKING_SILVER) {
                  return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#D7D7D7' }} />
                }
                else if (customerRanking === RANKING_GOLD) {
                  return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#FEE101' }} />
                }
                else if (customerRanking === RANKING_PLATINUM) {
                  return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#79CCE4' }} />
                }
                else if (customerRanking === RANKING_DIAMOND) {
                  return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#225684' }} />
                }
              })()}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Password</div>
              <div className={cx("content-text")}>************</div>
            </div>
            <div className={cx("info-container__right")}>
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountInfo