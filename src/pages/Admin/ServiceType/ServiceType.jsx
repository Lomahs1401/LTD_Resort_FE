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
import { mockDataServiceType } from "../../../data/mockData";
import Header from "../../../components/Header/Header";
import { useTheme } from "@mui/material";
import { Form, Input, Modal } from "antd";
import { GrAdd } from "react-icons/gr";
import Draggable from "react-draggable";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styles from "./ServiceType.module.scss";
import classNames from "classnames/bind";
import AuthUser from "../../../utils/AuthUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ServiceType = () => {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const navigate = useNavigate();
  const { http } = AuthUser();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const [listType, setListType] = useState([]);
  const [service, setService] = useState([]);
  const [base, setBase] = useState();
  const [id, setID] = useState();

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
      field: "service_type_name",
      headerName: "Type Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "number_services",
      headerName: "Number Services",
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
    setBase(false);
    setValues({});
  };
  const handleEdit = (params) => {
    setdisabledCreate(false);
    const { row } = params;
    setID(row.id);
    form.setFieldValue("typename", row.service_type_name);
    form.setFieldValue("size", row.number_services);
    setBase(true);
    setOpenModal(true);
  };

  const handleDelete = (params) => {
    setOpenModal(true);
  };

  const fetchService = async (id) => {
    await http
      .get(`/admin/list-service-by-type/${id}`)
      .then((resolve) => {
        console.log(resolve);
        setService();
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handleCellClick = (params) => {
    const { row } = params;
    const field = params.field;
    if (field !== "accessLevel" ) {
      console.log(row);
      fetchService(row.id);
      navigate("/admin/service" ,{ state: row.id });
    }
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

  // Successful case
  const onFinish = (values) => {
    const { typename, size } = values;
    const formData = new FormData();

    if (base) {
      console.log("Success: edit", values);
    } else {
      console.log("Success: add", values);

      formData.append("service_name", typename);

      http
        .post(`/admin/store-service-type`, formData)
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
          console.log("Error response:", reject.response);
          console.log("Error status code:", reject.response.status);
          console.log("Error message:", reject.message);
          console.log(reject);
        });
    }
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
        .get(`/admin/list-service-type`)
        .then((resolve) => {
          setListType(resolve.data.list_room_types);
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
      <Header title="SERVICE TYPE" subtitle="List of Service Type" />
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
          onCellClick={handleCellClick}
          onCellDoubleClick={handleDoubleClickCell}
          rows={listType}
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
            capacity: values?.capacity,
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
              ) : (
                <Button type="primary" htmlType="submit">
                  {base ? <>Edit</> : <>Add</>}
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceType;
