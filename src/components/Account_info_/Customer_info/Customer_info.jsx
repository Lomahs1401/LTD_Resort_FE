import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Customer_info.module.scss'
import classNames from 'classnames/bind'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

const Customer_info = () => {
  return (
    <div>
      
      <div className={cx("Account_form")}>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Name</div>
                <div className={cx("content-text")}>Duc</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Gender</div>
                <div className={cx("content-text")}>Nữ</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Email</div>
                <div className={cx("content-text")}>john.doe@gmail.com</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Name</div>
                <div className={cx("content-text")}>Duc</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Password</div>
                <div className={cx("content-text")}>************</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Phone number</div>
                <div className={cx("content-text")}>+1 000-000-0000</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Address</div>
                <div className={cx("content-text")}>St 32 main downtown, Los Angeles, California, USA</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Date of birth</div>
                <div className={cx("content-text")}>01-01-1992</div> 
            </div>
            <button className={cx("button-change")}>
                <div className={cx("change-icon")}>
                    <img src="./photo/vecteezy_flat-icon-of-cyclic-rotation-recycling-recurrence-renewal_.jpg" className={cx("change-icon")}/>
                </div>
                <div className={cx("style-frame")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Ranking point</div>
                <div className={cx("content-text")}>15000</div> 
            </div>
            <div className={cx("rank")}>
                <i className={cx("fa fa-diamond")} aria-hidden="true" style={{color: 'palevioletred',fontSize: '50px'}}></i>
            </div>
        </div>
    </div>


    </div>
    
  )
}

export default Customer_info