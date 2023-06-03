import React from 'react'
import styles from './BookingProgress.module.scss'
import classNames from "classnames/bind";
import { useSelector } from 'react-redux';
import { avatarSelector, progressStepSelector } from '../../redux/selectors';
import AuthUser from '../../utils/AuthUser';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import { Steps } from 'antd';
import { useState } from 'react';
import Step2 from '../BookingStep/Step2/Step2';
import Step3 from '../BookingStep/Step3/Step3';
import { BiArrowBack } from 'react-icons/bi'
import { BsFillCalendarCheckFill } from 'react-icons/bs'
import { MdPayment } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

const BookingProgress = () => {
  
  const { roomTypeId } = useParams(); 
  const { user } = AuthUser();
  const avatar = useSelector(avatarSelector);
  const [current, setCurrent] = useState(useSelector(progressStepSelector));
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepCompletion = () => {
    if (!completedSteps.includes(current)) {
      setCompletedSteps([...completedSteps, current]); // Thêm chỉ số của step hiện tại vào danh sách bước đã hoàn thành
    }
  };

  const items = [
    {
      title: 'Step 1',
      subTitle: 'Confirm Information',
      content: <Step2 />,
      icon: <BsFillCalendarCheckFill />,
    },
    {
      title: 'Step 2',
      subTitle: 'Payment',
      content: <Step3 />,
      icon: <MdPayment />,
    },
  ]

  const onChange = (value) => {
    setCurrent(value);
  };

  return (
    <div className={cx("booking-room-wrapper")}>
      <Header active='Find Rooms' userInfo={user} imageUrl={avatar} />
      <div className={cx("booking-steps")}>
        <Link
          to={`/find-rooms/${roomTypeId}`}
          className={cx("link-back")}
        >
          <BiArrowBack />
          Back
        </Link>
        <Steps
          current={current}
          items={items.map((item, index) => ({
            ...item,
            disabled: index !== current, // Chỉ disable các step item khác với step hiện tại
          }))}
          type="navigation"
          direction='horizontal'
          onChange={onChange}
        />
        <div className={cx("content")}>{items[current].content}</div>
      </div>
      <Footer />
    </div>
  )
}

export default BookingProgress