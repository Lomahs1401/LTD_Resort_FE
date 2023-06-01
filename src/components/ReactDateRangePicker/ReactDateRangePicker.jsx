import React, { useState } from 'react'
import styles from './ReactDateRangePicker.module.scss'
import classNames from "classnames/bind";
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const cx = classNames.bind(styles);

const ReactDateRangePicker = () => {

  const [rangeDate, setRangeDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection"
    }
  ]);

  return (
    <div className={cx("date-range-picker-wrapper")}>
      {/* <input 
        value={`${format(rangeDate[0].startDate, "dd-MM-yyyy")} to ${format(rangeDate[0].endDate, "dd-MM-yyyy")}`} 
        readOnly 
      /> */}
      <DateRangePicker
        onChange={(item) => setRangeDate([item.selection])}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={rangeDate}
        months={2}
        direction='horizontal'
        classNames={cx("date-range-picker-component")}
      />
    </div>
  )
}

export default ReactDateRangePicker