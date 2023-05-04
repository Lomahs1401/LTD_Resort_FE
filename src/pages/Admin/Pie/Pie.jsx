import React from 'react'
import Header from "../../../components/Header/Header";
import PieChart from "../../../components/PieChart/PieChart";
import styles from './Pie.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles);

const Pie = () => {
  return (
    <div className={cx("pie-wrapper")}>
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <div className={cx("pie-wrapper__graph")} height="75vh">
        <PieChart />
      </div>
    </div>
  );
};

export default Pie;