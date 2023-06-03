import React, { useState } from 'react'
import styles from './ReactCalendar.module.scss'
import classNames from "classnames/bind";
import { Calendar } from 'react-date-range';
import { format } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const cx = classNames.bind(styles);

const ReactCalendar = () => {

  const [calendar, setCalendar] = useState(format(new Date(), "dd/MM/yyyy"));

  const handleSelect = (date) => {
    console.log(date);
    setCalendar(format(date, "dd/MM/yyyy"));
  }

  return (
    <div className={cx("calendar-wrapper")}>
      <input value={calendar} readOnly />
      <Calendar
        date={new Date()}
        onChange={handleSelect}
        className={cx("calendar-component")}
      />
    </div>
  )
}

export default ReactCalendar