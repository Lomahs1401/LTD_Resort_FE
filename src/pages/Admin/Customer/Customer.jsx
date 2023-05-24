import React,  { useState }  from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Modal } from "antd";
import styles from "./Customer.module.scss";
import classNames from "classnames/bind";
import UserProfile from "../../../components/UserProfile/UserProfile";


const cx = classNames.bind(styles);

const Customer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleOk = () => {
    setOpenModal(false);
  }

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
  }

//data columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
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
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  const { accountId, avatar, comment, username, rating, fullName, email, gender, birthDate, ID_Card, address, phone, rankingPoint } = { accountId: 1, avatar: 1, comment: 1, username: 1, rating: 1, fullName: 1, email: 1, gender: 1, birthDate: 1, ID_Card: 1, address: 1, phone: 1, rankingPoint: 11 };


  const handleDoubleClickCell = (params) => {
    const { row } = params;
    const { id } = row;
    console.log(row);
    setOpenModal(true);
  };

    
  return (
    <div className={cx("contact-wrapper")}>
      <Header
        title="CUSTOMER"
        subtitle="List of Customer "
      />
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
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Modal
        title={
          <UserProfile
            accountId={accountId}
            avatar={avatarUrl}
            username={username}
            fullName={fullName}
            email={email}
            gender={gender}
            birthDate={birthDate}
            ID_Card={ID_Card}
            address={address}
            phone={phone}
            rankingPoint={rankingPoint}
          />
          
        }
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      
      />
    </div>
  );
};

export default Customer;
