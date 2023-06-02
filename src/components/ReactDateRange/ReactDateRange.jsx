import React from 'react'
import styles from './ReactDateRange.module.scss'
import classNames from "classnames/bind";
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';

const cx = classNames.bind(styles);

const ReactDateRange = ({ locale, rangeDate, setRangeDate }) => {

  const minDate = new Date();

  return (
    <div className={cx("date-range-wrapper")}>
      <DateRange
        className={cx("date-range-component")}
        direction='horizontal'
        fixedHeight={true}
        locale={locales[locale]}
        months={2}
        moveRangeOnFirstSelection 
        minDate={minDate}
        ranges={rangeDate}
        onChange={(item) => setRangeDate([item.selection])}
      />
    </div>
  )
}

export default ReactDateRange