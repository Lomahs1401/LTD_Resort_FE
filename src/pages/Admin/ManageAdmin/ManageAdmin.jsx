import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDataCustomer } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import styles from "./ManageAdmin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ManageAdmin = () => {
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
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  const handleDoubleClickCell = (params, ev) => {
    const { row } = params;
    console.log(row);

    // Chuyển hướng đến trang hóa đơn
    navigate("/admin/bill", { state: row });
  };
  return (
    <div className={cx("invoices-wrapper")}>
      <Header title="Admin" subtitle="List of Admin" />
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
          rows={mockDataCustomer}
          columns={columns}
          className={cx("table")}
          onCellDoubleClick={handleDoubleClickCell}
        />
      </Box>
    </div>
  );
};

export default ManageAdmin;
