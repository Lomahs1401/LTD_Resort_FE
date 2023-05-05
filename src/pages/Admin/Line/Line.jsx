import React from 'react'
import Header from "../../../components/Header/Header";
import LineChart from "../../../components/LineChart/LineChart";
import styles from './Line.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles);

const Line = () => {
  return (
    <div className={cx("line-wrapper")}>
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <div className={cx("line-wrapper__graph")}>
        <LineChart />
      </div>
    </div>
  );
};

export default Line;