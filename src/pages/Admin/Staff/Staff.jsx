import React, { useState, useEffect, useRef } from "react";
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
import Swal from "sweetalert2";
import { AiFillEdit, AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";
import styles from "./Staff.module.scss";
import classNames from "classnames/bind";
import { FaUser } from "react-icons/fa";
import Draggable from "react-draggable";
import AuthUser from "../../../utils/AuthUser";
import { toast } from "react-toastify";
import FormattedDate from "../../../utils/FormattedDate";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);

const Staff = () => {
  const { http } = AuthUser();
  const staffInfoLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const initialFormValues = {
    fullName: "",
    gender: "",
    birthDate: "",
    ID_Card: "",
    address: "",
    phone: "",
    accountbank: "",
    namebank: "",
    department: "",
    position: "",
    username: "",
    password: "",
    email: "",
  };
  const navigate = useNavigate();
  const [openModalStaff, setOpenModalStaff] = useState(false);
  const [openModalAccount, setOpenModalAccount] = useState(false);
  const [values, setValues] = useState({});
  const [account, setAccount] = useState({});
  const [base, setBase] = useState();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formAccount, setFormAccount] = useState(initialFormValues);
  const [staffAccount, setStaffAccount] = useState([]);
  const [listStaffWork, setListStaffWork] = useState([]);
  const [listStaffQuit, setListStaffQuit] = useState([]);
  const [listStaff, setListStaff] = useState();
  const [listDepartment, setListDepartment] = useState([]);
  const [listPosition, setListPosition] = useState([]);
  const [Staff, setStaff] = useState();
  const [status, setStatus] = useState(true);
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [id, setID] = useState();
  const dateFormat = "YYYY-MM-DD";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

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
        <Button onClick={handleWork}>Work</Button>
        <Button onClick={handleQuit}>Quit</Button>
      </GridToolbarContainer>
    );
  }
  const getDepartmentName = (Departmentid) => {
    // Gọi hàm hoặc thực hiện các xử lý tìm tên area từ id area
    // Ví dụ:
    const DepartmentName = listDepartment.find(
      (department) => department.id === Departmentid
    )?.department_name;
    return DepartmentName || "";
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;

    // Kiểm tra điều kiện hợp lệ cho email
    if (!email.includes("@")) {
      setEmailError("Email is invalid!");
    } else {
      setEmailError("");
    }
  };

  const handleWork = () => {
    setListStaff(listStaffWork);
    setStatus(true);
  };
  const handleQuit = () => {
    setListStaff(listStaffQuit);
    setStatus(false);
  };

  const handleSelect = (value) => {
    http
      .get(`admin/list-position/${value}/${1}`)
      .then((resolve) => {
        setListPosition(resolve.data.list_position);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handleSelectBirthDate = (date, dateString) => {
    form.setFieldValue("birthday", date);
  };

  const handleCreate = () => {
    setdisabledCreate(false);
    setOpenModalStaff(true);
    form.setFieldValue("fullName", "");
    form.setFieldValue("gender", null);
    form.setFieldValue("birthDate", null);
    form.setFieldValue("phone", "");
    form.setFieldValue("ID_Card", "");
    form.setFieldValue("address", "");
    form.setFieldValue("accountbank", "");
    form.setFieldValue("namebank", "");
    form.setFieldValue("position", null);
    form.setFieldValue("department", null);
    setValues();
    setBase(false);
  };

  const fetchStaff = (id) => {
    http
      .get(`/admin/find-employee/${id}`)
      .then((resolve) => {
        setStaff(resolve.data.data);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handleEdit =  async (params) => {
    setdisabledCreate(false);
    const { row } = params;

    setID(row.id);

    await http
      .get(`/admin/find-employee/${row.id}`)
      .then((resolve) => {
        setStaff(resolve.data.data);
        form.setFieldValue("fullName", resolve.data.data?.name);
        form.setFieldValue("gender", resolve.data.data?.gender);
        form.setFieldValue("birthDate", null);
        form.setFieldValue("phone", resolve.data.data?.phone);
        form.setFieldValue("ID_Card", resolve.data.data?.CMND);
        form.setFieldValue("address", resolve.data.data?.address);
        form.setFieldValue("accountbank", resolve.data.data?.account_bank);
        form.setFieldValue("namebank", resolve.data.data?.name_bank);
        form.setFieldValue("position", resolve.data.data?.position_name);
        form.setFieldValue("department", resolve.data.data?.department_name);
      })
      .catch((reject) => {
        console.log(reject);
      });
    setOpenModalStaff(true);
    setBase(true);
  };

  const handleDelete = (params) => {
    const { row } = params;

    http
      .patch(`/admin/quit-employee/${row.id}`)
      .then(() => {
        Swal.fire(
          "Update!",
          "You have successfully Delete your profile",
          "success"
        ).then(() => {
          navigate(0);
        });
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handleDoubleClickCell = async (params) => {
    setdisabledCreate(true);
    const { row } = params;
    await http
      .get(`/admin/find-employee/${row.id}`)
      .then((resolve) => {
        setStaff(resolve.data.data);
        form.setFieldValue("fullName", resolve.data.data?.name);
        form.setFieldValue("gender", resolve.data.data?.gender);
        form.setFieldValue("birthDate", null);
        form.setFieldValue("phone", resolve.data.data?.phone);
        form.setFieldValue("ID_Card", resolve.data.data?.CMND);
        form.setFieldValue("address", resolve.data.data?.address);
        form.setFieldValue("accountbank", resolve.data.data?.account_bank);
        form.setFieldValue("namebank", resolve.data.data?.name_bank);
        form.setFieldValue("position", resolve.data.data?.position_name);
        form.setFieldValue("department", resolve.data.data?.department_name);
      })
      .catch((reject) => {
        console.log(reject);
      });

    setOpenModalStaff(true);
  };

  const handleOk = () => {
    setOpenModalStaff(false);
    setOpenModalAccount(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalStaff(false);
    setOpenModalAccount(false);
  };
  useEffect(() => {}, [Staff]);

  useEffect(() => {}, [accept]);

  const onFinish = async (values) => {
    const {
      fullName,
      gender,
      birthDate,
      ID_Card,
      address,
      phone,
      accountbank,
      namebank,
      department,
      position,
    } = values;

    const formData = new FormData();

    if (base) {
      console.log("Success: edit", values);
      formData.append("full_name", fullName);
      formData.append("gender", gender);
      formData.append("birthday", FormattedDate(birthDate));
      formData.append("CMND", ID_Card);
      formData.append("position_name", position);

      await http
        .get(`/admin/store-account-employee/${position}`)
        .then((resolve) => {
          setAccept(resolve.data.message);
          if (resolve.data.message) {
            setOpenModalAccount(true);
          } else {
            http
              .patch(`/admin/update-employee/${id}`, formData)
              .then(() => {
                Swal.fire(
                  "Update!",
                  "You have successfully update your profile",
                  "success"
                ).then(() => {
                  navigate(0);
                });
              })
              .catch((reject) => {
                console.log(reject);
              });
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    } else {
      await http
        .get(`/admin/store-account-employee/${position}`)
        .then((resolve) => {
          console.log(resolve);
          if (resolve.data.message) {
            setOpenModalAccount(true);
          } else {
            formData.append("full_name", fullName);
            formData.append("gender", gender);
            formData.append("birthday", FormattedDate(birthDate));
            formData.append("CMND", ID_Card);
            formData.append("address", address);
            formData.append("phone", phone);
            formData.append("account_bank", accountbank);
            formData.append("name_bank", namebank);
            formData.append("department_name", getDepartmentName(department));
            formData.append("position_name", position);

            http
              .post(`/admin/store-employee`, formData)
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
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
  };

  const onFinishAccount = (values) => {
    const {
      fullName,
      gender,
      birthDate,
      ID_Card,
      address,
      phone,
      accountbank,
      namebank,
      department,
      position,
      username,
      password,
      email,
    } = values;
    const formData = new FormData();
    console.log(id);
    if (base) {
      formData.append("full_name", fullName);
      formData.append("gender", gender);
      formData.append("birthday", FormattedDate(birthDate));
      formData.append("CMND", ID_Card);
      formData.append("position_name", position);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      http
        .patch(`/admin/update-employee/${id}`, formData)
        .then(() => {
          Swal.fire(
            "Update!",
            "You have successfully update your profile",
            "success"
          ).then(() => {
            navigate(0);
          });
        })
        .catch((reject) => {
          console.log(reject);
        });
    } else {
      formData.append("full_name", fullName);
      formData.append("gender", gender);
      formData.append("birthday", FormattedDate(birthDate));
      formData.append("CMND", ID_Card);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("account_bank", accountbank);
      formData.append("name_bank", namebank);
      formData.append("department_name", getDepartmentName(department));
      formData.append("position_name", position);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      http
        .post(`/admin/store-employee`, formData)
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
    toast.error("Update failed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onFinishFaileAccount = (values) => {};

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
      field: "gender",
      headerName: "Gender",

      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "birthday",
      headerName: "Birthday",
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

        return status ? (
          <Box display="flex" borderRadius="4px">
            <Button startIcon={<AiFillEdit />} onClick={handleEditClick}>
              {" "}
            </Button>
            <Button startIcon={<AiFillDelete />} onClick={handleDeleteClick}>
              {" "}
            </Button>
          </Box>
        ) : (
          <div />
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
  //fetch api
  useEffect(() => {
    const fetchData = () => {
      http
        .get(`/admin/list-employee/${0}`)
        .then((resolve) => {
          console.log(resolve);
          setListStaffWork(resolve.data.list_employee);
          setListStaff(resolve.data.list_employee);
        })
        .catch((reject) => {
          console.log(reject);
        });
      http
        .get(`/admin/list-employee/${1}`)
        .then((resolve) => {
          console.log(resolve);
          setListStaffQuit(resolve.data.list_employee);
        })
        .catch((reject) => {
          console.log(reject);
        });
      http
        .get(`/admin/list-department`)
        .then((resolve) => {
          console.log(resolve);
          setListDepartment(resolve.data.list_department);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            rows={listStaff ? listStaff : mockDataTeam}
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
            position: values?.position,
          }}
        >
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div className={cx("form__content")}>
                {form.getFieldValue("fullName")}
              </div>
            ) : (
              <Input
                placeholder={"Please fill full name"}
                className={cx("form__content")}
              />
            )}
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
            className={cx("form-attributes__item")}
            rules={[
              {
                required: true,
                message: "Gender is required!",
              },
            ]}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("gender")}</div>
            ) : (
              <Select placeholder="Please select gender">
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
                <Select.Option value="Khác">Khác</Select.Option>
              </Select>
            )}
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("birthDate")}</div>
            ) : (
              <DatePicker
                placeholder="Select date"
                format={dateFormat}
                onChange={handleSelectBirthDate}
              />
            )}
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("ID_Card")}</div>
            ) : (
              <Input placeholder="201801234" />
            )}
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("address")}</div>
            ) : (
              <Input placeholder="Đà Nẵng" />
            )}
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("phone")}</div>
            ) : (
              <Input placeholder="0905000001" />
            )}
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("accountbank")}</div>
            ) : (
              <Input placeholder="Account Bank" />
            )}
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
            className={cx("form-attributes__item")}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("namebank")}</div>
            ) : (
              <Input placeholder="Name Bank" />
            )}
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            hasFeedback
            className={cx("form-attributes__item")}
            rules={[
              {
                required: true,
                message: "Position is required!",
              },
            ]}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("department")}</div>
            ) : (
              <Select
                placeholder="Please select Type room"
                options={listDepartment.map((ele) => ({
                  label: ele.department_name,
                  value: ele.id,
                }))}
                disabled={disabledCreate}
                onChange={handleSelect}
              ></Select>
            )}
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            hasFeedback
            className={cx("form-attributes__item")}
            rules={[
              {
                required: true,
                message: "Position is required!",
              },
            ]}
          >
            {disabledCreate ? (
              <div>{form.getFieldValue("position")}</div>
            ) : (
              <Select
                placeholder="Please select Position room"
                options={listPosition.map((ele) => ({
                  label: ele.position_name,
                  value: ele.position_name,
                }))}
                disabled={disabledCreate}
              ></Select>
            )}
          </Form.Item>
          <Form.Item wrapperCol={24}>
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
            Account Info
            <FaUser style={{ marginLeft: 16 }} />
          </div>
        }
        open={openModalAccount}
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
          onFinish={onFinishAccount}
          onFinishFailed={onFinishFaileAccount}
          className={cx("modal-form")}
          initialValues={{
            username: account.username,
            email: account.email,
            password: account.password,
          }}
        >
          <Form.Item
            name="username"
            label="User name"
            rules={[
              {
                required: true,
                message: "User name is required!",
              },
            ]}
            hasFeedback
            className={cx("form-attributes__item")}
          >
            <Input
              placeholder={"Please fill user name"}
              className={cx("form__content")}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            className={cx("form-attributes__item")}
            rules={[
              {
                required: true,
                message: "Email is required!",
              },
            ]}
            validateStatus={emailError ? "error" : ""}
            help={emailError}
          >
            <Input
              placeholder={"Please fill email"}
              className={cx("form__content")}
              onChange={handleEmailChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            className={cx("form-attributes__item")}
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          >
            <Input
              placeholder={"Please fill password"}
              className={cx("form__content")}
            />
          </Form.Item>

          <Form.Item wrapperCol={24}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Staff;
