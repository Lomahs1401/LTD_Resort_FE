import React, { useMemo, useState, useEffect, useRef } from "react";
import { Box, useTheme, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { tokens } from "../../../utils/theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { AiFillEdit, AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";

import styles from "./Staff.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Draggable from "react-draggable";

const cx = classNames.bind(styles);

const Staff = () => {
  const staffInfoLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const [openModalStaff, setOpenModalStaff] = useState(false);
  const [values, setValues] = useState({});

  const dateFormat = "DD/MM/YYYY";
  const navigate = useNavigate();
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
        <Button startIcon={<AiOutlineUserAdd />} onClick={handleCreate}>
          Create
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleSelectBirthDate = (date, dateString) => {
    form.setFieldValue("birthday", date);
  };

  const handleSelectdayStart = (date, dateString) => {
    form.setFieldValue("dayStart", date);
  };

  const handleSelectdayQuit = (date, dateString) => {
    form.setFieldValue("dayQuit", date);
  };

  const handleCreate = () => {
    console.log("create");
    setdisabledCreate(false);
    setOpenModalStaff(true);
    form.setFieldValue("fullName", "");
    form.setFieldValue("gender", "");
    // form.setFieldValue('birthDate', row.birthday);
    form.setFieldValue("phone", "");
    form.setFieldValue("ID_Card", "");
    form.setFieldValue("address", "");
    form.setFieldValue("accountbank", "");
    form.setFieldValue("namebank", "");
    // form.setFieldValue('dayStart', row.dayStart);
    // form.setFieldValue('dayQuit', row.dayQuit);
    form.setFieldValue("position", "");
    setValues();
  };

  const handleEdit = (params) => {
    console.log(params);
    setdisabledCreate(false);
    const { row } = params;
    form.setFieldValue("fullName", row.full_name);
    form.setFieldValue("gender", row.gender);
    // form.setFieldValue('birthDate', row.birthday);
    form.setFieldValue("phone", row.phone);
    form.setFieldValue("ID_Card", row.CMND);
    form.setFieldValue("address", row.address);
    form.setFieldValue("accountbank", row.account_bank);
    form.setFieldValue("namebank", row.name_bank);
    // form.setFieldValue('dayStart', row.dayStart);
    // form.setFieldValue('dayQuit', row.dayQuit);
    form.setFieldValue("position", row.position);
    setOpenModalStaff(true);
  };

  const handleDelete = (params) => {
    console.log(params);
    console.log("aaa");
    setOpenModalStaff(true);
  };

  const handleDoubleClickCell = (params) => {
    setdisabledCreate(true);
    const { row } = params;
    form.setFieldValue("fullName", row.full_name);
    form.setFieldValue("gender", row.gender);
    // form.setFieldValue('birthDate', row.birthday);
    form.setFieldValue("phone", row.phone);
    form.setFieldValue("ID_Card", row.CMND);
    form.setFieldValue("address", row.address);
    form.setFieldValue("accountbank", row.account_bank);
    form.setFieldValue("namebank", row.name_bank);
    // form.setFieldValue('dayStart', row.dayStart);
    // form.setFieldValue('dayQuit', row.dayQuit);
    form.setFieldValue("position", row.position);
    setOpenModalStaff(true);
    console.log(row);
  };

  const handleOk = () => {
    setOpenModalStaff(false);
    console.log("aa");
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalStaff(false);
  };

  const handleAdd = () => {
    console.log("Add");
  };

  const handleSumbit = () => {
    console.log("Sumbit");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Failed case
  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

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
      field: "accessLevel",
      headerName: "Access Level",
      width: 200,
      renderCell: (params) => {
        const handleEditClick = () => {
          handleEdit(params);
        };

        const handleDeleteClick = () => {
          handleDelete(params);
        };

        return (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillEdit />} onClick={handleEditClick}>
              {" "}
            </Button>
            <Button startIcon={<AiFillDelete />} onClick={handleDeleteClick}>
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
    // form.setFieldsValue(values);
  }, [values, form]);

  return (
    <div className={cx("team-wrapper")}>
      <Header title="Staff" subtitle="Managing the Staff Members" />
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
        {
          <DataGrid
            onCellDoubleClick={handleDoubleClickCell}
            checkboxSelection
            rows={mockDataTeam}
            columns={columns}
            components={{ Toolbar: CustomToolbar }}
            className={cx("table")}
          />
        }
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
            Staff Info
            <FaUser style={{ marginLeft: 16 }} />
          </div>
        }
        open={openModalStaff}
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
            fullName: values?.full_name,
            gender: values?.gender,
            birthDate: values?.birthday ? dayjs(values?.birthday) : dayjs(),
            ID_Card: values?.CMND,
            address: values?.address,
            phone: values?.phone,
            accountbank: values?.account_bank,
            namebank: values?.name_bank,
            dayStart: values?.dayStart ? dayjs(values?.dayStart) : dayjs(),
            dayQuit: values?.dayQuit ? dayjs(values?.dayQuit) : dayjs(),
            position: values?.position,
          }}
        >
          {console.log(values)}

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Full name is required!",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder={"Please fill full name"}
              disabled={disabledCreate}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Gender is required!",
              },
            ]}
          >
            <Select
              placeholder="Please select gender"
              disabled={disabledCreate}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[
              {
                required: true,
                message: "Birth date is required!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              placeholder="Select date"
              format={dateFormat}
              onChange={handleSelectBirthDate}
              disabled={disabledCreate}
            />
          </Form.Item>
          <Form.Item
            name="ID_Card"
            label="ID Card"
            rules={[
              {
                required: true,
                message: "ID Card is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="201801234" disabled={disabledCreate} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Address is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Đà Nẵng" disabled={disabledCreate} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Phone is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="0905000001" disabled={disabledCreate} />
          </Form.Item>
          <Form.Item
            name="accountbank"
            label="Account Bank"
            rules={[
              {
                required: true,
                message: "Account bank is required!",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder={values?.account_bank}
              disabled={disabledCreate}
            />
          </Form.Item>
          <Form.Item
            name="namebank"
            label="Name Bank"
            rules={[
              {
                required: true,
                message: "Bank name is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={values?.name_bank} disabled={disabledCreate} />
          </Form.Item>
          <Form.Item
            label="Day Start"
            name="dayStart"
            rules={[
              {
                required: true,
                message: "Day Start is required!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              placeholder="Select date"
              format={dateFormat}
              onChange={handleSelectdayStart}
              disabled={disabledCreate}
            />
          </Form.Item>
          <Form.Item
            label="Day Quit"
            name="dayQuit"
            rules={[
              {
                required: true,
                message: "Day quit is required!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              placeholder="Select date"
              format={dateFormat}
              onChange={handleSelectdayQuit}
              disabled={disabledCreate}
            />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Position is required!",
              },
            ]}
          >
            <Select
              placeholder="Please select Position"
              disabled={disabledCreate}
            >
              <Select.Option value="Boss">Boss</Select.Option>
              <Select.Option value="Freshman">Freshman</Select.Option>
              <Select.Option value="Staff">Staff</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={24}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {disabledCreate ? (
                <Button type="primary" disabled></Button>
              ) : form.getFieldValue("gender") == "" ? (
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
    </div>
  );
};

export default Staff;
