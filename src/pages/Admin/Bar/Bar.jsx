import React from 'react'
import Header from "../../../components/Header/Header";
import BarChart from "../../../components/BarChart/BarChart";
import styles from './Bar.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles);

const Bar = () => {
  return (
    <div className={cx("bar-wrapper")}>
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <div className={cx("bar-wrapper__graph")} height="75vh">
        <BarChart />
      </div>
    </div>
  );
};

export default Bar;