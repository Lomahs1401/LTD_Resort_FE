import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
import styles from "./BillRoom.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../../utils/AuthUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const BillRoom = () => {
  const Layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [current, setCurrent] = useState(0);
  const [bill, setBill] = useState([]);
  const [history, setHistory] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalChecking, setOpenModalChecking] = useState(false);
  const [id, setID] = useState();
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const { http } = AuthUser();

  const onChange = (value) => {
    setCurrent(value);
  };

  const handlGetCode = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    setID(row.id);
    setOpenModalChecking(true);
  };

  const handlGetCheckOut = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    setID(row.id);
    http
      .patch(`/employee/get-checkout-room/${row.id}`)
      .then((resolve) => {
        if (resolve.data.message === "bill checkout Successfully") {
          Swal.fire(
            "Update!",
            "You have successfully checkout your profile",
            "success"
          ).then(() => {
            navigate(0);
          });
        } else {
          Swal.fire("Fail");
        }
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handlAccept = (params) => {
    const { row } = params;
   
    http
      .delete(`/employee/delete-bill-room/${row.id}`)
      .then(() => {
        Swal.fire(
          "Update!",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handlReject = (params) => {
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    setdisabledCreate(true);

    setValues(row);
    form.setFieldValue("full_name", row.full_name);
    form.setFieldValue("birthday", row.birthday);
    form.setFieldValue("phone", row.phone);
    form.setFieldValue("total_people", row.total_people);
    form.setFieldValue("total_amount", row.total_amount);
    form.setFieldValue("book_time", row.book_time);
    form.setFieldValue("payment_method", row.payment_method);
    form.setFieldValue("pay_time", row.pay_time);
    form.setFieldValue("tax", row.tax);
    form.setFieldValue("checkin_time", row.checkin_time);
    form.setFieldValue("checkout_time", row.checkout_time);
    form.setFieldValue("cancel_time", row.cancel_time);
    form.setFieldValue("time_start", row.time_start);
    form.setFieldValue("time_end", row.time_end);

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

  //data columns
  const columnsBill = [
    { field: "id", headerName: "ID", flex: 0.5 },
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
      field: "time_start",
      headerName: "Time Start",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "time_end",
      headerName: "time_end",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 170,
      renderCell: (params) => {
        const handleCodeClick = () => {
          handlGetCode(params);
        };
        const handleCheckOutClick = () => {
          handlGetCheckOut(params);
        };

        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillEdit />} onClick={handleCodeClick}>
              {" "}
            </Button>
            <Button
              startIcon={<AiOutlineCheck />}
              onClick={handleCheckOutClick}
            >
              {" "}
            </Button>
          </Box>
        );
      },
    },
  ];
  const columnsHistory = [
    { field: "id", headerName: "ID", flex: 0.5 },
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
      field: "time_start",
      headerName: "Time Start",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "time_end",
      headerName: "time_end",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const columnsCancel = [
    { field: "id", headerName: "ID", flex: 0.5 },
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
      field: "time_start",
      headerName: "Time Start",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "time_end",
      headerName: "time_end",
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
    const { code } = values;
    const formData = new FormData();
    formData.append("bill_code", code);
    http
      .patch(`/employee/get-checkin-room/${id}`, formData)
      .then((resolve) => {
        console.log(resolve.data.message);
        if (resolve.data.message == "bill checkin Successfully") {
          Swal.fire(
            "Update!",
            "You have successfully update your profile",
            "success"
          ).then(() => {
            navigate(0);
          });
        } else {
          Swal.fire("Fail");
        }
      })
      .catch((reject) => {
        console.log(reject);
      });
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
        .get(`/employee/list-bill-room`)
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
        .get(`/employee/list-history-room`)
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
        .get(`/employee/list-cancel-room`)
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

  return (
    <div className={cx("contact-wrapper")}>
      <Header title="BILL" subtitle="List of Bill" />
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
            Room Info
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
          <div className={cx("form-attributes")}>
            <Form.Item
              name="full_name"
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
              name="birthday"
              label="Birthday"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="phone"
              label="Phone"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="total_people"
              label="Total People"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="total_amount"
              label="Total Amount"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>

            <div className={cx("form-attributes")}>
              <Form.Item
                name="payment_method"
                label="Payment"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
            <div className={cx("form-attributes")}>
              <Form.Item
                name="pay_time"
                label="Pay Time"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
            <div className={cx("form-attributes")}>
              <Form.Item
                name="tax"
                label="Tax"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
            <div className={cx("form-attributes")}>
              <Form.Item
                name="discount"
                label="Discount"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
                <div disabled={true} className={cx("input")} />
              </Form.Item>
            </div>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="checkin_time"
              label="Checkin Time"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="checkout_time"
              label="Checkout Time"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="cancel_time"
              label="Cancel Time"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="time_start"
              label="Time Start"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="time_end"
              label="Time End"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
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
              name="code"
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

export default BillRoom;
