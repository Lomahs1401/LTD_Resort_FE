import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { tokens } from "../../../utils/theme";
import { mockDataServiceType } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal } from "antd";
import { GrAdd } from "react-icons/gr";
import Draggable from "react-draggable";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styles from "./ExtraService.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ExtraService = () => {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  }
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
        <Button startIcon={<GrAdd />} onClick={handleCreate}>
          Create
        </Button>
      </GridToolbarContainer>
    );
  }
  //data columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "type_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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

  const handleCreate = () => {
    console.log("create");
    setOpenModal(true);
    form.setFieldValue("name", "");
    setdisabledCreate(false);

    setValues({});
  };
  const handleEdit = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    form.setFieldValue("name", row.area_name);

    setOpenModal(true);
  };

  const handleDelete = (params) => {
    setOpenModal(true);
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    setdisabledCreate(true);
    console.log(row);
    setValues(row);
    form.setFieldValue("typename", row.type_name);
    form.setFieldValue("size", row.size);
    form.setFieldValue("capacity", row.capacity);
    form.setFieldValue("describe", row.describe);
    form.setFieldValue("price", row.price);
    form.setFieldValue("point", row.point_ranking);

    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
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
      <Header title="EXTRA SERVICE" subtitle="List of Extra Service" />
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
          rows={mockDataServiceType}
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
            Service type Info
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
          {...layout}
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
            typename: values?.type_name,
            size: values?.size,
            capacity : values?.capacity ,
            describe: values?.describe,
            price: values?.price,
            point: values?.point_ranking,
          }}
        >
          <div className={cx("service-attributes")}>
            <Form.Item
              name="typename"
              label="Type Name"
              rules={[
                {
                  required: true,
                  message: "Type name is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill type name"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="size"
              label="Size(m2)"
              rules={[
                {
                  required: true,
                  message: "Size is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill the size"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="capacity"
              label="Capacity"

              rules={[
                {
                  required: true,
                  message: "The capacity is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill the capacity"}
                disabled={disabledCreate}
              />
            </Form.Item>
          </div>
          <div className={cx("service-attributes")}>
            <Form.Item
              name="describe"
              label="Describe"

              rules={[
                {
                  required: true,
                  message: "Describe is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill describe"}
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
                  message: "The point is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill The point"}
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
    </div>
  );
};

export default ExtraService;
