import React, { useState, useEffect } from "react";
import styles from "./Statistical.module.scss";
import classNames from "classnames/bind";
import { Select } from "antd";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../utils/theme";
import { mockTransactions } from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CommentIcon from "@mui/icons-material/Comment";
import ConstructionIcon from "@mui/icons-material/Construction";
import Header from "../../../components/Header/Header";
import LineChart from "../../../components/LineChart/LineChart";
import PieChart from "../../../components/PieChart/PieChart";
import BarChart from "../../../components/BarChart/BarChart";
import StatBox from "../../../components/StatBox/StatBox";
import ProgressCircle from "../../../components/ProgressCircle/ProgressCircle";
import AuthUser from "../../../utils/AuthUser";

const Statistical = () => {
  const cx = classNames.bind(styles);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const years = [];
  const { http } = AuthUser();
  const [yearss, setYearss] = useState(currentYear);
  const [row1, setRow1] = useState({
    total_customer: 0,
    total_employee: 0,
    total_feedback: 0,
    total_money: 0,
  });
  const [row2, setRow2] = useState({
    total_money_bill_extra_service: [],
    total_money_bill_room: [],
    total_money_bill_service: [],
  });
  const [row2_2, setRow2_2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [row3_3, setRow3_3] = useState([]);

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  const fetchRow2 = async (year) => {
    await http
      .get(`/admin/totalBill-row2/${year}`)
      .then((resolve) => {
        setRow2({
          total_money_bill_extra_service:
            resolve.data.total_money_bill_extra_service,
          total_money_bill_room: resolve.data.total_money_bill_room,
          total_money_bill_service: resolve.data.total_money_bill_service,
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };
  const fetchRow3 = async (year) => {
    await http
      .get(`/admin/totalFeedback-row3/${year}`)
      .then((resolve) => {
        setRow3(resolve.data.Total_feedback);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const billSum = row2.total_money_bill_extra_service.reduce((sum, item) => {
    return sum + item.total;
  }, 0);
  const roomSum = row2.total_money_bill_room.reduce((sum, item) => {
    return sum + item.total;
  }, 0);
  const extaSum = row2.total_money_bill_room.reduce((sum, item) => {
    return sum + item.total;
  }, 0);
  const totalSum = billSum + roomSum + extaSum;

  const handleSelect = (selectedOption) => {
    // Xử lý sự kiện khi người dùng chọn option
    fetchRow2(selectedOption);
    setYearss(selectedOption);
  };
  const handleSelectYear = (selectedOption) => {
    // Xử lý sự kiện khi người dùng chọn option
    fetchRow3(selectedOption);
    setYearss(selectedOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      await http
        .get(`/admin/total-row1`)
        .then((resolve) => {
          setRow1({
            total_customer: resolve.data.total_customer,
            total_employee: resolve.data.total_employee,
            total_feedback: resolve.data.total_feedback,
            total_money: resolve.data.total_money,
          });
        })
        .catch((reject) => {
          console.log(reject);
        });
      await http
        .get(`/admin/totalBill-row2/${currentYear}`)
        .then((resolve) => {
          setRow2({
            total_money_bill_extra_service:
              resolve.data.total_money_bill_extra_service,
            total_money_bill_room: resolve.data.total_money_bill_room,
            total_money_bill_service: resolve.data.total_money_bill_service,
          });
        })
        .catch((reject) => {
          console.log(reject);
        });

      await http
        .get(`/admin/totalBillMonth-row2`)
        .then((resolve) => {
          setRow2_2(resolve.data.data);
        })
        .catch((reject) => {
          console.log(reject);
        });

      await http
        .get(`/admin/totalFeedback-row3/${currentYear}`)
        .then((resolve) => {
          setRow3(resolve.data.Total_feedback);
        })
        .catch((reject) => {
          console.log(reject);
        });

      await http
        .get(`/admin/totalEmployeeMonth-row3`)
        .then((resolve) => {
          setRow3_3(resolve.data.data);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log("aaa " , row3);


  return (
    <Box marginX="20px" height="80%">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="STATISCAL" subtitle="Welcome to your statistical" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={row1.total_customer}
            subtitle="Number Of Customer"
            progress="null"
            // increase="+14%"
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={row1.total_employee}
            subtitle="Number Of Employee"
            progress="null"
            // increase="+21%"
            icon={
              <HotelIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={row1.total_feedback}
            subtitle="Comment"
            progress="null"
            // increase="+5%"
            icon={
              <CommentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={row1.total_money}
            subtitle="Bank"
            progress="null"
            // increase="+43%"
            icon={
              <ConstructionIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total income
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $ {totalSum}
              </Typography>
            </Box>
            <Box>
              <Select
                placeholder="Please select Year"
                options={years.map((year) => ({
                  label: year.toString(),
                  value: year,
                }))}
                onChange={handleSelect}
              />
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} datas={row2} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Departmental Employee
          </Typography>
          <PieChart datas={row2_2}/>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600">
                Employee Status
              </Typography>
            </Box>
            <Box>
              <Select
                placeholder="Please select Year"
                options={years.map((year) => ({
                  label: year.toString(),
                  value: year,
                }))}
                onChange={handleSelectYear}
              />
            </Box>
          </Box>

          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} datas={row3} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Departmental Employee
          </Typography>
          <PieChart datas={row3_3}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistical;
