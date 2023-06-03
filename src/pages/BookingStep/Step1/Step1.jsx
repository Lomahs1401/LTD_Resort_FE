import React from 'react'
import styles from './Step1.module.scss'
import classNames from "classnames/bind";
import ReactDateRangePicker from '../../../components/ReactDateRangePicker/ReactDateRangePicker';
import ReactCalendar from '../../../components/ReactCalendar/ReactCalendar';

const cx = classNames.bind(styles);

const Step1 = () => {

  return (
    <div className={cx("booking-step-wrapper")}>
      <h1>Choose a booking period</h1>
      <ReactCalendar/>
      <ReactDateRangePicker/>
    </div>
  )
}

export default Step1