import React, { useState } from "react";
import styles from "./CreateStaff.module.scss";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import { Box, Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header/Header";
import { DatePicker, Divider, Form, Input, Modal, Select } from "antd";
const cx = classNames.bind(styles);

const CreateStaff = () => {
  const [openModalFloor, setOpenModalFloor] = useState(false);
  const [openModalArea, setOpenModalArea] = useState(false);
  const [openModalType, setOpenModalType] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState({ full_name: "" }); // Giá trị ban đầu là rỗng

  const dateFormat = "DD/MM/YYYY";

  const [form] = Form.useForm();
  const handleSelectBirthDate = (date, dateString) => {
    form.setFieldValue("birthDate", date);
  };
  const handleSelectdayStart = (date, dateString) => {
    form.setFieldValue("dayStart", date);
  };
  const handleSelectdayQuit = (date, dateString) => {
    form.setFieldValue("dayQuit", date);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const [values, setValues] = useState(initialValues);
  const handleChangea = (value, fieldName) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const editRoomFloor = () => {
    setOpenModalFloor(true);
  };

  // Handle click out boundary of modal
  const handleOk = () => {
    setOpenModalFloor(false);
    setOpenModalArea(false);
    setOpenModalType(false);
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalFloor(false);
    setOpenModalArea(false);
    setOpenModalType(false);
  };

  // Successful case
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Failed case
  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  return (
    <Box m="20px">
      <Header title="CREATE STAFF" subtitle="Create a New Staff Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
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
            initialValues={{
              fullName: values?.full_name,
              gender: values?.gender,
              birthDate: values?.birthDate ? dayjs(values?.birthday) : dayjs(),
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
              <Input placeholder={"Please fill full name"} />
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
              <Input placeholder={values?.account_bank} />
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
              <Input placeholder={values?.name_bank} />
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
        )}
      </Formik>

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
            Edit Room Floor
          </div>
        }
        open={openModalFloor}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h4>Add room floor</h4>
        <Form
          layout="horizontal"
          name="profile_form"
          labelAlign="right"
          labelWrap="true"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            floorName: value?.floor_name,
          }}
        >
          <Form.Item
            name="floorName"
            label="Floor Name"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Floor name is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={value?.floor_name} />
          </Form.Item>

          <Form.Item wrapperCol={24}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Divider />
        <h4>Delete room floor</h4>
        <Form
          style={{ display: "flex", alignItems: "center" }}
          layout="horizontal"
          name="profile_form"
          labelAlign="right"
          labelWrap="true"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            floorName: value?.floor_name,
          }}
        >
          <FormControl style={{ width: "90%" }}>
            <InputLabel id="room-floor">Room Floor</InputLabel>
            <Select
              labelId="room-floor"
              id="room-floor-select"
              value={values.floor_name}
              onChange={(event) => handleChangea(event.target.value, "floor")}
              label="Room Floor"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>

          <Form.Item wrapperCol={24} style={{ margin: "0" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  // lastName: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  area: "",
  floor: "",
  type: "",
};

export default CreateStaff;
