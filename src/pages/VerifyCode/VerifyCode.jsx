import React from 'react'
import styles from './VerifyCode.module.scss'
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

const VerifyCode = () => {

  const slides = [
    { url: carousel1, title: 'Carousel 1' },
    { url: carousel2, title: 'Carousel 2' },
    { url: carousel3, title: 'Carousel 3' },
  ]

  const { http } = AuthUser();

  const verifyCodeFormLayout = {
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
  console.log(email);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();

    formData.append('code', values.verifyCode);

    http.patch(`/auth/reset-verify-code/${email}`, formData)
      .then((resolve) => {
        console.log(resolve);
        const successMsg = resolve.data.message;
        Swal.fire(
          'Successfully Authenticated!',
          `${successMsg}`,
          'success'
        ).then(() => {
          navigate('/reset-password', { state: { email: email, code: values.verifyCode } });
        })
      })
      .catch((reject) => {
        console.log(reject);
        const errorMsg = reject.response.data.message;
        Swal.fire(
          'Error!',
          `${errorMsg}`,
          'error'
        )
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Please enter verify code', {
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
              <h1 className={cx("title")}>Verify Code</h1>
              <p className={cx("title-description")}>An authentication code has been sent to your email.</p>
            </div>
            <div className={cx("form-container")}>
              <Form
                {...verifyCodeFormLayout}
                form={form}
                layout='vertical'
                name='verify_code_form'
                labelAlign='left'
                labelWrap='true'
                size='large'
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Verify Code"
                  name="verifyCode"
                  rules={[
                    {
                      required: true,
                      message: 'Verify code is required!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
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

export default VerifyCode
