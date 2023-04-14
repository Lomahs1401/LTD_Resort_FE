import React, { useState } from 'react'
import styles from './Login.module.scss'
import classNames from "classnames/bind";
import logo from '../../img/logo.png'
import facebookIcon from '../../img/facebook.png'
import googleIcon from '../../img/google.png'
import gif_cat from '../../img/cat.gif'
import { Form, Button, Checkbox, Input, Divider, Modal, message } from 'antd'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {

  const slides = [
    { url: 'http://localhost:3000/img/carousel1.jpg', title: 'Carousel 1' },
    { url: 'http://localhost:3000/img/carousel2.jpg', title: 'Carousel 2' },
    { url: 'http://localhost:3000/img/carousel3.jpg', title: 'Carousel 3' },
  ]

  const loginFormLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log('Success:', values);
    message.success('Login successful!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Login failed');
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__left")}>
        <div className={cx("login-container")}>
          <div className={cx("login-container__logo")}>
            <Link to='/'>
              <img src={logo} alt='Logo' />
            </Link>
          </div>
          <div className={cx("login-container__main")}>
            <div>
              <h1 className={cx("title")}>Login</h1>
              <p className={cx("title-description")}>Login to access your LTD account</p>
            </div>
            <div className={cx("form-container")}>
              <Form
                {...loginFormLayout}
                form={form}
                layout='vertical'
                name='login_form'
                labelAlign='left'
                labelWrap='true'
                size='large'
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  remember: true,
                }}
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
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Password is required!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder='******'
                  />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    span: 12,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <p className={cx("forgot__password")}>
                  <Link to="/forgot_password" className={cx("forgot__password__link")}>
                    Forgot Password
                  </Link>
                </p>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" className={cx("button")}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={cx("signup")}>
              <div className={cx("signup__title")}>Don't have an account yet?</div>
              <div>
                <Link to="/register" className={cx("signup__link")}>
                  Sign up here
                </Link>
              </div>
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
        <ImageSlider slides={slides} />
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

export default Login
