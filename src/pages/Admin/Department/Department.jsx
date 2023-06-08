import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid  } from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import styles from "./Department.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../../utils/AuthUser";

const cx = classNames.bind(styles);

const Department = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { http } = AuthUser();
  const [listDepartment, setListDepartment] = useState([]);
  const navigate = useNavigate();

  //data columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "department_name", headerName: "Department Name", flex: 1.5 },
    {
      field: "position_admin",
      headerName: "Position Admin",
      cellClassName: "name-column--cell",
      flex: 0.5,
    },
    {
      field: "total_admin",
      headerName: "Total Admin",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "position_employee",
      headerName: "Position Employee",
      cellClassName: "name-column--cell",
      flex: 0.5,
    },
    {
      field: "total_employee",
      headerName: "Total Employee",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
  ];

  

  const handleCellClick = (params) => {
    const { row } = params;
    const field = params.field;
    if (field !== "department_name" && field !== "id") {
      console.log(row);
      const data = {
        field: field,
        row: row,
      };
      navigate("/admin/viewadmin", { state: data });
    }
  };

  // fetch api
  useEffect(() => {
    const fetchData = () => {
      http
        .get(`/admin/list-department`)
        .then((resolve) => {
          setListDepartment(resolve.data.list_department);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   http
  //     .get(`/admin/find/${id}`)
  //     .then((resolve) => {
  //       setAdmin(resolve.data.data);
  //     })
  //     .catch((reject) => {
  //       console.log(reject);
  //     });
  // };
  // console.log("admin: ", admin);

  return (
    <div className={cx("contact-wrapper")}>
      <Header title="DEPARTMENT" subtitle="List of Department " />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={listDepartment}
          columns={columns}
          className={cx("table")}
          onCellClick={handleCellClick}
        />
      </Box>
    </div>
  );
};

export default Department;
