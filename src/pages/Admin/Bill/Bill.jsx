import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDatabillRoom, mockDatabillService } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal, Select, Steps } from "antd";
import { MdHotel, MdRoomService } from "react-icons/md";
import Draggable from "react-draggable";
import styles from "./Bill.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Bill = () => {
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
  const [openModalRoom, setOpenModalRoom] = useState(false);
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    room_name: "",
    floor: "",
    area: "",
    type: "",
  });

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  const onChange = (value) => {
    setCurrent(value);
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    console.log(row);
    setValues(row);
    form.setFieldValue("id", row.id);
    form.setFieldValue("total_amount", row.total_amount);
    form.setFieldValue("total_room", row.total_room);
    form.setFieldValue("total_people", row.total_people);
    form.setFieldValue("payment_method", row.payment_method);
    form.setFieldValue("name_bank", row.name_bank);
    form.setFieldValue("pay_time", row.pay_time);
    form.setFieldValue("checkin_time", row.checkin_time);
    form.setFieldValue("checkout_time", row.checkout_time);
    form.setFieldValue("cancel_time", row.cancel_time);
    form.setFieldValue("discount", row.discount);
    setOpenModalRoom(true);
  };

  const handleOk = () => {
    setOpenModalRoom(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalRoom(false);
  };

  // Successful case
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Failed case
  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  //data columns
  const columnsRoom = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_room",
      headerName: "Total Room",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_people",
      headerName: "Total People",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name_bank",
      headerName: "Name Bank",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "pay_time",
      headerName: "Pay time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const columnsService = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name_bank",
      headerName: "Name Bank",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "pay_time",
      headerName: "Pay time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  const items = [
    {
      title: "Room",
      content: (
        <DataGrid
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDatabillRoom.filter((item) => item.id_customer === 1)}
          columns={columnsRoom}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
        />
      ),
      icon: <MdHotel />,
    },
    {
      title: "Bill",
      content: (
        <DataGrid
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDatabillService.filter((item) => item.id_customer === 1)}
          columns={columnsService}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
        />
      ),
      icon: <MdRoomService />,
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

  return (
    <div className={cx("contact-wrapper")}>
      <Header title="INFO" subtitle="List of " />
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
        <div className={cx("content")}>{items[current].content}</div>

        {/* <DataGrid
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDatabill.filter((item) => item.id_customer === 2)}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
        /> */}
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
        open={openModalRoom}
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
            id: values?.id,
            total_amount: values?.total_amount,
            total_room: values?.total_room,
            total_people: values?.total_people,
            payment_method: values?.payment_method,
            tax: values?.tax,
            name_bank: values?.name_bank,
            pay_time: values?.pay_time,
            checkin_time: values?.checkin_time,
            checkout_time: values?.checkout_time,
            cancel_time: values?.cancel_time,
            discount: values?.discount,
          }}
        >
          <div className={cx("form-attributes")}>
            <Form.Item
              name="id"
              label="ID Bill"
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
          </div>
          <div className={cx("form-attributes")}>
            {values.total_room && (
              <Form.Item
                name="total_room"
                label="Total Room"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
              <div disabled={true} className={cx("input")} />
              </Form.Item>
            )}
          </div>
          <div className={cx("form-attributes")}>
            {values.total_people && (
              <Form.Item
                name="total_people"
                label="Total People"
                hasFeedback
                valuePropName="children"
                className={cx("form-attributes__item")}
              >
              <div disabled={true} className={cx("input")} />
              </Form.Item>
            )}
          </div>
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
              name="tax"
              label="Tax(%)"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="name_bank"
              label="Bank"
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
              label="Pay time"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <div className={cx("form-attributes")}>
            <Form.Item
              name="checkin_time"
              label="Checking time"
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
              label="Checkout time"
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
              name="discount"
              label="Discount"
              hasFeedback
              valuePropName="children"
              className={cx("form-attributes__item")}
            >
              <div disabled={true} className={cx("input")} />
            </Form.Item>
          </div>
          <DataGrid
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDatabillRoom.filter((item) => item.id_customer === 1)}
          columns={columnsRoom}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
        />
          {/* 
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
              ) : form.getFieldValue("name") == "" ? (
                <Button type="primary" onClick={handleAdd}>
                  Add
                </Button>
              ) : (
                <Button type="primary" onClick={handleSumbit}>
                  Edit
                </Button>
              )}
            </div>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default Bill;
