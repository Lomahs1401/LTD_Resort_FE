import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Modal } from "antd";
import Draggable from "react-draggable";
import styles from "./ManageAdmin.module.scss";
import classNames from "classnames/bind";
import UserProfile from "../../../components/UserProfile/UserProfile";
import AuthUser from "../../../utils/AuthUser";

const cx = classNames.bind(styles);

const ManageAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { http } = AuthUser();
  const [openModal, setOpenModal] = useState(false);
  const [admin, setAdmin] = useState();
  const [admins, setAdminS] = useState();
  const [listAdmin, setListAdmin] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleOk = () => {
    setOpenModal(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
  };

  //data columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "CMND", headerName: "Registrar ID" },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
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
      field: "address",
      headerName: "Address",
      flex: 1,
    },

    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  const {
    accountId,
    avatar,
    comment,
    username,
    rating,
    fullName,
    email,
    gender,
    birthDate,
    ID_Card,
    address,
    phone,
    rankingPoint,
  } = {
    accountId: 1,
    avatar: 1,
    comment: 1,
    username: 1,
    rating: 1,
    fullName: 1,
    email: 1,
    gender: 1,
    birthDate: 1,
    ID_Card: 1,
    address: 1,
    phone: 1,
    rankingPoint: 11,
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    const { id } = row;
    setAdminS(row);
    console.log("da  ", row);
    fetchAdmin(row.id);
    setOpenModal(true);
  };
  // ---------------------------      Modal Draggable      ---------------------------
  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  // fetch api
  useEffect(() => {
    const fetchData = () => {
      http
        .get("/admin/list")
        .then((resolve) => {
          setListAdmin(resolve.data.list_accounts);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAdmin = (id) => {
    http
      .get(`/admin/find/${id}`)
      .then((resolve) => {
        setAdmin(resolve.data.data);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };
  console.log("admin: ", admin);

  return (
    <div className={cx("contact-wrapper")}>
      <Header title="ADMIN" subtitle="List of Admin " />
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
          rows={listAdmin}
          columns={columns}
          className={cx("table")}
        />
      </Box>
      <Modal
        title={
          <div className={cx("modal__title")}>
            <img src={admins?.image} alt="Avatar" />
            <div>ID NHAN VIEN : {admin?.id}</div>
            <div>{admin?.name}</div>
          </div>
        }
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >

        
        <div className={cx("modal__form")}>
          <div
            style={{
              width: "50%",
            }}
          >
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Name</div>
                <div className={cx("content-text")}>{admin?.name}</div>
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Gender</div>
                <div className={cx("content-text")}>{admin?.gender}</div>
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Birthday</div>
                <div className={cx("content-text")}>{admin?.birthday}</div>
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Address</div>
                <div className={cx("content-text")}>{admin?.address}</div>
              </div>
            </div>
          </div>
          <div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>ID Card</div>
                <div className={cx("content-text")}>{admin?.CMND}</div>
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Phone</div>
                <div className={cx("content-text")}>{admin?.phone}</div>
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Position</div>
                <div className={cx("content-text")}>{admin?.position_name}</div>
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>Department</div>
                <div className={cx("content-text")}>
                  {admin?.department_name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAdmin;
