import React from 'react'
import styles from './AccountHistory.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AccountHistory = () => {
  return (
    <div className={cx("account-history-wrapper")}>
        Account History
    </div>
  )
}

export default AccountHistory