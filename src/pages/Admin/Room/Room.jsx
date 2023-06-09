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
import {
  mockDataRoom,
  mockDataRoomArea,
  mockDataRoomFloor,
  mockDataRoomType,
} from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal, Select } from "antd";
import { GrAdd } from "react-icons/gr";
import Draggable from "react-draggable";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styles from "./Room.module.scss";
import classNames from "classnames/bind";
import ImageGallery from "../ImageGallery/ImageGallery";

const cx = classNames.bind(styles);

const Room = () => {
  const Layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const [images, setImages] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModalRoom, setOpenModalRoom] = useState(false);
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    room_name: "",
    floor: "",
    area: "",
    type: "",
  });

  // Hàm xử lý dữ liệu để tìm tên area từ id area
  const getAreaName = (areaId) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const areaName = mockDataRoomArea.find(
      (area) => area.id === areaId
    )?.area_name;
    return areaName || "";
  };

  // Hàm xử lý dữ liệu để tìm tên floor từ id floor
  const getFloorName = (floorId) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const floorName = mockDataRoomFloor.find(
      (floor) => floor.id === floorId
    )?.floor_name;
    return floorName || "";
  };

  // Hàm xử lý dữ liệu để tìm tên area từ id area
  const getTypeName = (typeId) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const typeName = mockDataRoomType.find(
      (type) => type.id === typeId
    )?.type_name;
    return typeName || "";
  };

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
      field: "room_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "id_area",
      headerName: "Area",
      flex: 1,
      valueFormatter: (params) => getAreaName(params.value),
    },
    {
      field: "id_floor",
      headerName: "Floor",
      flex: 1,
      valueFormatter: (params) => getFloorName(params.value),
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

  const handleCreate = () => {
    console.log("create");
    setOpenModalRoom(true);
    form.setFieldValue("roomName", "");
    form.setFieldValue("floor", null);
    form.setFieldValue("area", null);
    form.setFieldValue("roomType", null);
    setdisabledCreate(false);

    setValues({});
  };
  const handleEdit = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    console.log(row);
    setValues(row);
    form.setFieldValue("roomName", row.room_name);
    form.setFieldValue("floor", row.id_floor);
    form.setFieldValue("area", row.id_area);
    form.setFieldValue("roomType", row.id_type);
    setOpenModalRoom(true);
  };

  const handleDelete = (params) => {
    console.log(params);
    console.log("aaa");
    setOpenModalRoom(true);
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    console.log(row);
    setValues(row);
    form.setFieldValue("roomName", row.room_name);
    form.setFieldValue("floor", row.id_floor);
    form.setFieldValue("area", row.id_area);
    form.setFieldValue("roomType", row.id_type);
    setOpenModalRoom(true);
    setdisabledCreate(true);
  };
  const handleUpdateImage = (updatedImages) => {
    console.log(updatedImages); // Log mảng images đã được truyền lại từ ImageGallery
    setImages(updatedImages); // Cập nhật mảng images trong component cha
  };

  const handleOk = () => {
    setOpenModalRoom(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalRoom(false);
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
      <Header title="ROOM" subtitle="List of Room" />
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
          rows={mockDataRoom}
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
            roomName: values?.room_name,
            floor: values?.floor,
            area: values?.area,
            roomType: values?.type,
          }}
        >
          <div className={cx("room-attributes")}>
            <Form.Item
              name="roomName"
              label="Room Name"
              rules={[
                {
                  required: true,
                  message: "Room name is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill room name"}
                disabled={disabledCreate}
                className={cx("input")}
              />
            </Form.Item>
          </div>
          <div className={cx("room-attributes")}>
            <Form.Item
              name="floor"
              label="Floor"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Floor is required!",
                },
              ]}
            >
              <Select
                placeholder="Please select floor"
                options={mockDataRoomFloor.map((ele) => ({
                  label: ele.floor_name,
                  value: ele.id,
                }))}
                disabled={disabledCreate}
              ></Select>
            </Form.Item>
          </div>
          <div className={cx("room-attributes")}>
            <Form.Item
              name="area"
              label="Area"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Area is required!",
                },
              ]}
            >
              <Select
                placeholder="Please select area"
                options={mockDataRoomArea.map((ele) => ({
                  label: ele.area_name,
                  value: ele.id,
                }))}
                disabled={disabledCreate}
              ></Select>
            </Form.Item>
          </div>
          <div className={cx("room-attributes")}>
            <Form.Item
              name="roomType"
              label="Room Type"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Room Type is required!",
                },
              ]}
            >
              <Select
                placeholder="Please select Type room"
                options={mockDataRoomType.map((ele) => ({
                  label: ele.type_name,
                  value: ele.id,
                }))}
                disabled={disabledCreate}
              ></Select>
            </Form.Item>
          </div>
          <div className={cx("room-attributes")}>
            <Form.Item
              name="picture"
              label="picture"

            
            >
              
                <ImageGallery
                  images={images}
                  onChangeImages={handleUpdateImage}
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

export default Room;
