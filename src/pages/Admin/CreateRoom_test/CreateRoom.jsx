import React, { useState } from "react";
import styles from "./CreateRoom.module.scss";
import classNames from "classnames/bind";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Toolbar,
} from "@mui/material";
import { GrEdit } from "react-icons/gr";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header/Header";
import { Modal, Form, Input, Divider } from "antd";
const cx = classNames.bind(styles);

const CreateRoom = () => {
  const [openModalFloor, setOpenModalFloor] = useState(false);
  const [openModalArea, setOpenModalArea] = useState(false);
  const [openModalType, setOpenModalType] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState({ full_name: "" }); // Giá trị ban đầu là rỗng

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
          <form onSubmit={handleSubmit} style={{ width: "40%" }}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              className={cx("form")}
            >
              <TextField
                width="50%"
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <div className={cx("room-attributes")}>
                <FormControl style={{ width: "90%" }}>
                  <InputLabel id="room-floor">Floor</InputLabel>
                  <Select
                    labelId="room-floor"
                    id="room-floo-select"
                    value={values.floor || ""}
                    onChange={(event) =>
                      handleChangea(event.target.value, "floor")
                    }
                    label="Floor"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  startIcon={<GrEdit />}
                  style={{ width: "10%" }}
                  onClick={editRoomFloor}

                ></Button>
              </div>
              <div className={cx("room-attributes")}>
                <FormControl style={{ width: "90%" }}>
                  <InputLabel id="room-area">Area</InputLabel>
                  <Select
                    labelId="room-area"
                    id="room-area-select"
                    value={values.area}
                    onChange={(event) =>
                      handleChangea(event.target.value, "area")
                    }
                    label="Area"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  startIcon={<GrEdit />}
                  style={{ width: "10%" }}
                  onClick={editRoomArea}

                ></Button>
              </div>
              <div className={cx("room-attributes")}>
                <FormControl style={{ width: "90%" }}>
                  <InputLabel id="room-tyoe">Room Type</InputLabel>
                  <Select
                    labelId="room-type"
                    id="room-type-select"
                    value={values.type}
                    onChange={(event) =>
                      handleChangea(event.target.value, "type")
                    }
                    label="Room Type"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  startIcon={<GrEdit />}
                  style={{ width: "10%" }}
                  onClick={editRoomType}
                ></Button>
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Room
              </Button>
            </Box>
          </form>
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
            <Input placeholder={"Please select floor"} />
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
            floorName: value?.floor_name,          }}
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
            <Input placeholder={"Please select area"} />
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
          <FormControl style={{ width: "90%" }}>
            <InputLabel id="room-floor">Room Area</InputLabel>
            <Select
              labelId="room-area"
              id="room-area-select"
              value={values.area_name}
              onChange={(event) => handleChangea(event.target.value, "floor")}
              label="Room Area"
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
            <Input placeholder={"Please fill floor name"} />
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
            <Input placeholder={value?.size_name} />
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
            <Input placeholder={value?.number_customer} />
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
            <Input placeholder={value?.describe} />
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
            <Input placeholder={value?.size_name} />
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
            <Input placeholder={value?.price} />
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
            <Input placeholder={value?.point_ranking} />
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
          <FormControl style={{ width: "90%" }}>
            <InputLabel id="room-typr">Room Type</InputLabel>
            <Select
              labelId="room-type"
              id="room-type-select"
              value={values.type}
              onChange={(event) => handleChangea(event.target.value, "type")}
              label="Room Type"
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

export default CreateRoom;
