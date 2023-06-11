import React, { useState, useEffect, useRef } from "react";
import { Box, useTheme, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbar,
} from "@mui/x-data-grid";
import { Form, Modal, Divider } from "antd";
import dayjs from "dayjs";
import { tokens } from "../../../utils/theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import Swal from "sweetalert2";
import { AiFillEdit, AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";
import styles from "./FeedBack1.module.scss";
import classNames from "classnames/bind";
import { FaUser } from "react-icons/fa";
import Draggable from "react-draggable";
import AuthUser from "../../../utils/AuthUser";
import { toast } from "react-toastify";
import FormattedDate from "../../../utils/FormattedDate";
import { useNavigate } from "react-router-dom";
import { Details } from "@mui/icons-material";

const cx = classNames.bind(styles);

const FeedBack1 = () => {
  const { http } = AuthUser();
  const staffInfoLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const navigate = useNavigate();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [base, setBase] = useState();
  const [listFeedBackOnRoom, setListFeedBackOnRoom] = useState([]);
  const [ListFeedBackOnService, setListFeedBackOnService] = useState([]);
  const [listFeedBackOffRoom, setListFeedBackOffRoom] = useState([]);
  const [listFeedBackOffService, setListFeedBackOffService] = useState([]);
  const [listFeedBackRoom, setListFeedBackRoom] = useState();
  const [listFeedBackService, setListFeedBackService] = useState();

  const [details, setDetails] = useState();
  const [status, setStatus] = useState(true);
  const [id, setID] = useState();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const handleON = () => {
    setListFeedBackRoom(listFeedBackOnRoom);
    setListFeedBackService(ListFeedBackOnService);
    setStatus(true);
  };
  const handleOff = () => {
    setListFeedBackRoom(listFeedBackOffRoom);
    setListFeedBackService(listFeedBackOffService);
    setStatus(false);
  };

  const fetchDetail = async (id) => {
    await http
      .get(`/auth/feedback/${id}`)
      .then((response) => {
        setDetails(response.data.feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    form.setFieldValue("customer_name", details?.customer_name);
    form.setFieldValue("title", details?.title);
    form.setFieldValue("rating", details?.rating);
    form.setFieldValue("employee_name", details?.employee_name);
    form.setFieldValue("room_type_name", details?.room_type_name);
    form.setFieldValue("service_name", details?.service_name);
    form.setFieldValue("department_name", details?.department);
    form.setFieldValue("position_name", details?.position);
    form.setFieldValue("comment", details?.comment);
  }, [details]);

  const handleEdit = (params) => {
    console.log(params);
    const { row } = params;

    http
      .patch(`/employee/feedbacks-employee/${row.id}`)
      .then(() => {
        Swal.fire(
          "Update!",
          "You have successfully Delete your profile",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };


  const handleDelete = (params) => {
    const { row } = params;
    http
      .delete(`/auth/detele-feedback/${row.id}`)
      .then(() => {
        Swal.fire(
          "Update!",
          "You have successfully Delete your profile",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handleDoubleClickCell = async (params) => {
    const { row } = params;
    await fetchDetail(row.id);
    setOpenModalDetail(true);
  };

  const handleOk = () => {
    setOpenModalDetail(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalDetail(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Failed case
  const onFinishFailed = (error) => {
    console.log("Failed:", error);
    toast.error("Update failed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const columnsRoomOn = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "title",
      flex: 1.7,
      cellClassName: "name-column--cell",
    },

    {
      field: "rating",
      headerName: "Rating",

      cellClassName: "name-column--cell",
    },
    {
      field: "room_type_name",
      headerName: "Room Type Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date_request",
      headerName: "Date Request",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "date_response",
      headerName: "Date Response",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },

    {
      field: "Access",
      headerName: "Access Level",
      width: 120,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          handleDelete(params);
        };
        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillDelete />} onClick={handleDeleteClick}>
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];
  const columnsRoomOff = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "title",
      flex: 1.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "rating",
      headerName: "Rating",

      cellClassName: "name-column--cell",
    },
    {
      field: "room_type_name",
      headerName: "Room Type Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date_request",
      headerName: "Date Request",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "Access",
      headerName: "Access Level",
      width: 170,
      renderCell: (params) => {
        const handleEditClick = () => {
          handleEdit(params);
        };
        const handleDeleteClick = () => {
          handleDelete(params);
        };
        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillDelete />} onClick={handleDeleteClick}>
              {" "}
            </Button>
            <Button startIcon={<AiFillEdit />} onClick={handleEditClick}>
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];
  const columnsServiceOn = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "title",
      flex: 1.7,
      cellClassName: "name-column--cell",
    },

    {
      field: "rating",
      headerName: "Rating",

      cellClassName: "name-column--cell",
    },
    {
      field: "service_name",
      headerName: "Service Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date_request",
      headerName: "Date Request",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "date_response",
      headerName: "Date Response",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },

    {
      field: "Access",
      headerName: "Access Level",
      width: 120,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          handleDelete(params);
        };
        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillDelete />} onClick={handleDeleteClick}>
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];
  const columnsServiceOff = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "title",
      flex: 1.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "rating",
      headerName: "Rating",

      cellClassName: "name-column--cell",
    },
    {
      field: "service_name",
      headerName: "Service Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date_request",
      headerName: "Date Request",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "Access",
      headerName: "Access Level",
      width: 170,
      renderCell: (params) => {
        const handleEditClick = () => {
          handleEdit(params);
        };
        const handleDeleteClick = () => {
          handleDelete(params);
        };
        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillDelete />} onClick={handleDeleteClick}>
              {" "}
            </Button>
            <Button startIcon={<AiFillEdit />} onClick={handleEditClick}>
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];

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
  //fetch api
  useEffect(() => {
    const fetchData = () => {
      http
        .get(`/employee/list-feedbacks-employee`)
        .then((resolve) => {
          setListFeedBackOnRoom(resolve.data.list_feedback_room);
          setListFeedBackOnService(resolve.data.list_feedback_service);
          setListFeedBackRoom(resolve.data.list_feedback_room);
          setListFeedBackService(resolve.data.list_feedback_service);
        })
        .catch((reject) => {
          console.log(reject);
        });
      http
        .get(`/auth/list-not-feedbacks`)
        .then((resolve) => {
          setListFeedBackOffRoom(resolve.data.list_feedback_room);
          setListFeedBackOffService(resolve.data.list_feedback_service);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("team-wrapper")}>
      <Header title="Staff" subtitle="Managing the Staff Members" />
      <Box>
        <Button onClick={handleON}>CHECKED</Button>
        <Button onClick={handleOff}>UNCHECK</Button>
      </Box>

      <Box
        className={cx("team-wrapper__content")}
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
          "& .MuiDataGrid-columnHeader": {
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
        {status ? (
          <>
            <h2>Room</h2>
            <DataGrid
              onCellDoubleClick={handleDoubleClickCell}
              rows={listFeedBackRoom ? listFeedBackRoom : mockDataTeam}
              columns={columnsRoomOn}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              components={{ Toolbar: CustomToolbar }}
              className={cx("table")}
            />
            <Divider />
            <h2>Service</h2>
            <DataGrid
              onCellDoubleClick={handleDoubleClickCell}
              rows={listFeedBackService ? listFeedBackService : mockDataTeam}
              columns={columnsServiceOn}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              components={{ Toolbar: CustomToolbar }}
              className={cx("table")}
            />
          </>
        ) : (
          <>
            <h2>Room</h2>
            <DataGrid
              onCellDoubleClick={handleDoubleClickCell}
              rows={listFeedBackRoom ? listFeedBackRoom : mockDataTeam}
              columns={columnsRoomOff}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              components={{ Toolbar: CustomToolbar }}
              className={cx("table")}
            />
            <Divider />
            <h2>Service</h2>
            <DataGrid
              onCellDoubleClick={handleDoubleClickCell}
              rows={listFeedBackService ? listFeedBackService : mockDataTeam}
              columns={columnsServiceOff}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              components={{ Toolbar: CustomToolbar }}
              className={cx("table")}
            />
          </>
        )}
      </Box>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
              textAlign: "center",
              marginBottom: 24,
            }}
            onMouseOver={() => {
              setDisabled(false);
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            Feed Back Detail
            <FaUser style={{ marginLeft: 16 }} />
          </div>
        }
        className={cx("modal")}
        open={openModalDetail}
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
        <Form
          {...staffInfoLayout}
          form={form}
          layout="horizontal"
          name="staff_form"
          labelAlign="right"
          labelWrap="true"
          size="middle"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={cx("modal-form")}
          initialValues={{
            customer_name: details?.customer_name,
          }}
        >
          <div className={cx("form-attributes")}>
            <Form.Item
              name="customer_name"
              label="Customer Name"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="title"
              label="Title"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="rating"
              label="Rating"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          {details?.employee_name ? (
            <div className={cx("form-attributes")}>
              <Form.Item
                name="employee_name"
                label="Employee Name"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
          ) : (
            <div></div>
          )}
          {details?.room_type_name ? (
            <div className={cx("form-attributes")}>
              <Form.Item
                name="room_type_name"
                label="Type Name"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
          ) : (
            <div className={cx("form-attributes")}>
              <Form.Item
                name="service_name"
                label="Service Name"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
          )}
          {details?.employee_name ? (
            <div className={cx("form-attributes")}>
              <Form.Item
                name="department_name"
                label="Department Name"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
          ) : (
            <div></div>
          )}
          {details?.employee_name ? (
            <div className={cx("form-attributes")}>
              <Form.Item
                name="position_name"
                label="Position Name"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
          ) : (
            <div></div>
          )}

          <div className={cx("form-attributes")}>
            <Form.Item
              name="comment"
              label="Comment"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedBack1;
