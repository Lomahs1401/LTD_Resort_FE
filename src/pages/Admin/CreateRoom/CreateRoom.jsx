import React, { useState } from "react";
import styles from "./CreateRoom.module.scss";

import classNames from "classnames/bind";
import { Box, Button } from "@mui/material";
import { GrEdit } from "react-icons/gr";
import { Formik } from "formik";
// import * as yup from "yup";

import Header from "../../../components/Header/Header";
import { Divider, Form, Input, Modal, Select } from "antd";
const cx = classNames.bind(styles);

const CreateRoom = () => {
  const [openModalFloor, setOpenModalFloor] = useState(false);
  const [openModalArea, setOpenModalArea] = useState(false);
  const [openModalType, setOpenModalType] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [value, setValue] = useState({ full_name: "" }); // Giá trị ban đầu là rỗng

  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const editRoomFloor = () => {
    setOpenModalFloor(true);
  };
  const editRoomArea = () => {
    setOpenModalArea(true);
  };
  const editRoomType = () => {
    setOpenModalType(true);
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
      <Header title="CREATE ROOM" subtitle="Create a New Room Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        // initialValues={initialValues}
        // validationSchema={checkoutSchema}
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
                labelAlign="right"
                labelCol={{ span: 4 }}
                rules={[
                  {
                    required: true,
                    message: "Room name is required!",
                  },
                ]}
                style={{ width: "60%" }}
                hasFeedback
              >
                <Input placeholder={"Please fill room name"} />
              </Form.Item>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="floor"
                label="Floor"
                labelAlign="right"
                labelCol={{ span: 4 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Floor is required!",
                  },
                ]}
                style={{ width: "60%" }}
              >
                <Select placeholder="Please select floor">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
              <Button
                startIcon={<GrEdit />}
                style={{ width: "10%" }}
                onClick={editRoomFloor}
              ></Button>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="area"
                label="Area"
                labelAlign="right"
                labelCol={{ span: 4 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Area is required!",
                  },
                ]}
                style={{ width: "60%" }}
              >
                <Select placeholder="Please select area">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
              <Button
                startIcon={<GrEdit />}
                style={{ width: "10%" }}
                onClick={editRoomArea}
              ></Button>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="roomType"
                label="Room Type"
                labelAlign="right"
                labelCol={{ span: 4 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Room Type is required!",
                  },
                ]}
                style={{ width: "60%" }}
              >
                <Select placeholder="Please select Room Type">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
              <Button
                startIcon={<GrEdit />}
                style={{ width: "10%" }}
                onClick={editRoomType}
              ></Button>
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
            <Input placeholder={"Please fill floor name"} />
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
            name="floor"
            label="Floor"
            labelAlign="right"
            labelCol={{ span: 4 }}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Floor is required!",
              },
            ]}
          >
            <Select placeholder="Please select Floor">
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={24} style={{ margin: "0" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Submit
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
            Edit Room Area
          </div>
        }
        open={openModalArea}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h4>Add room area</h4>
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
            areaName: value?.area_name,
          }}
        >
          <Form.Item
            name="areaName"
            label="Area Name"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Area name is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill area name"} />
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
        <h4>Delete room area</h4>
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
            areaName: value?.area_name,
          }}
        >
          <Form.Item
            name="area"
            label="Area"
            labelAlign="right"
            labelCol={{ span: 4 }}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Area is required!",
              },
            ]}
            style={{ width: "60%" }}
          >
            <Select placeholder="Please select Area">
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={24} style={{ margin: "0" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Submit
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
            Edit Room Type
          </div>
        }
        open={openModalType}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h4>Add room type</h4>
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
            typeName: value?.type_name,
            sizeName: value?.size_name,
            numberCustomer: value?.number_customer,
            describe: value?.describe,
            image: value?.image,
            price: value?.price,
            pointRanking: value?.point_ranking,
          }}
        >
          <Form.Item
            name="typeName"
            label="Type Name"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Type name is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill room type"} />
          </Form.Item>
          <Form.Item
            name="sizeName"
            label="Size Name"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Size name is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill the size"} />
          </Form.Item>
          <Form.Item
            name="numberCustomer"
            label="Number Customer"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Number customer is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill the number customer"} />
          </Form.Item>
          <Form.Item
            name="describe"
            label="Describe"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Describe is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please write the escribe"} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Image is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please add img"} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Price is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill the price"} />
          </Form.Item>
          <Form.Item
            name="pointRanking"
            label="Point Ranking"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Point ranking is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill the ranking point"} />
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
        <h4>Delete room type</h4>
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
            typeName: value?.type_name,
            sizeName: value?.size_name,
            numberCustomer: value?.number_customer,
            describe: value?.describe,
            image: value?.image,
            price: value?.price,
            pointRanking: value?.point_ranking,
          }}
        >
          <Form.Item
            name="roomType"
            label="Room Type"
            labelAlign="right"
            labelCol={{ span: 4 }}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Room Type is required!",
              },
            ]}
            style={{ width: "60%" }}
          >
            <Select placeholder="Please select Room Type">
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>

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

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   // lastName: yup.string().required("required"),
//   // email: yup.string().email("invalid email").required("required"),
//   // contact: yup
//   //   .string()
//   //   .matches(phoneRegExp, "Phone number is not valid")
//   //   .required("required"),
//   // address1: yup.string().required("required"),
//   // address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   area: "",
//   floor: "",
//   type: "",
// };

export default CreateRoom;
