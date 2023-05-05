import React from 'react'
import Header from "../../../components/Header/Header";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../utils/theme";
import GeographyChart from "../../../components/GeographyChart/GeographyChart";
import styles from './Geography.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles);

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <div className={cx("geography-wrapper")}>
      <Header title="Geography" subtitle="Simple Geography Chart" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </div>
  );
};

export default Geography;