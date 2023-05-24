import React, { useRef, useHistory, useState, useMemo } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { tokens } from "../../../utils/theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header/Header";
import { AiFillEdit, AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import styles from "./Staff.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import Detail from "./components/Detail";

const cx = classNames.bind(styles);

const Team = () => {
  //test
  // const [itemShow, setIemShow] = useState(0);
  // const [dataDetail, setDataDetail] = useState({});

  const [openModalStaff, setOpenModalStaff] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(null); // Giá trị ban đầu là rỗng
  const [form] = Form.useForm();

  // const gridRef = useRef(null);
  const dateFormat = "DD/MM/YYYY";
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    form.setFieldValue("birthDate", date);
  };
  const handleSelectdayStart = (date, dateString) => {
    form.setFieldValue("dayStart", date);
  };
  const handleSelectdayQuit = (date, dateString) => {
    form.setFieldValue("dayQuit", date);
  };

  const handleCreate = () => {
    console.log("create");
    setOpenModalStaff(true);
    // form.resetFields();
  };

  const handleEdit = (params) => {
    console.log(params);
    console.log("params");
  };
  const handleDelete = (params) => {
    console.log(params);
    console.log("aaa");
  };
  const handleDoubleClickCell = (params) => {
    // const { row } = params;
    // // form.resetFields();
    // console.log(row, "open");
    console.log(params.row, "open");

    // setValue(params);
    setOpenModalStaff(true);
    
    // test
    // setIemShow(id);
    // setDataDetail(row);
  };

  const handleOk = () => {
    // form.resetFields();
    setOpenModalStaff(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    console.log("Cancel");
    setValue(null);
    // form.resetFields();

    setOpenModalStaff(false);
  };
  const handleClose = () => {
    console.log("Close");
    setOpenModalStaff(false);
    // form.resetFields();
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
      field: "full_Name",
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

  // test
  // const renderView = useMemo(() => {
  //   console.log("id", itemShow);
  //   if (itemShow !== 0) {
  //     return <Detail data={dataDetail} setIemShow={setIemShow} />;
  //   } else {
  //     return (
  //       <DataGrid
  //         onCellDoubleClick={handleDoubleClickCell}
  //         checkboxSelection
  //         ref={gridRef}
  //         rows={mockDataTeam}
  //         columns={columns}
  //         components={{ Toolbar: CustomToolbar }}
  //       />
  //     );
  //   }
  // }, [itemShow]);

  //   const view = useMemo(() => {
  //     console.log(1231, value)
  //     return(
  // <Form
  //           // {...addAppointmentFormLayout}
  //           form={form}
  //           layout="horizontal"
  //           name="profile_form"
  //           labelAlign="right"
  //           labelWrap="true"
  //           size="large"
  //           autoComplete="off"
  //           onFinish={onFinish}
  //           onFinishFailed={onFinishFailed}
  //           className={cx("modal-form")}
  //           initialValues={{
  //             fullName: value?.name,
  //             gender: value?.gender,
  //             birthDate: value?.birthDate ? dayjs(value?.birthday) : dayjs(),
  //             ID_Card: value?.CMND,
  //             age: value.age,
  //             address: value?.address,
  //             phone: value?.phone,
  //             accountbank: value?.account_bank,
  //             namebank: value?.name_bank,
  //             dayStart: value?.dayStart ? dayjs(value?.dayStart) : dayjs(),
  //             dayQuit: value?.dayQuit ? dayjs(value?.dayQuit) : dayjs(),
  //             position: value?.position,
  //           }}
  //         >
  //           <Form.Item
  //             name="age"
  //             label="age"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             hasFeedback
  //           >
  //             <Input/>
  //           </Form.Item>

  //           <Form.Item
  //             name="ame"
  //             label="Name"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Full name is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <Input placeholder={"Please fill full name"} />
  //           </Form.Item>
  //           <Form.Item
  //             name="gender"
  //             label="Gender"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             hasFeedback
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Gender is required!",
  //               },
  //             ]}
  //           >
  //             <Select placeholder="Please select gender">
  //               <Select.Option value="Male">Male</Select.Option>
  //               <Select.Option value="Female">Female</Select.Option>
  //               <Select.Option value="Other">Other</Select.Option>
  //             </Select>
  //           </Form.Item>
  //           <Form.Item
  //             label="Birth Date"
  //             name="birthDate"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Birth date is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <DatePicker
  //               placeholder="Select date"
  //               format={dateFormat}
  //               onChange={handleSelectBirthDate}
  //             />
  //           </Form.Item>
  //           <Form.Item
  //             name="ID_Card"
  //             label="ID Card"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "ID Card is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <Input placeholder="201801234" />
  //           </Form.Item>
  //           <Form.Item
  //             name="address"
  //             label="Address"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Address is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <Input placeholder="Đà Nẵng" />
  //           </Form.Item>
  //           <Form.Item
  //             name="phone"
  //             label="Phone"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Phone is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <Input placeholder="0905000001" />
  //           </Form.Item>
  //           <Form.Item
  //             name="accountbank"
  //             label="Account Bank"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Account bank is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <Input placeholder={value?.account_bank} />
  //           </Form.Item>
  //           <Form.Item
  //             name="namebank"
  //             label="Name Bank"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Bank name is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <Input placeholder={value?.name_bank} />
  //           </Form.Item>
  //           <Form.Item
  //             label="Day Start"
  //             name="dayStart"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Day Start is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <DatePicker
  //               placeholder="Select date"
  //               format={dateFormat}
  //               onChange={handleSelectdayStart}
  //             />
  //           </Form.Item>
  //           <Form.Item
  //             label="Day Quit"
  //             name="dayQuit"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Day quit is required!",
  //               },
  //             ]}
  //             hasFeedback
  //           >
  //             <DatePicker
  //               placeholder="Select date"
  //               format={dateFormat}
  //               onChange={handleSelectdayQuit}
  //             />
  //           </Form.Item>
  //           <Form.Item
  //             name="position"
  //             label="Position"
  //             labelAlign="right"
  //             labelCol={{ span: 2 }}
  //             hasFeedback
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Position is required!",
  //               },
  //             ]}
  //           >
  //             <Select placeholder="Please select Position">
  //               <Select.Option value="Boss">Boss</Select.Option>
  //               <Select.Option value="Freshman">Freshman</Select.Option>
  //               <Select.Option value="Staff">Staff</Select.Option>
  //             </Select>
  //           </Form.Item>
  //           <Form.Item wrapperCol={24}>
  //             <div style={{ display: "flex", justifyContent: "flex-end" }}>
  //               <Button type="primary" htmlType="submit">
  //                 Submit
  //               </Button>
  //             </div>
  //           </Form.Item>
  //         </Form>
  //     )
  //   }, [value])
  




  // form.setFieldValue('fullName', value?.full_name)
// const  initialValues={{
//     fullName: value?.full_Name,
//     gender: value?.gender,
//     birthDate: value?.birthDate ? dayjs(value?.birthday) : dayjs(),
//     ID_Card: value?.CMND,
//     age: value?.age,
//     address: value?.address,
//     phone: value?.phone,
//     accountbank: value?.account_bank,
//     namebank: value?.name_bank,
//     dayStart: value?.dayStart ? dayjs(value?.dayStart) : dayjs(),
//     dayQuit: value?.dayQuit ? dayjs(value?.dayQuit) : dayjs(),
//     position: value?.position,
//   }}

form.setFieldValue('fullName', value?.full_name)
{console.log(value)}

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
          // renderView
          <DataGrid
            onCellDoubleClick={handleDoubleClickCell}
            checkboxSelection
            // ref={gridRef}
            rows={mockDataTeam}
            columns={columns}
            components={{ Toolbar: CustomToolbar }}
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
            Create
          </div>
        }
        open={openModalStaff}
        onOk={handleOk}
        onCancel={handleCancel}
        // afterClose={handleClose}
        footer={null}
      >
        <Form
          // {...addAppointmentFormLayout}
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
          
          
        >
          {console.log(value)}
          <Form.Item
            name="age"
            label="age"
            labelAlign="right"
            labelCol={{ span: 2 }}
            hasFeedback
          >

            <Input />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            labelAlign="right"
            labelCol={{ span: 2 }}
            rules={[
              {
                required: true,
                message: "Full name is required!",
              },
            ]}
            hasFeedback
          >

            <Input placeholder={"Please fill full name"} value={value?.full_Name}/>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            labelAlign="right"
            labelCol={{ span: 2 }}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Gender is required!",
              },
            ]}
          >
            <Select placeholder="Please select gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="birthDate"
            labelAlign="right"
            labelCol={{ span: 2 }}
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
            />
          </Form.Item>
          <Form.Item
            name="ID_Card"
            label="ID Card"
            labelAlign="right"
            labelCol={{ span: 2 }}
            rules={[
              {
                required: true,
                message: "ID Card is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="201801234" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            labelAlign="right"
            labelCol={{ span: 2 }}
            rules={[
              {
                required: true,
                message: "Address is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Đà Nẵng" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            labelAlign="right"
            labelCol={{ span: 2 }}
            rules={[
              {
                required: true,
                message: "Phone is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="0905000001" />
          </Form.Item>
          <Form.Item
            name="accountbank"
            label="Account Bank"
            labelAlign="right"
            labelCol={{ span: 2 }}
            rules={[
              {
                required: true,
                message: "Account bank is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={value?.account_bank} />
          </Form.Item>
          <Form.Item
            name="namebank"
            label="Name Bank"
            labelAlign="right"
            labelCol={{ span: 2 }}
            rules={[
              {
                required: true,
                message: "Bank name is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={value?.name_bank} />
          </Form.Item>
          <Form.Item
            label="Day Start"
            name="dayStart"
            labelAlign="right"
            labelCol={{ span: 2 }}
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
            />
          </Form.Item>
          <Form.Item
            label="Day Quit"
            name="dayQuit"
            labelAlign="right"
            labelCol={{ span: 2 }}
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
            />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            labelAlign="right"
            labelCol={{ span: 2 }}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Position is required!",
              },
            ]}
          >
            <Select placeholder="Please select Position">
              <Select.Option value="Boss">Boss</Select.Option>
              <Select.Option value="Freshman">Freshman</Select.Option>
              <Select.Option value="Staff">Staff</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={24}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Team;
