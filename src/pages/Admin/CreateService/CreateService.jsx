import React, { useState } from "react";
import styles from "./CreateService.module.scss";

import classNames from "classnames/bind";
import { Box, Button } from "@mui/material";
import { GrEdit } from "react-icons/gr";
import { Formik } from "formik";
// import * as yup from "yup";

import Header from "../../../components/Header/Header";
import { Divider, Form, Input, Modal, Select } from "antd";
const cx = classNames.bind(styles);

const CreateService = () => {
  const [openModalServiceType, setOpenModalServiceType] = useState(false);
  const [disabled, setDisabled] = useState(false);
 
  const [value, setValue] = useState(); // Giá trị ban đầu là rỗng



  const [form] = Form.useForm();
 

  const handleFormSubmit = (values) => {
    console.log(values);
  };
 

  const editServiceType = () => {
    setOpenModalServiceType(true);
  };
  
  // Handle click out boundary of modal
  const handleOk = () => {
    setOpenModalServiceType(false)
    
  };

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModalServiceType(false)
    
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
      <Header title="CREATE SERVICE" subtitle="Create a New Service Profile" />

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
              serviceName: values?.service_name,
              price: values?.price,
              pointRanking: values?.point_ranking,
              description: values?.description,
              serviceType: values?.type,
            }}
          >
            <div className={cx("room-attributes")}>
              <Form.Item
                name="serviceName"
                label="Service Name"
                labelAlign="right"
                labelCol={{ span: 4 }}
                rules={[
                  {
                    required: true,
                    message: "Service name is required!",
                  },
                ]}
                style={{ width: "60%" }}
                hasFeedback
              >
                <Input placeholder={"Please fill service name"} />
              </Form.Item>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="price"
                label="Price"
                labelAlign="right"
                labelCol={{ span: 4 }}
                rules={[
                  {
                    required: true,
                    message: "Price is required!",
                  },
                ]}
                style={{ width: "60%" }}
                hasFeedback
              >
                <Input placeholder={"Please fill price"} />
              </Form.Item>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="pointRanking"
                label="Point Ranking"
                labelAlign="right"
                labelCol={{ span: 4 }}
                rules={[
                  {
                    required: true,
                    message: "Point ranking is required!",
                  },
                ]}
                style={{ width: "60%" }}
                hasFeedback
              >
                <Input placeholder={"Please fill point ranking"} />
              </Form.Item>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="description"
                label="Description"
                labelAlign="right"
                labelCol={{ span: 4 }}
                rules={[
                  {
                    required: true,
                    message: "Description is required!",
                  },
                ]}
                style={{ width: "60%" }}
                hasFeedback
              >
                <Input placeholder={"Please fill description"} />
              </Form.Item>
            </div>
            <div className={cx("room-attributes")}>
              <Form.Item
                name="serviceType"
                label="Service Type"
                labelAlign="right"
                labelCol={{ span: 4 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Service type is required!",
                  },
                ]}
                style={{ width: "60%" }}
              >
                <Select placeholder="Please select service type">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
              <Button
                startIcon={<GrEdit />}
                style={{ width: "10%" }}
                onClick={editServiceType}
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
        open={openModalServiceType}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h4>Add service type</h4>
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
            serviceType: value?.type,
          }}
        >
          <Form.Item
            name="serviceType"
            label="Service Type"
            labelAlign="left"
            labelCol={{ span: 8 }}
            rules={[
              {
                required: true,
                message: "Service type is required!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder={"Please fill Service type"} />
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

export default CreateService;
