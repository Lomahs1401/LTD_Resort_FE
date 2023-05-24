import React, { useState, useRef } from 'react'
import styles from './AccountInfo.module.scss'
import classNames from 'classnames/bind'
import { EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Modal, Select } from 'antd';
import { FaCheckCircle, FaInfoCircle, FaUser } from 'react-icons/fa';
import AuthUser from '../../utils/AuthUser';
import { Diamond } from '@mui/icons-material';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormattedDate from '../../utils/FormattedDate';
import dayjs from 'dayjs';

const cx = classNames.bind(styles)

const AccountInfo = ({ customerInfo, customerRanking }) => {

  const addAppointmentFormLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    },
  };

  const dateFormat = 'DD/MM/YYYY';

  const { http, user } = AuthUser();

  const RANKING_BRONZE = "Bronze";
  const RANKING_SILVER = "Silver";
  const RANKING_GOLD = "Gold";
  const RANKING_PLATINUM = "Platinum";
  const RANKING_DIAMOND = "Diamond";


  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // ---------------------------  Set field for date input  ---------------------------
  const [form] = Form.useForm();

  const handleSelectBirthDate = (date, dateString) => {
    form.setFieldValue('birthDate', date);
  }

  const handleChange = () => {
    setOpenModal(true);
  }

  // Handle click out boundary of modal 
  const handleOk = () => {
    setOpenModal(false);
  }

  // Handle click button "X" of modal
  const handleCancel = () => {
    setOpenModal(false);
  }

  // Successful case
  const onFinish = (values) => {
    const { fullName, gender, birthDate, email, ID_Card, address, phone } = values;
    const formData = new FormData();

    formData.append('account_id', user.id);
    formData.append('full_name', fullName);
    formData.append('gender', gender);
    formData.append('birth_date', FormattedDate(birthDate));
    formData.append('email', email);
    formData.append('id_card', ID_Card);
    formData.append('address', address);
    formData.append('phone', phone);

    http.patch(`/customer/account/${user.id}`, formData)
      .then(() => {
        Swal.fire(
          'Update!',
          'You have successfully update your profile',
          'success'
        ).then(() => {
          navigate(0);
        })
      })
      .catch((reject) => {
        console.log(reject);
        toast.error('Oops. Try again', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      })
  }

  // Failed case
  const onFinishFailed = (error) => {
    console.log('Error: ', error)
    toast.error('Update failed!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  // ---------------------------      Modal Draggable      ---------------------------
  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
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
    <div className={cx("account-info-wrapper")}>
      <div className={cx("account-info-wrapper__top")}>
        <h1 className={cx("header")}>Account Information</h1>
        <button
          className={cx("btn-change")}
          onClick={handleChange}
        >
          <EditOutlined />
          <span>Change</span>
        </button>
      </div>
      <Divider className={cx("seperate-line")} />
      <div className={cx("account-info-wrapper__bottom")}>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Name</div>
            <div className={cx("content-text")}>{customerInfo?.fullName?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {customerInfo?.full_name ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Gender</div>
            <div className={cx("content-text")}>{customerInfo?.gender ?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {customerInfo?.gender ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Date of birth</div>
            <div className={cx("content-text")}>{customerInfo?.birthday ?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {customerInfo?.birthday ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>ID Card</div>
            <div className={cx("content-text")}>{customerInfo?.CMND ?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {customerInfo?.CMND ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Address</div>
            <div className={cx("content-text")}>{customerInfo?.address ?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {customerInfo?.address ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Phone number</div>
            <div className={cx("content-text")}>{customerInfo?.phone ?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {customerInfo?.phone ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Ranking point</div>
            <div className={cx("content-text")}>{customerInfo?.ranking_point ?? "No information provided"}</div>
          </div>
          <div className={cx("info-container__right")}>
            {(() => {
              if (customerRanking === RANKING_BRONZE) {
                return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#A77044' }} />
              }
              else if (customerRanking === RANKING_SILVER) {
                return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#D7D7D7' }} />
              }
              else if (customerRanking === RANKING_GOLD) {
                return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#FEE101' }} />
              }
              else if (customerRanking === RANKING_PLATINUM) {
                return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#79CCE4' }} />
              }
              else if (customerRanking === RANKING_DIAMOND) {
                return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#225684' }} />
              }
            })()}
          </div>
        </div>
        <div className={cx("info-container")}>
          <div className={cx("info-container__left")}>
            <div className={cx("title-text")}>Password</div>
            <div className={cx("content-text")}>************</div>
          </div>
          <div className={cx("info-container__right")}>
            <FaCheckCircle />
          </div>
        </div>
      </div>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
              textAlign: 'center',
              marginBottom: 24
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
          layout='horizontal'
          name='profile_form'
          labelAlign='right'
          labelWrap='true'
          size='large'
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={cx("modal-form")}
          initialValues={{
            'fullName': customerInfo?.full_name,
            'gender': customerInfo?.gender,
            'birthDate': customerInfo?.birthDate ? dayjs(customerInfo?.birthday) : dayjs(),
            'ID_Card': customerInfo?.CMND,
            'address': customerInfo?.address,
            'phone': customerInfo?.phone,
          }}
        >
          <Form.Item
            name='fullName'
            label="Full Name"
            rules={[
              {
                required: true,
                message: 'Full name is required!'
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder={customerInfo?.full_name}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Gender is required!',
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
            name='birthDate'
            rules={[
              {
                required: true,
                message: 'Birth date is required!'
              }
            ]}
            hasFeedback
          >
            <DatePicker
              placeholder='Select date'
              format={dateFormat}
              onChange={handleSelectBirthDate}
            />
          </Form.Item>
          <Form.Item
            name='ID_Card'
            label="ID Card"
            rules={[
              {
                required: true,
                message: 'ID Card is required!'
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder='201801234'
            />
          </Form.Item>
          <Form.Item
            name='address'
            label="Address"
            rules={[
              {
                required: true,
                message: 'Address is required!'
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder='Đà Nẵng'
            />
          </Form.Item>
          <Form.Item
            name='phone'
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Phone is required!'
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder='0905000001'
            />
          </Form.Item>
          <Form.Item
            wrapperCol={24}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AccountInfo