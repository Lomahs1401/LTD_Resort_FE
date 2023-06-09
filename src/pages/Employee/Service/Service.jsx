import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../../utils/theme";
import { mockDataService, mockDataServiceType } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme, Button } from "@mui/material";
import { Form, Input, Modal, Select } from "antd";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Draggable from "react-draggable";
import styles from "./Service.module.scss";
import classNames from "classnames/bind";

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
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [values, setValues] = useState({});

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        {/* <GridToolbarDensitySelector />
        <GridToolbarExport /> */}
        <Button startIcon={<GrAdd />} onClick={handleCreate}>
          Create
        </Button>
      </GridToolbarContainer>
    );
  }

  const getTypeName = (typeId) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const typeName = mockDataServiceType.find(
      (type) => type.id === typeId
    )?.type_name;
    return typeName || "";
  };

  //data columns
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "service_name", headerName: "Service", flex: 0.5 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "point_ranking",
      headerName: "Point",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "id_type",
      headerName: "Type",
      flex: 1,
      valueFormatter: (params) => getTypeName(params.value),
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

  const handleOk = () => {
    setOpenModal(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleCreate = () => {
    console.log("create");
    setOpenModal(true);
    form.setFieldValue("name", "");
    form.setFieldValue("description", "");
    form.setFieldValue("price", "");
    form.setFieldValue("status", null);
    form.setFieldValue("point","");
    form.setFieldValue("type",null);
    setdisabledCreate(false);
    setValues({});
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    console.log(row);
    form.setFieldValue("name", row.service_name);
    form.setFieldValue("description", row.description);
    form.setFieldValue("price", row.price);
    form.setFieldValue("status", row.status);
    form.setFieldValue("point", row.point_ranking);
    form.setFieldValue("type", row.id_type);
    setdisabledCreate(true);

    setOpenModal(true);
  };

  const handleEdit = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    console.log(row);
    setValues(row);
    form.setFieldValue("name", row.service_name);
    form.setFieldValue("description", row.description);
    form.setFieldValue("price", row.price);
    form.setFieldValue("status", row.status);
    form.setFieldValue("point", row.point_ranking);
    form.setFieldValue("type", row.id_type);
    setdisabledCreate(false);
    setOpenModal(true);
  };

  const handleDelete = (params) => {
    console.log(params);
    console.log("aaa");
    setOpenModal(true);
  };
  // Handle add new info
  const handleAdd = () => {
    console.log("Add");
  };
  // Handle edit old info
  const handleSumbit = () => {
    console.log("Sumbit");
  };

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
        <DataGrid
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDataService}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}

        />
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
            Service Room Info
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
            name: values?.service_name,
            description: values?.description,
            price: values?.price,
            status: values?.status,
            point: values?.point_ranking,
            type: values?.id_type,
          }}
        >
          <div className={cx("service-attributes")}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name Service is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill floor service"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill the price"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="point"
              label="Point Ranking"
              rules={[
                {
                  required: true,
                  message: "Point Rankingis required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill the point"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Description is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please write the description"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="status"
              label="Status"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Status is required!",
                },
              ]}
            >
              <Select
                placeholder="Please select Status"
                disabled={disabledCreate}
              >
                <Select.Option value={true}> True</Select.Option>
                <Select.Option value={false}> False</Select.Option>

              </Select>
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="type"
              label="Type"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Service Type is required!",
                },
              ]}
            >
              <Select
                placeholder="Please select service type"
                options={mockDataServiceType.map((ele) => ({
                  label: ele.type_name,
                  value: ele.id,
                }))}
                disabled={disabledCreate}
              ></Select>
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
    </div>
  );
};

export default Service;
