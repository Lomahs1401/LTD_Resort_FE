import React, { useState } from 'react'
import styles from './ForgotPassword.module.scss'
import classNames from "classnames/bind";
import logo from '../../img/logo.png'
import facebookIcon from '../../img/facebook.png'
import googleIcon from '../../img/google.png'
import gif_cat from '../../img/cat.gif'
import carousel1 from '../../img/carousel1.png'
import carousel2 from '../../img/carousel2.png'
import carousel3 from '../../img/carousel3.png'
import { Form, Button, Input, Divider, Modal } from 'antd'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthUser from '../../utils/AuthUser';

const cx = classNames.bind(styles);

const ForgorPassword = () => {

  const slides = [
    { url: carousel1, title: 'Carousel 1' },
    { url: carousel2, title: 'Carousel 2' },
    { url: carousel3, title: 'Carousel 3' },
  ]

  const EMAIL_INVALID_STATUS_CODE = 400;
  const EMAIL_NOT_FOUND = 404;

  const { http } = AuthUser();

  const forgotPasswormFormLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginBySocial = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();

    formData.append('email', values.email);

    http.patch('/auth/reset-password/request', formData)
      .then((resolve) => {
        console.log(resolve);
        navigate('/verify-code', { state: { email: values.email } });
      })
      .catch((reject) => {
        console.log(reject);
        const errorCode = reject.response.status;
        const errorMsg = reject.response.data.message;

        if (errorCode === EMAIL_INVALID_STATUS_CODE) {
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
        } else if (errorCode === EMAIL_NOT_FOUND) {
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
        }
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Please enter your email', {
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
              <h1 className={cx("title")}>Forgot Your Password?</h1>
              <p className={cx("title-description")}>Don't worry, happens to all of us. Enter your email below to recover your password.</p>
            </div>
            <div className={cx("form-container")}>
              <Form
                {...forgotPasswormFormLayout}
                form={form}
                layout='vertical'
                name='forgot_password_form'
                labelAlign='left'
                labelWrap='true'
                size='large'
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Email is required!',
                    },
                    {
                      type: 'email',
                      message: 'Invalid email address!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder='john.doe@gmail.com'
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" className={cx("button")}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <Divider
              plain
              orientation='center'
              className={cx("seperate-line")}
            >
              Or login with
            </Divider>
            <div className={cx("social-media")}>
              <a href="/" className={cx("social-media__link")}>
                <Button 
                  className={cx("social-media__button")}
                  onClick={(e) => handleLoginBySocial(e)}
                >
                  <img src={facebookIcon} className={cx("social-media__icon")} alt='facebook icon' />
                </Button>
              </a>
              <a href="/" className={cx("social-media__link")}>
                <Button 
                  className={cx("social-media__button")}
                  onClick={(e) => handleLoginBySocial(e)}
                >
                  <img src={googleIcon} className={cx("social-media__icon")} alt='google icon' />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("wrapper__right")}>
        <ImageSlider slides={slides} parentWidth={600} />
      </div>
      <Modal
        title="Tính năng đang phát triển"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" key="back" onClick={handleOk}>OK</Button>,
        ]}
      >
        <div className={cx("wrapper__modal")}>
            <h1 style={{textAlign: 'center'}}>Chúng tôi sẽ sớm hoàn thành tính năng này (◍•ᴗ•◍)♡ ✧*</h1>
            <img src={gif_cat} alt="Cat meowwing" width={80} />
        </div>
      </Modal>
    </div>
  )
}

export default ForgorPassword
