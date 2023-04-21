import React from 'react'
import styles from './Veriflie.module.scss'
import classNames from 'classnames/bind'
import anh_1 from '../../img/anh_1.png'
import anh_2 from '../../img/anh_2.png'
import anh_3 from '../../img/anh_3.png'
import facebook from '../../img/facebook.png'
import google from '../../img/google.png'
import logo from '../../img/logo.png'
import clsx from 'clsx'

const cx = classNames.bind(styles)

const Veriflie = () => {
    return (
        <div>
            <div className={cx("Veriflie-screen")}>
                <div className={cx("flex-col")}>
                    <div className={cx("frame-Veriflie")}>
                        <div className={cx("back")}>
                            <div className={cx("back-to-login")}>back to login </div>
                        </div>
                        <div className={cx("header")}>
                            <hl className={cx("title")}>Verify code</hl>
                            <p className={cx("title_1")}>An authentication code has been sent to your email.</p>

                        </div>
                        <div className={cx("body")}>
                            <div className={cx("body_input")}>
                                <div className={cx("text-field")}>
                                    
                                    <input type="password" className={cx("text-field-I")} placeholder="1AE2S"/>
                                        
                                    <div className={cx("label-text")}>
                                         <div className={cx("x-text montserrat-normal-palm-green-14px")}>CODE</div>      
                                    </div>
                                </div>
                                <div className={cx("confirm")}>
                                    <div className={cx("resend")}>resend code</div>
                                </div>
                                <button className={cx("summit")}>summit</button>
                                
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

export default Veriflie