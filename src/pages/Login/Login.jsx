import React from 'react'
import styles from './Login.module.scss'
import classNames from "classnames/bind";
import logo from '../../img/logo.png'
import facebookIcon from '../../img/facebook.png'
import googleIcon from '../../img/google.png'
import { Form, Button, Checkbox, Input, Divider } from 'antd'
import ImageSlider from '../../components/ImageSlider/ImageSlider';

const cx = classNames.bind(styles);

const slides = [
  {url: 'http://localhost:3000/img/carousel1.jpg', title: 'Carousel 1'},
  {url: 'http://localhost:3000/img/carousel2.jpg', title: 'Carousel 2'},
  {url: 'http://localhost:3000/img/carousel3.jpg', title: 'Carousel 3'},
]

const Login = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={cx("wrapper")}>
        <div className={cx("wrapper__left")}>
          <div className={cx("login-container")}>
            <div className={cx("login-container__logo")}>
              <img src={logo} alt='Logo' />
            </div>
            <div className={cx("login-container__main")}>
              <div>
                <h1 className={cx("title")}>Login</h1>
                <p className={cx("title-description")}>Login to access your LTD account</p>
              </div>
              <div>
                <Form
                  layout='vertical'
                  name='login_form'
                  labelAlign='left'
                  labelWrap='true'
                  labelCol={{
                    span: 6,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  size='large'
                  initialValues={{
                    remember: true,
                  }}
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
                    ]}
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
                  >
                    <Input.Password 
                      placeholder='******'
                    />
                  </Form.Item>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      span: 24,
                    }}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <p className={cx("forgot__password")}>
                      <a href='/' className={cx("forgot__password__link")}>Forgot Password</a>
                    </p>
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className={cx("button")}>
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className={cx("signup")}>
                <div className={cx("signup__title")}>Don't have account?</div>
                <div>
                  <a href="/" className={cx("signup__link")}>Sign up</a>  
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
                  <Button className={cx("social-media__button")}>
                    <img src={facebookIcon} className={cx("social-media__icon")} alt='facebook icon' />
                  </Button>
                </a>
                <a href="/" className={cx("social-media__link")}>
                  <Button className={cx("social-media__button")}>
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
      </div>
    )
  }

export default Login
