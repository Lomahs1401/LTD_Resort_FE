import React from 'react'
import styles from './Set_Password.module.scss'
import classNames from 'classnames/bind'
import anh_1 from '../../img/anh_1.png'
import anh_2 from '../../img/anh_2.png'
import anh_3 from '../../img/anh_3.png'
import facebook from '../../img/facebook.png'
import google from '../../img/google.png'
import logo from '../../img/logo.png'
import clsx from 'clsx'

const cx = classNames.bind(styles)


const Set_Password = () => {
    return (
        <div>
            <div className={cx("set-screen")}>
                <div className={cx("flex-col")}>
                    <div className={cx("frame-set-password")}>

                        <div className={cx("header")}>
                            <hl className={cx("title")}>Set a password</hl>
                            <p className={cx("title_1")}>Your previous password has been reseted. Please set a new password for your account.</p>

                        </div>
                        <div className={cx("frame-noi-dung")}>
                            <div className={cx("frame-259")}>
                                <div className={cx("text-field")}>
                                    
                                    <input type="password" className={cx("text-field-I")} placeholder="ABCDHSHS"/>
                                    
                                    <div className={cx("label-text")}>
                                        <div className={cx("x-text montserrat-normal-palm-green-14px")}>Create Password</div>


                                    </div>


                                </div>
                                <div className={cx("text-field")}>
                                    
                                    <input type="password" className={cx("text-field-I")} placeholder="ABCDHSHS"/>
                                    
                                    <div className={cx("label-text")}>
                                        <div className={cx("x-text montserrat-normal-palm-green-14px")}>Re-enter Password</div>


                                    </div>


                                </div>
                                
                                <button className={cx("login-option")}>Set password</button>
                                    
                                

                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={cx("image")}>
                    <div className={cx("carousel")}>
                        <ul className={cx("slides")}>
                        <input type="radio" name="radio-buttons" id="img-1" checked />
                        <li className={cx("slide-container")}>
                            <div className={cx("slide-image")}>
                                <img src={anh_1}  style={{width: '50%'}} />
                            </div>
                        </li>
                        <input type="radio" name="radio-buttons" id="img-2" />
                        <li className={cx("slide-container")}>
                            <div className={cx("slide-image")}>
                                <img src={anh_2}style={{width: '50%'}} />
                            </div>
                        </li>
                        <input type="radio" name="radio-buttons" id="img-3" />
                        <li className={cx("slide-container")}>
                            <div className={cx("slide-image")}>
                                <img src={anh_3} style={{width: '50%'}} />
                            </div>
                        </li>
                            <div className={cx("carousel-dots")}>
                                <label for="img-1" className={cx("carousel-dot")} id="img-dot-1"></label>
                                <label for="img-2" className={cx("carousel-dot")} id="img-dot-2"></label>
                                <label for="img-3" className={cx("carousel-dot")} id="img-dot-3"></label>
                            </div>
                        </ul>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default Set_Password