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
import { mockDataRoomFloor } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal } from "antd";
import { GrAdd } from "react-icons/gr";
import Draggable from "react-draggable";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styles from "./News.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Facility = () => {
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
      field: "floor_name",
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
    form.setFieldValue("name", row.floor_name);

    setOpenModal(true);
  };

  const handleDelete = (params) => {
    setOpenModal(true);
  };

  const handleDoubleClickCell = (params) => {
    const { row } = params;
    setdisabledCreate(true);

    setValues(row);
    form.setFieldValue("name", row.floor_name);

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
      <Header title="NEWS" subtitle="List of News" />
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}F>
          <h1>Trang web đang trong quá trình phát triển</h1>
          <p>
            Xin lỗi vì sự bất tiện này! Chúng tôi đang làm việc chăm chỉ để hoàn
            thiện trang web.
          </p>
          <p>
            Xin hãy kiên nhẫn chờ đợi và quay lại sau để kiểm tra các cập nhật
            mới nhất.
          </p>
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/29ffb84b-d25c-4a6f-a34b-0b486d359941/d5ggmwh-4d170265-e369-409c-9354-4e92b07bc227.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI5ZmZiODRiLWQyNWMtNGE2Zi1hMzRiLTBiNDg2ZDM1OTk0MVwvZDVnZ213aC00ZDE3MDI2NS1lMzY5LTQwOWMtOTM1NC00ZTkyYjA3YmMyMjcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yp5encYqxHCRaP_PDNgz9Fhumajh7GhvY0Y4STf6suA"  />

        </div>
        {/* <DataGrid
          onCellDoubleClick={handleDoubleClickCell}
          rows={mockDataRoomFloor}
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
            Floor Room Info
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

export default Facility;
