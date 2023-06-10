import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { tokens } from "../../../utils/theme";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal, Steps } from "antd";
import { FaCheck, FaHistory, FaClipboardList } from "react-icons/fa";
import Draggable from "react-draggable";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import styles from "./Service.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../../utils/AuthUser";

const cx = classNames.bind(styles);

const Service = () => {
  const Layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [current, setCurrent] = useState(0);
  const [bill, setBill] = useState([]);
  const [history, setHistory] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalChecking, setOpenModalChecking] = useState(false);

  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const { http } = AuthUser();

  const onChange = (value) => {
    setCurrent(value);
  };

 

  const handlGetCode = (params) => {
    setdisabledCreate(false);

    setOpenModalChecking(true);
  };

  const handlAccept = (params) => {
    setdisabledCreate(false);

    setOpenModalChecking(true);
  };

  const handlReject = (params) => {
    setdisabledCreate(false);

    setOpenModalChecking(true);
  };


  const handleDoubleClickCell = (params) => {
    const { row } = params;
    setdisabledCreate(true);

    setValues(row);
    form.setFieldValue("name", row.area_name);

    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
    setOpenModalChecking(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
    setOpenModalChecking(false);
  };
  // Handle add new info
  const handleAdd = () => {
    console.log("Add");
  };
  // Handle edit old info
  const handleSumbit = () => {
    console.log("Sumbit");
  };

  //data columns
  const columnsBill = [
    { field: "code", headerName: "ID", flex: 0.5 },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_method",
      headerName: "Payment",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "book_time",
      headerName: "Book Time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 150,
      renderCell: (params) => {
        const handleCodeClick = () => {
          handlGetCode(params);
        };

        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillEdit />} onClick={handleCodeClick}>
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];
  const columnsHistory = [
    { field: "code", headerName: "ID", flex: 0.5 },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_method",
      headerName: "Payment",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "book_time",
      headerName: "Book Time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const columnsCancel = [
    { field: "code", headerName: "ID", flex: 0.5 },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_method",
      headerName: "Payment",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "book_time",
      headerName: "Book Time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 200,
      renderCell: (params) => {
        const handleAcceptClick = () => {
          handlAccept(params);
        };
        const handleRejectClick = () => {
          handlReject(params);
        };
        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiOutlineCheck />} onClick={handleAcceptClick}>
              {" "}
            </Button>
            <Button startIcon={<AiOutlineClose />} onClick={handleRejectClick}>
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];
  const items = [
    {
      title: "Bill",
      content: (
        <DataGrid
          getRowId={(row) => row.core}
          onCellDoubleClick={handleDoubleClickCell}
          rows={bill}
          columns={columnsBill}
          className={cx("table")}
        />
      ),
      icon: <FaCheck />,
    },
    {
      title: "History",
      content: (
        <DataGrid
          getRowId={(row) => row.core}
          onCellDoubleClick={handleDoubleClickCell}
          rows={history}
          columns={columnsHistory}
          className={cx("table")}
        />
      ),
      icon: <FaHistory />,
    },
    {
      title: "Cancel",
      content: (
        <DataGrid
          getRowId={(row) => row.core}
          onCellDoubleClick={handleDoubleClickCell}
          rows={cancel}
          columns={columnsCancel}
          className={cx("table")}
        />
      ),
      icon: <FaClipboardList />,
    },
  ];

  // Successful case
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Failed case
  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  // ---------------------------      Modal Draggable      ---------------------------
  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [disabledCreate, setdisabledCreate] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      await http
        .get(`/employee/list-bill-service`)
        .then((resolve) => {
          setBill(resolve.data.bill_room);
          if (resolve.data.status === 404) {
            setBill([]);
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
      await http
        .get(`/employee/list-history-service`)
        .then((resolve) => {
          setHistory(resolve.data.bill_room);
          if (resolve.data.status === 404) {
            setHistory([]);
          }
        })
        .catch((reject) => {
          console.log(reject);
          setHistory([]);
        });
      await http
        .get(`/employee/list-cancel-service`)
        .then((resolve) => {
          setCancel(resolve.data.bill_room);
          if (resolve.data.status === 404) {
            setCancel([]);
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("service 1", bill);
  console.log("2", history);
  console.log("3", cancel);

  return (
    <div className={cx("contact-wrapper")}>
      <Header title="SERVICE" subtitle="List of Service" />
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
        <Steps
          current={current}
          items={items}
          type="navigation"
          onChange={onChange}
        />
        {items[current].content}
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
            Area Room Info
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
        <Form
          {...Layout}
          form={form}
          layout="horizontal"
          name="profile_form"
          labelAlign="right"
          labelWrap="true"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={cx("modal-form")}
          initialValues={{
            name: values?.name,
          }}
        >
          <div className={cx("room-attributes")}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name area is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill area name"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>

          <Form.Item
            wrapperCol={24}
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {disabledCreate ? (
                <Button type="primary" disabled></Button>
              ) : form.getFieldValue("name") === "" ? (
                <Button type="primary" onClick={handleAdd}>
                  Add
                </Button>
              ) : (
                <Button type="primary" onClick={handleSumbit}>
                  Edit
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
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
            Checking
          </div>
        }
        open={openModalChecking}
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
          {...Layout}
          form={form}
          layout="horizontal"
          name="profile_form"
          labelAlign="right"
          labelWrap="true"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={cx("modal-form")}
          initialValues={{}}
        >
          <div className={cx("room-attributes")}>
            <Form.Item
              name="Code"
              label="Code"
              rules={[
                {
                  required: true,
                  message: "Code is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill code"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>

          <Form.Item
            wrapperCol={24}
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Service;
