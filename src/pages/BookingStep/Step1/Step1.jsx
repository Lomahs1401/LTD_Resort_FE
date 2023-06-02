import React, { useState } from 'react'
import styles from './Step1.module.scss'
import classNames from "classnames/bind";
import { addDays, format } from "date-fns"
import { Select } from 'antd';
import ReactDefinedRange from '../../../components/ReactDefinedRange/ReactDefinedRange';
import ReactDateRange from '../../../components/ReactDateRange/ReactDateRange';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const cx = classNames.bind(styles);

const nameMapper = {
  ar: 'Arabic',
  bg: 'Bulgarian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  enGB: 'English (United Kingdom)',
  enUS: 'English (United States)',
  eo: 'Esperanto',
  es: 'Spanish',
  et: 'Estonian',
  faIR: 'Persian',
  fi: 'Finnish',
  fil: 'Filipino',
  fr: 'French',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  ko: 'Korean',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mk: 'Macedonian',
  nb: 'Norwegian Bokmål',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sr: 'Serbian',
  sv: 'Swedish',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  vi: 'Vietnamese',
  zhCN: 'Chinese Simplified',
  zhTW: 'Chinese Traditional'
};

const Step1 = ({ itemsLength, current, setCurrent, handleStepCompletion }) => {

  const [locale, setLocale] = useState('enUS');

  const [rangeDate, setRangeDate] = useState([{
    startDate: new Date(),
    endDate: addDays(new Date(), 1), 
    key: "selection"
  }]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setLocale(value);
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const options = Object.entries(nameMapper).map(([value, label]) => ({ value, label }));

  const next = () => {
    if (current === itemsLength - 1) {
      return; // Nếu đang ở step cuối cùng, không thực hiện gì
    }
    setCurrent(current + 1);
  };

  const handleBooking = () => {
    handleStepCompletion();
    next();
  }

  return (
    <div className={cx("booking-step-wrapper")}>
      <h1>Choose a booking period</h1>
      <div className={cx("locale-date-range")}>
        <Select
          showSearch
          placeholder="Select language"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          style={{width: 200}}
          options={options}
          onChange={onChange}
          onSearch={onSearch}
        />
      </div>
      <div className={cx("date-range-wrapper")}>
        <div className={cx("date-range-wrapper__left")}>
          <ReactDefinedRange rangeDate={rangeDate} setRangeDate={setRangeDate} />
          <ReactDateRange locale={locale} rangeDate={rangeDate} setRangeDate={setRangeDate} />
        </div>
        <div className={cx("date-range-wrapper__right")}>
          <div className={cx("checkin-time")}>
            <h1>Checkin Date</h1>
            <h3>
              Start Date: {format(rangeDate[0].startDate, "dd/MM/yyyy")}
            </h3>
          </div>
          <div className={cx("checkout-time")}>
            <h1>Checkout Date</h1>
            <h3>
              End Date: {format(rangeDate[0].endDate, "dd/MM/yyyy")}
            </h3>
          </div>
          <div className={cx("booking")}>
            <button 
              className={cx("btn-booking")}
              onClick={handleBooking}
            >
              <p>Booking</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1