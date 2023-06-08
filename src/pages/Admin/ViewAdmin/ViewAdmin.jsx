import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Modal } from "antd";
import Draggable from "react-draggable";
import styles from "./ViewAdmin.module.scss";
import classNames from "classnames/bind";
import UserProfile from "../../../components/UserProfile/UserProfile";
import AuthUser from "../../../utils/AuthUser";

const cx = classNames.bind(styles);

const ViewAdmin = () => {
  const location = useLocation();
  const { state } = location;
  const field = state.field;
  const { row } = state;
  console.log("row  ", row);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { http } = AuthUser();
  const [openModal, setOpenModal] = useState(false);
  const [admin, setAdmin] = useState();
  const [admins, setAdminS] = useState();
  const [base, setBase] = useState();
  const [listPosition, setlistPosition] = useState([]);
  const [listPeople, setListPeople] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleOk = () => {
    setOpenModal(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
  };

  //data columns

  const columnsPeople = [
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
  ];
  const columnsPosition = [
    { field: "id", headerName: "ID" },
    { field: "position_name", headerName: "Position Name", flex: 0.5 },
    { field: "total", headerName: "Total Work", flex: 0.5 },
  ];

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    const ids = row.id;
    console.log(row);
    setAdmin();
    if (field === "position_admin" || field === "total_admin") {
      http
        .get(`/admin/find-admin/${ids}`)
        .then((resolve) => {
          setAdmin(resolve.data.data);
        })
        .catch((reject) => {
          console.log(reject);
        });
    } else if (field === "position_employee" || field === "total_employee") {
      http
        .get(`/admin/find-employee/${ids}`)
        .then((resolve) => {
          setAdmin(resolve.data.data);
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
    setOpenModal(true);
  };

  const handleClickCell = (params) => {
    const { row } = params;
    const ids = row.id;
    if (field === "position_admin") {
      http
        .get(`/admin/list-admin-by-position/${ids}`)
        .then((resolve) => {
          setListPeople(resolve.data.listAdmin);
          setBase(true);
        })
        .catch((reject) => {
          setListPeople([]);
          setBase(true);
          console.log(reject);
        });
    } else if (field === "position_employee") {
      http
        .get(`/admin/list-employee-by-position/${ids}`)
        .then((resolve) => {
          setListPeople(resolve.data.listAdmin);
          setBase(true);
        })
        .catch((reject) => {
          setListPeople([]);
          setBase(true);
          console.log(reject);
        });
    }
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
    const id = row?.id;

    const fetchData = () => {
      if (field === "position_admin") {
        http
          .get(`/admin/list-position/${id}/${0}`)
          .then((resolve) => {
            setlistPosition(resolve.data.list_position);
            setBase(false);
          })
          .catch((reject) => {
            console.log(reject);
          });
      } else if (field === "total_admin") {
        http
          .get(`/admin/list-by-department/${id}/${0}`)
          .then((resolve) => {
            setListPeople(resolve.data.list_position);

            setBase(true);
          })
          .catch((reject) => {
            console.log(reject);
          });
      } else if (field === "position_employee") {
        http
          .get(`/admin/list-position/${id}/${1}`)
          .then((resolve) => {
            console.log("3");
            setlistPosition(resolve.data.list_position);
            setBase(false);
          })
          .catch((reject) => {
            console.log(reject);
          });
      } else if (field === "total_employee") {
        http
          .get(`/admin/list-by-department/${id}/${1}`)
          .then((resolve) => {
            console.log("4");
            setListPeople(resolve.data.list_position);

            setBase(true);
          })
          .catch((reject) => {
            console.log(reject);
          });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("contact-wrapper")}>
      {base ? (
        <Header title="ADMIN" subtitle="List of Admin " />
      ) : (
        <Header title="POSITION" subtitle="List of Position " />
      )}
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
        {base ? (
          <DataGrid
            onCellDoubleClick={handleDoubleClickCell}
            rows={listPeople}
            columns={columnsPeople}
            className={cx("table")}
          />
        ) : (
          <DataGrid
            onCellClick={handleClickCell}
            rows={listPosition}
            columns={columnsPosition}
            className={cx("table")}
          />
        )}
      </Box>
      <Modal
        title={
          <div className={cx("modal__title")}>
            <img src={admin?.image} alt="Avatar" />
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

export default ViewAdmin;
