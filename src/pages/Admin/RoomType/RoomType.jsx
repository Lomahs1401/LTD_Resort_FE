import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { tokens } from "../../../utils/theme";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal, Select } from "antd";
import { GrAdd } from "react-icons/gr";
import Draggable from "react-draggable";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ImageGallery from "../ImageGallery/ImageGallery";
import styles from "./RoomType.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../../utils/AuthUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const RoomType = () => {
  const layout = {
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
  const { http } = AuthUser();
  const [id, setId] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [listRoom, setListRoom] = useState([]);
  const [listRoomType, setListRoomType] = useState([]);
  const [listRoomArea, setListRoomArea] = useState([]);
  const [listRoomFloor, setListRoomFloor] = useState([]);
  const [base, setBase] = useState(true);
  const [editAdd, setEditAdd] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalRoom, setOpenModalRoom] = useState(false);
  const [openModalArea, setOpenModalArea] = useState(false);
  const [openModalFloor, setOpenModalFloor] = useState(false);
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const [images, setImages] = useState([]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <Button startIcon={<GrAdd />} onClick={handleCreate}>
          Create
        </Button>
        <Button startIcon={<GrAdd />} onClick={handleCreateArea}>
          Create Area
        </Button>
        <Button startIcon={<GrAdd />} onClick={handleCreateFloor}>
          Create Floor
        </Button>
      </GridToolbarContainer>
    );
  }
  function CustomToolbarRoom() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <Button startIcon={<GrAdd />} onClick={handleCreateRoom}>
          Create
        </Button>
      </GridToolbarContainer>
    );
  }

  const getAreaName = (areaName) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const areaNameID = listRoomArea.find(
      (area) => area.area_name === areaName
    )?.id;
    return areaNameID || "";
  };

  const getFloorName = (floorName) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const floorNameID = listRoomFloor.find(
      (floor) => floor.floor_name === floorName
    )?.id;
    return floorNameID || "";
  };

  // data columns
  const columnsType = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "room_type_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "room_size",
      headerName: "Size(m2)",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "number_customers",
      headerName: "Capacity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "number_rooms",
      headerName: "Total Room",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "point_ranking",
      headerName: "Point Ranking",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 200,
      renderCell: (params) => {
        const handleEditClick = () => {
          handleEditType(params);
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

  const columnsRoom = [
    { field: "id_room", headerName: "ID", flex: 0.5 },

    {
      field: "room_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "area_name",
      headerName: "Area",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "floor_name",
      headerName: "Floor",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 200,
      renderCell: (params) => {
        const handleEditClick = () => {
          handleEditRoom(params);
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
    form.setFieldValue("typename", "");
    form.setFieldValue("size", "");
    form.setFieldValue("capacity", "");
    form.setFieldValue("price", "");
    form.setFieldValue("point", "");
    setdisabledCreate(false);
    setEditAdd(false);
    setValues({});
  };

  const handleCreateRoom = () => {
    console.log("create");
    setOpenModalRoom(true);

    form.setFieldValue("roomName", "");
    form.setFieldValue("floor", null);
    form.setFieldValue("area", null);
    form.setFieldValue("roomType", null);
    setdisabledCreate(false);
    setValues({});
    setEditAdd(false);
  };

  const handleCreateArea = () => {
    console.log("create");
    setOpenModalArea(true);
    form.setFieldValue("name", "");
    setdisabledCreate(false);
    setEditAdd(false);
    setValues({});
  };

  const handleCreateFloor = () => {
    console.log("create");
    setOpenModalFloor(true);
    form.setFieldValue("name", "");
    setdisabledCreate(false);
    setEditAdd(false);
    setValues({});
  };

  const handleEditType = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    setIdUpdate(row.id);
    form.setFieldValue("typename", row.room_type_name);
    form.setFieldValue("size", row.room_size);
    form.setFieldValue("capacity", row.number_customers);
    form.setFieldValue("price", row.price);
    form.setFieldValue("point", row.point_ranking);

    setEditAdd(true);

    setOpenModal(true);
  };

  const handleEditRoom = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    setIdUpdate(row.id_room);
    form.setFieldValue("roomName", row.room_name);
    form.setFieldValue("floor", getFloorName(row.floor_name));
    form.setFieldValue("area", getAreaName(row.area_name));
    form.setFieldValue("roomType", id);
    setEditAdd(true);

    setOpenModalRoom(true);
  };

  const handleDelete = (params) => {
    setOpenModal(true);
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    console.log(row);
    setValues(row);
    form.setFieldValue("roomName", row.room_name);
    form.setFieldValue("floor", row.floor_name);
    form.setFieldValue("area", row.area_name);
    form.setFieldValue("roomType", id);
    setOpenModalRoom(true);
    setdisabledCreate(true);
  };

  const handleClickCell = (params) => {
    const { row } = params;
    const ids = row.id;
    setId(ids);
    http
      .get(`/admin/room/room-type/${ids}`)
      .then((resolve) => {
        setListRoom(resolve.data.list_rooms);
        console.log("aaa", resolve);
        setBase(false);
      })
      .catch((reject) => {
        setListRoom([]);
        setBase(false);
        console.log(reject);
      });
  };

  const handleUpdateImage = (updatedImages) => {
    console.log(updatedImages); // Log mảng images đã được truyền lại từ ImageGallery
    setImages(updatedImages); // Cập nhật mảng images trong component cha
  };

  const handleOk = () => {
    setOpenModal(false);
    setOpenModalRoom(false);
    setOpenModalArea(false);
    setOpenModalFloor(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
    setOpenModalRoom(false);
    setOpenModalArea(false);
    setOpenModalFloor(false);
  };

  // Successful case
  const onFinishType = (values) => {
    const { name, size, capacity, describe, image, price, point } = values;
    const formData = new FormData();
    if (editAdd) {
      console.log("Success: Type edit", values);
    } else {
      console.log("Success: Type add", values);
      formData.append("room_type_name", name);
      formData.append("room_size", size);
      formData.append("number_customers", capacity);
      formData.append("description", describe);
      formData.append("image", images);
      formData.append("price", price);
      formData.append("point_ranking", point);
      http
        .post(`/admin/store-room-type`, formData)
        .then(() => {
          Swal.fire(
            "Update!",
            "You have successfully add your profile",
            "success"
          ).then(() => {
            navigate(0);
          });
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
  };
  const onFinishArea = (values) => {
    const { name } = values;
    const formData = new FormData();
    console.log("Success: Area", values);

    formData.append("area_name", name);

    http
      .post(`/admin/store-area`, formData)
      .then(() => {
        Swal.fire(
          "Update!",
          "You have successfully add your profile",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };
  const onFinishFloor = (values) => {
    const { name } = values;
    const formData = new FormData();
    console.log("Success: Floor", values);
    formData.append("floor_name", name);
    http
      .post(`/admin/store-floor`, formData)
      .then(() => {
        Swal.fire(
          "Update!",
          "You have successfully add your profile",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };
  const onFinishRoom = (values) => {
    const { roomName, area, floor, roomType } = values;
    const formData = new FormData();
    if (editAdd) {
      console.log("Success: Room edit", values, idUpdate);

      formData.append("room_name", roomName);
      formData.append("room_type_id", roomType);
      formData.append("area_id", area);
      formData.append("floor_id", floor);

      http
        .patch(`/admin/update-room/${idUpdate}`, formData)
        .then(() => {
          Swal.fire(
            "Update!",
            "You have successfully add your profile",
            "success"
          ).then(() => {
            navigate(0);
          });
        })
        .catch((reject) => {
          console.log(reject);
        });
    } else {
      console.log("Success: Room add", values);
      formData.append("room_name", roomName);
      formData.append("room_type_id", roomType);
      formData.append("area_id", area);
      formData.append("floor_id", floor);

      http
        .post(`/admin/store-room`, formData)
        .then(() => {
          Swal.fire(
            "Update!",
            "You have successfully add your profile",
            "success"
          ).then(() => {
            navigate(0);
          });
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
  };

  // Failed case
  const onFinishFailedType = (error) => {
    console.log("Failed:", error);
  };
  const onFinishFailedArea = (error) => {
    console.log("Failed:", error);
  };
  const onFinishFailedFloor = (error) => {
    console.log("Failed:", error);
  };
  const onFinishFailedRoom = (error) => {
    console.log("Failed: aaa", error);
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
    const fetchData = () => {
      http
        .get(`/auth/room-types`)
        .then((resolve) => {
          setListRoomType(resolve.data.list_room_types);
        })
        .catch((reject) => {
          console.log(reject);
        });
      http
        .get(`/auth/areas`)
        .then((resolve) => {
          setListRoomArea(resolve.data.list_areas);
        })
        .catch((reject) => {
          console.log(reject);
        });
      http
        .get(`/auth/floors`)
        .then((resolve) => {
          setListRoomFloor(resolve.data.list_floors);
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
      <Header title="ROOM TYPE" subtitle="List of Room Type" />
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
            onCellDoubleClick={handleClickCell}
            rows={listRoomType}
            columns={columnsType}
            components={{ Toolbar: CustomToolbar }}
            className={cx("table")}
          />
        ) : (
          <DataGrid
            getRowId={(row) => row.id_room}
            onCellDoubleClick={handleDoubleClickCell}
            rows={listRoom}
            columns={columnsRoom}
            components={{ Toolbar: CustomToolbarRoom }}
            className={cx("table")}
          />
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
            Room Type Info
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
          onFinish={onFinishType}
          onFinishFailed={onFinishFailedType}
          className={cx("modal-form")}
          initialValues={{
            typename: values?.type_name,
            size: values?.size,
            capacity: values?.capacity,
            describe: values?.describe,
            price: values?.price,
            point: values?.point_ranking,
          }}
        >
          <div className={cx("room-attributes")}>
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
          <div className={cx("room-attributes")}>
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
          <div className={cx("room-attributes")}>
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
          <div className={cx("room-attributes")}>
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
          <div className={cx("room-attributes")}>
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
          <div className={cx("room-attributes")}>
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
          <div className={cx("room-attributes")}>
            <Form.Item
              name="picture"
              label="picture"

              // hasFeedback
              // rules={[
              //   {
              //     required: true,
              //     message: "Room Type is required!",
              //   },
              // ]}
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
              ) : (
                <Button type="primary" htmlType="submit">
                  {editAdd ? <>Edit</> : <>Add</>}
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
            Area Room Info
          </div>
        }
        open={openModalArea}
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
          onFinish={onFinishArea}
          onFinishFailed={onFinishFailedArea}
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
              <Button type="primary" htmlType="submit">
                Add
              </Button>
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
            Floor Room Info
          </div>
        }
        open={openModalFloor}
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
          onFinish={onFinishFloor}
          onFinishFailed={onFinishFailedFloor}
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
                  message: "Name floor is required!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder={"Please fill floor name"}
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
                Add
              </Button>
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
          {...layout}
          form={form}
          layout="horizontal"
          name="profile_form"
          labelAlign="right"
          labelWrap="true"
          size="large"
          autoComplete="off"
          onFinish={onFinishRoom}
          onFinishFailed={onFinishFailedRoom}
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
                options={listRoomFloor.map((ele) => ({
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
                options={listRoomArea.map((ele) => ({
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
                options={listRoomType.map((ele) => ({
                  label: ele.room_type_name,
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
              ) : (
                <Button type="primary" htmlType="submit">
                  {editAdd ? <>Edit</> : <>Add</>}
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomType;
