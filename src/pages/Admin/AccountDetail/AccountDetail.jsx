import React from "react";
import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import { FaCheckCircle, FaInfoCircle, FaUser } from "react-icons/fa";
import { TbSwitch , TbEdit} from "react-icons/tb"
import styles from "./AccountDetail.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AccountDetail = (params) => {
  console.log(params);
  return (
    <div>
      <div className={cx("account-info-wrapper")}>
      <div className={cx("account-info-wrapper__action")}>
        <img></img>
        <Button  className={cx("button")} icon={<TbEdit />}>Change </Button>
        <Button  className={cx("button")} icon={<TbSwitch />}>Switch </Button>

      </div>
        <div className={cx("account-info-wrapper__top")}>
          <h1 className={cx("header")}>Account Information</h1>
          {/* <button className={cx("btn-change")} onClick={handleChange}>
            <EditOutlined />
            <span>Change</span>
          </button> */}
        </div>

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

export default AccountDetail;
