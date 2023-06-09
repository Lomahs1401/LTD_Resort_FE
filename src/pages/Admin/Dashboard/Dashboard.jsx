import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../utils/theme";
import { mockTransactions } from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import PersonIcon from '@mui/icons-material/Person';
import HotelIcon from '@mui/icons-material/Hotel';
import CommentIcon from '@mui/icons-material/Comment';
import ConstructionIcon from '@mui/icons-material/Construction';
import Header from "../../../components/Header/Header";
import LineChart from "../../../components/LineChart/LineChart";
import GeographyChart from "../../../components/GeographyChart/GeographyChart";
import BarChart from "../../../components/BarChart/BarChart";
import StatBox from "../../../components/StatBox/StatBox";
import ProgressCircle from "../../../components/ProgressCircle/ProgressCircle";



const Dashboard = () => {
  const cx = classNames.bind(styles);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);





  return (
    <Box marginX="20px" height="80%">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

     
    </Box>
  );
};

export default Dashboard;