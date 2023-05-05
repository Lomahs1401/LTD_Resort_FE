import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import styles from "./StatBox.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className={cx("stat-box-wrapper")}>
      <div className={cx("stat-box-wrapper__top")}>
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </div>
      <div className={cx("stat-box-wrapper__bottom")}>
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </div>
    </div>
  );
};

export default StatBox;