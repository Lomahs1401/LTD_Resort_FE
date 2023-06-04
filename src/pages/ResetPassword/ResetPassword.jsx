import React from 'react'
import styles from './ResetPassword.module.scss'
import classNames from "classnames/bind";
import logo from '../../img/logo.png'
import carousel1 from '../../img/carousel1.png'
import carousel2 from '../../img/carousel2.png'
import carousel3 from '../../img/carousel3.png'
import { Form, Button, Input } from 'antd'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { BiArrowBack } from 'react-icons/bi'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthUser from '../../utils/AuthUser';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

const ResetPassword = () => {

  const slides = [
    { url: carousel1, title: 'Carousel 1' },
    { url: carousel2, title: 'Carousel 2' },
    { url: carousel3, title: 'Carousel 3' },
  ]

  const { http } = AuthUser();

  const resetPasswordFormLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const code = location.state?.code || '';

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();

    formData.append('password', values.newPassword);
    formData.append('confirm_password', values.confirmNewPassword);

    http.patch(`/auth/reset-password/${email}/${code}`, formData)
      .then((resolve) => {
        console.log(resolve);
        Swal.fire(
          'Successfully Reset Password!',
          'You have successfully reset your password',
          'success'
        ).then(() => {
          navigate('/login');
        })
      })
      .catch((reject) => {
        console.log(reject);
        const errorMsg = reject.response.data.message;
        toast.error(errorMsg, {
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Please enter all fields', {
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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__left")}>
        <div className={cx("forgot-password-container")}>
          <div className={cx("forgot-password-container__logo")}>
            <Link to='/'>
              <img src={logo} alt='Logo' />
            </Link>
          </div>
          <div className={cx("forgot-password-container__main")}>
            <div>
              <Link to="/login" className={cx("login__link")}>
                <BiArrowBack />
                <h3>Back to login</h3>
              </Link>
              <h1 className={cx("title")}>Reset Password</h1>
              <p className={cx("title-description")}>Your previous password has been reseted. Please set a new password for your account</p>
            </div>
            <div className={cx("form-container")}>
              <Form
                {...resetPasswordFormLayout}
                form={form}
                layout='vertical'
                name='reset_password_form'
                labelAlign='left'
                labelWrap='true'
                size='large'
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: 'New password is required!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder='Enter new password' />
                </Form.Item>
                <Form.Item
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  dependencies={['newPassword']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your new password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='Confirm new password' />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" className={cx("button")}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("wrapper__right")}>
        <ImageSlider slides={slides} parentWidth={600} />
      </div>
    </div>
  )
}

export default ResetPassword
