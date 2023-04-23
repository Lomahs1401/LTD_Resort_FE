import React from 'react'
import styles from './Customer_info.module.scss'
import classNames from 'classnames/bind'
import {EditOutlined  } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Customer_info(props)  {
    //
  return (
    <div>
      <h1 className={cx("header")}> Account </h1>
      <div className={cx("Account_form")}>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Name</div>
                <div className={cx("content-text")}>Duc</div> 
            </div>
            <button className={cx("button-change")}>
                <EditOutlined />

                <div className={cx("change")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Gender</div>
                <div className={cx("content-text")}>Nữ</div> 
            </div>
            
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Email</div>
                <div className={cx("content-text")}>john.doe@gmail.com</div> 
            </div>
            <button className={cx("button-change")}>
                <EditOutlined />

                <div className={cx("change")}>
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
                <EditOutlined />

                <div className={cx("change")}>
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
                <EditOutlined />

                <div className={cx("change")}>
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
                <EditOutlined />

                <div className={cx("change")}>
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
                <EditOutlined />

                <div className={cx("change")}>
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
                <EditOutlined />

                <div className={cx("change")}>
                    change
                </div>
            </button>
        </div>
        <div className={cx("frame-text")}>
            <div className={cx("frame-1")}>
                <div className={cx("title-text")}>Ranking point</div>
                <div className={cx("content-text")}>15000</div> 
            </div>
            
            <FontAwesomeIcon icon={faGem}  style={{height:"50px"}}/>               
             {/* <i className={cx("fa fa-diamnpm i --save @fortawesome/fontawesome-svg-coreond")} aria-hidden="true" style={{color: 'palevioletred',fontSize: '50px'}}></i> */}
            
        </div>
    </div>


    </div>
    
  )
}

export default Customer_info