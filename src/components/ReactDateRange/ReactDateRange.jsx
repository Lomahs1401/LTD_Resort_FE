import React, { useState } from 'react'
import styles from './ReactDateRange.module.scss'
import classNames from "classnames/bind";
import { DateRange } from 'react-date-range';
import { addDays, format } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const cx = classNames.bind(styles);

const ReactDateRange = () => {

  const [rangeDate, setRangeDate] = useState([{
    startDate: new Date(),
    endDate: addDays(new Date(), 7), 
    key: "selection"
  }]);

  return (
    <div className={cx("calendar-wrapper")}>
      <input 
        value={`${format(rangeDate[0].startDate, "dd-MM-yyyy")} to ${format(rangeDate[0].endDate, "dd-MM-yyyy")}`} 
        readOnly 
      />
      <DateRange
        onChange={(item) => setRangeDate([item.selection])}
        editableDateInputs
        moveRangeOnFirstSelection 
        ranges={rangeDate}
        months={2}
        direction='horizontal'
        className={cx("date-range-component")}
      />
    </div>
  )
}

export default ReactDateRange