import React, { useState } from 'react'
import styles from './Step2.module.scss'
import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux';
import { prevProgressStep, removeTotalAmount, removeTotalPeople, removeTotalRooms } from '../../../redux/actions';
import { Button, Divider, Form, Input, Select } from 'antd';
import creditCard from '../../../img/credit-card.png'
import { bookmarkRoomsSelector, checkinDateSelector, checkoutDateSelector, totalAmountSelector, totalPeopleSelector, totalRoomsSelector } from '../../../redux/selectors';
import { toast } from 'react-toastify';
import AuthUser from '../../../utils/AuthUser';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

const Step2 = ({ current, setCurrent }) => {

  const { http } = AuthUser();

  const paymentFormLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkinDate = useSelector(checkinDateSelector);
  const checkoutDate = useSelector(checkoutDateSelector);
  const bookmarkRooms = useSelector(bookmarkRoomsSelector);
  const totalAmount = useSelector(totalAmountSelector);
  const totalRooms = useSelector(totalRoomsSelector);
  const totalPeople = useSelector(totalPeopleSelector);

  const roomIds = bookmarkRooms.map((bookmarkRoom) => {
    return bookmarkRoom.id;
  });

  const [form] = Form.useForm();
  const [payTime, setPayTime] = useState(null);
  const [confirmPaySuccess, setConfirmPaySuccess] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  var startTime = new Date();
  var expire = new Date(startTime.getTime() + 15 * 60000); // Thêm 15 phút (15 * 60 * 1000 milliseconds) vào thời gian bắt đầu
  
  // Định dạng lại thời gian thành chuỗi theo định dạng yyyymmddHHMMSS
  var startTimeFormatted = startTime.getFullYear() + 
    ('0' + (startTime.getMonth() + 1)).slice(-2) +
    ('0' + startTime.getDate()).slice(-2) +
    ('0' + startTime.getHours()).slice(-2) +
    ('0' + startTime.getMinutes()).slice(-2) +
    ('0' + startTime.getSeconds()).slice(-2);
  
  var expireFormatted = expire.getFullYear() +
    ('0' + (expire.getMonth() + 1)).slice(-2) +
    ('0' + expire.getDate()).slice(-2) +
    ('0' + expire.getHours()).slice(-2) +
    ('0' + expire.getMinutes()).slice(-2) +
    ('0' + expire.getSeconds()).slice(-2);

  const [fullName, ] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user.full_name === null ? null : user.full_name;
  });

  const [customerId, ] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user.customer_id
  });

  const handleGoBack = () => {
    setCurrent(current - 1);
    dispatch(prevProgressStep(current - 1));
    dispatch(removeTotalAmount(0));
    dispatch(removeTotalRooms(0));
    dispatch(removeTotalPeople(0));
  }

  const onFinish = (values) => {
    console.log(values);
    const formData = new FormData();

    formData.append('order_id', values.billCode);
    formData.append('txtexpire', values.expired);
    formData.append('order_desc', values.billContent);
    formData.append('bank_code', values.bank);
    formData.append('amount', values.totalAmount);

    http.post('/customer/vnpay_payment', formData)
      .then((resolve) => {
        console.log(resolve);
        if (resolve.data.message === 'success') {
          setPayTime(resolve.data.payTime); // Lưu giá trị resolve.data.payTime vào biến tham chiếu
          setPaymentSuccess(true);
          window.location.href = decodeURIComponent(resolve.data.url); // Điều hướng tới trang thanh toán
        }
      })
      .catch((reject) => {
        console.log(reject)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Please input all fields', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const responseCode = queryParams.get('vnp_ResponseCode');

    if (responseCode !== null) {
      // Xác định rằng URL chứa tham số vnp_ResponseCode
      if (responseCode === '00') {
        setConfirmPaySuccess(true);
        const paymentData = {
          totalAmount: form.getFieldValue('totalAmount'),
          totalRoom: form.getFieldValue('totalRooms'),
          totalPeople: form.getFieldValue('totalPeople'),
          customerId: form.getFieldValue('customerId'),
          paymentMethod: 'Online',
          payTime: payTime,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
          tax: 0,
          discount: 0,
          room_id: roomIds.join(', ')
        };

        const timeStart = dayjs(checkinDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const timeEnd = dayjs(checkoutDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

        http.post(`/customer/store-bill-room/${timeStart}/${timeEnd}`, paymentData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            // Xử lý lỗi khi không thể lưu dữ liệu
          });
      } else {
        setConfirmPaySuccess(false);
      }
    }
  }, [isFirstRender]);

  useEffect(() => {
    if (confirmPaySuccess === true) {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your payment has been successfully processed.',
      }).then(() => {
        navigate('/find-rooms');
      });
    } else if (confirmPaySuccess === false) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'Your payment was not successful.',
      });
    }
  }, [confirmPaySuccess]);

  return (
    <div className={cx("booking-step-wrapper")}>
      <div className={cx("payment-title")}>
        <img src={creditCard} alt='Credit Card' />
        <h1>Bill Information</h1>
      </div>
      <div className={cx("payment-wrapper")}>
        <div className={cx("form-container")}>
          <Form
            {...paymentFormLayout}
            form={form}
            layout='vertical'
            name='payment_form'
            labelAlign='left'
            labelWrap='true'
            size='large'
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              'billCode': startTimeFormatted,
              'expired': expireFormatted,
              'billContent': `Invoice of customer ${fullName}`,
              'customerId': customerId,
              'fullName': fullName,
              'totalAmount': totalAmount,
              'totalRooms': totalRooms,
              'totalPeople': totalPeople,
            }}
          >
            <Form.Item
              label="Bill Code"
              name="billCode"
              rules={[
                {
                  required: true,
                  message: 'Bill code is required!',
                },
              ]}
              hasFeedback
            >
              <Input placeholder={startTimeFormatted} disabled />
            </Form.Item>
            <Form.Item
              label="Expired"
              name="expired"
              rules={[
                {
                  required: true,
                  message: 'Expired is required!',
                },
              ]}
              hasFeedback
            >
              <Input placeholder={expireFormatted} disabled />
            </Form.Item>
            <Form.Item
              label="Bill Content"
              name="billContent"
              rules={[
                {
                  required: true,
                  message: 'Bill Content is required!',
                },
              ]}
              hasFeedback
            >
              <Input placeholder={`Invoice of customer ${fullName}`} />
            </Form.Item>
            <Form.Item
              label="Bank"
              name="bank"
              initialValue="" // hoặc defaultValue=""
            >
              <Select placeholder="Select Bank">
                <Select.Option value="">No</Select.Option>
                <Select.Option value="NCB">NCB</Select.Option>
                <Select.Option value="AGRIBANK">Agribank</Select.Option>
                <Select.Option value="SCB">SCB</Select.Option>
                <Select.Option value="SACOMBANK">SacomBank</Select.Option>
                <Select.Option value="EXIMBANK">EximBank</Select.Option>
                <Select.Option value="MSBANK">MSBANK</Select.Option>
                <Select.Option value="NAMABANK">NamABank</Select.Option>
                <Select.Option value="VNMART">VnMart</Select.Option>
                <Select.Option value="VIETINBANK">Vietinbank</Select.Option>
                <Select.Option value="VIETCOMBANK">VCB</Select.Option>
                <Select.Option value="HDBANK">Ngan hang HDBank</Select.Option>
                <Select.Option value="DONGABANK">Dong A</Select.Option>
                <Select.Option value="TPBANK">TPBank</Select.Option>
                <Select.Option value="OJB">OceanBank</Select.Option>
                <Select.Option value="BIDV">BIDV</Select.Option>
                <Select.Option value="TECHCOMBANK">Techcombank</Select.Option>
                <Select.Option value="VPBANK">VPBank</Select.Option>
                <Select.Option value="MBBANK">MBBank</Select.Option>
                <Select.Option value="ACB">ACB</Select.Option>
                <Select.Option value="OCB">OCB</Select.Option>
                <Select.Option value="IVB">IVB</Select.Option>
                <Select.Option value="VISA">VISA/MASTER</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Full name is required!',
                },
              ]}
              style={{display: 'none'}}
              hasFeedback
            >
              <Input placeholder={fullName} disabled />
            </Form.Item>
            <Form.Item
              label="Total Amount"
              name="totalAmount"
              rules={[
                {
                  required: true,
                  message: 'Total amount is required!',
                },
              ]}
              style={{display: 'none'}}
              hasFeedback
            >
              <Input placeholder={totalAmount} disabled />
            </Form.Item>
            <Form.Item
              label="Total Rooms"
              name="totalRooms"
              rules={[
                {
                  required: true,
                  message: 'Total rooms is required!',
                },
              ]}
              style={{display: 'none'}}
              hasFeedback
            >
              <Input placeholder={totalRooms} disabled />
            </Form.Item>
            <Form.Item
              label="Total People"
              name="totalPeople"
              rules={[
                {
                  required: true,
                  message: 'Total people is required!',
                },
              ]}
              style={{display: 'none'}}
              hasFeedback
            >
              <Input placeholder={totalPeople} disabled />
            </Form.Item>
            <Form.Item
              label="Customer ID"
              name="customerId"
              rules={[
                {
                  required: true,
                  message: 'Customer ID is required',
                },
              ]}
              style={{display: 'none'}}
              hasFeedback
            >
              <Input placeholder={customerId} disabled={true} />
            </Form.Item>

            <Divider className={cx("seperate-line")} />

            <div className={cx("booking-step-navigate")}>
              <Button onClick={handleGoBack} className={cx("btn-back")}>
                <span>Back</span>
              </Button>
              <Button htmlType='submit' className={cx("btn-confirm")}>
                <span>Confirm</span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Step2