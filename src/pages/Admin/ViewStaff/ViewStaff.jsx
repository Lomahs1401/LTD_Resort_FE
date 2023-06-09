import React from "react";
import { Button } from "antd";
import { TbSwitch, TbEdit } from "react-icons/tb";
import styles from "./ViewStaff.module.scss";
import Header from "../../../components/Header/Header";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ViewStaff = (params) => {
  console.log(params);
  return (
    <div>
      <div className={cx("account-info-wrapper")}>
        <Header title="STAFF INFO" subtitle="Staff infomation" />

        <div className={cx("account-info-wrapper__action")}>
          <img></img>
          <Button className={cx("button")} icon={<TbEdit />}>
            Change{" "}
          </Button>
          <Button className={cx("button")} icon={<TbSwitch />}>
            Switch{" "}
          </Button>
        </div>
        {/* <div className={cx("account-info-wrapper__top")}>
          <h1 className={cx("header")}>Account Information</h1>
          <button className={cx("btn-change")} onClick={handleChange}>
            <EditOutlined />
            <span>Change</span>
          </button>
        </div> */}

        <div className={cx("account-info-wrapper__bottom")}>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Name</div>
              <div className={cx("content-text")}>
                {"No information provided"}
              </div>
            </div>
            <div className={cx("info-container__right")}></div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Gender</div>
              <div className={cx("content-text")}>
                {"No information provided"}
              </div>
            </div>
            <div className={cx("info-container__right")}></div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Date of birth</div>
              <div className={cx("content-text")}>
                {"No information provided"}
              </div>
            </div>
            <div className={cx("info-container__right")}>
              {/* {customerInfo?.birthday ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>ID Card</div>
              <div className={cx("content-text")}>
                {"No information provided"}
              </div>
            </div>
            <div className={cx("info-container__right")}>
              {/* {customerInfo?.CMND ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Address</div>
              <div className={cx("content-text")}>
                {"No information provided"}
              </div>
            </div>
            <div className={cx("info-container__right")}>
              {/* {customerInfo?.address ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
            </div>
          </div>
          <div className={cx("info-container")}>
            <div className={cx("info-container__left")}>
              <div className={cx("title-text")}>Phone number</div>
              <div className={cx("content-text")}>
                {"No information provided"}
              </div>
            </div>
            <div className={cx("info-container__right")}>
              {/* {customerInfo?.phone ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
            </div>
          </div>
          <div className={cx("info-bank")}>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>account_bank</div>
                <div className={cx("content-text")}>
                  {"No information provided"}
                </div>
              </div>
              <div className={cx("info-container__right")}>
                {/* {customerInfo?.phone ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>name_bank</div>
                <div className={cx("content-text")}>
                  {"No information provided"}
                </div>
              </div>
              <div className={cx("info-container__right")}>
                {/* {customerInfo?.phone ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
              </div>
            </div>
          </div>
          <div className={cx("info-bank")}>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>day_start</div>
                <div className={cx("content-text")}>
                  {"No information provided"}
                </div>
              </div>
              <div className={cx("info-container__right")}>
                {/* {customerInfo?.phone ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
              </div>
            </div>
            <div className={cx("info-container")}>
              <div className={cx("info-container__left")}>
                <div className={cx("title-text")}>day_quit</div>
                <div className={cx("content-text")}>
                  {"No information provided"}
                </div>
              </div>
              <div className={cx("info-container__right")}>
                {/* {customerInfo?.phone ? (
                <FaCheckCircle />
              ) : (
                <FaInfoCircle style={{ color: "grey" }} />
              )} */}
              </div>
            </div>
          </div>
        </div>

        {/* <Formik
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
      </Formik> */}
        {/* <Modal
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
              Update Profile
              <FaUser style={{ marginLeft: 16 }} />
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
            {...addAppointmentFormLayout}
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
              fullName: customerInfo?.full_name,
              gender: customerInfo?.gender,
              birthDate: customerInfo?.birthDate
                ? dayjs(customerInfo?.birthday)
                : dayjs(),
              ID_Card: customerInfo?.CMND,
              address: customerInfo?.address,
              phone: customerInfo?.phone,
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
            >
              <Input placeholder={customerInfo?.full_name} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
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
            <Form.Item wrapperCol={24}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form> 
        </Modal>*/}
      </div>
    </div>
  );
};

export default ViewStaff;
