import React from 'react'
import styles from './ReactDefinedRange.module.scss'
import classNames from "classnames/bind";
import { DefinedRange } from 'react-date-range';

const cx = classNames.bind(styles);

const ReactDefinedRange = ({ rangeDate, setRangeDate }) => {
  const handleChangeDefinedRange = (item) => {
    console.log(item);
    setRangeDate([item.selection])
  }

  return (
    <div className={cx("defined-range-wrapper")}>
      <DefinedRange
        onChange={handleChangeDefinedRange}
        ranges={rangeDate}
        className={cx("defined-range-component")}
      />
    </div>
  )
}

export default ReactDefinedRange