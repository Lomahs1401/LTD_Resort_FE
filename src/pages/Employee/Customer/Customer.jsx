import { useState , useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDataCustomer } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import styles from "./Customer.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../../utils/AuthUser";

const cx = classNames.bind(styles);

const Customer = () => {
  const {http} = AuthUser();
  const [listCustomers, setListCustomers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "ranking_point",
      headerName: "Point",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.ranking_point}
        </Typography>
      ),
    },
  ];

  const handleDoubleClickCell = (params) => {
    const { row } = params;    
    // Chuyển hướng đến trang hóa đơn
    navigate("/employee/bill", { state: row });
  };

  //fetch api
  useEffect(() => {
    const fetchData = () =>{
      http.get('/employee/list-customer')
      .then((resolve) => {
        setListCustomers(resolve.data.list_customers);
      })
      .catch((reject) => {
        console.log(reject);
      })
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);


  return (
    <div className={cx("invoices-wrapper")}>
      <Header title="CUSTOMER" subtitle="List of Customer" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={listCustomers ? listCustomers : mockDataCustomer}
          columns={columns}
          className={cx("table")}
          onCellDoubleClick={handleDoubleClickCell}
        />
      </Box>
    </div>
  );
};

export default Customer;
