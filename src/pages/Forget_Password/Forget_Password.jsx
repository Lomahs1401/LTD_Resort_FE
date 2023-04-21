import React from 'react'
import styles from './Forget_Password.module.scss'
import classNames from 'classnames/bind'
import anh_1 from '../../img/anh_1.png'
import anh_2 from '../../img/anh_2.png'
import anh_3 from '../../img/anh_3.png'
import facebook from '../../img/facebook.png'
import google from '../../img/google.png'
import logo from '../../img/logo.png'
import clsx from 'clsx'

const cx = classNames.bind(styles)

const Forget_Password = () => {
    return (
        <div>
            <div className={cx("forget-screen")}>
                <div className={cx("flex-col")}>
                    <div className={cx("frame-forget")}>
                        <div className={cx("logo")}>
                            <img src={logo}/>
                        </div>
                        <div className={cx("back")}>
                            <div className={cx("back_to_login")}>  back to login </div> 
                        </div>
                        <div className={cx("header")}>
                            <h1 className={cx("title")}>Forgot your password?</h1>
                            <p className={cx("title_1")}>Don’t worry, happens to all of us. Enter your email below to recover your password</p>

                        </div>
                        <div className={cx("body")}>
                            <div className={cx("body_input")}>
                                <div className={cx("text-field")}>                               
                                    <input type="text" className={cx("text-field-I")} placeholder="john.doe@gmail. com"/>
                                    <div className={cx("label-text")}>
                                        <div className={cx("x-text montserrat-normal-palm-green-14px")}>Email</div>
                                    </div>    
                                </div>                              
                                <button className={cx("summit")}>summit</button>
                                    {/* <div className={cx("other")}>
                                        <div className={cx("other__method")}>Or login with </div>
                                    </div> */}
                                
                            </div>
                        </div>
                        <dis className={cx("footer")}>
                            <div style={{display: 'flex' ,width: '100%' ,justifyContent: 'center'}}>
                                <p  style={{backgroundColor: 'white', color: 'black'}}>Or login with</p>
                            </div>
                            <div className={cx("footer__button")}>
                                <button>
                                    <img src={facebook} style={{width: '20%',borderRadius: '50%'}}/>
                                </button>
                                <button>
                                    <img src={google} style={{width: '20%',borderRadius: '50%'}}/>
                                </button>
                            </div>
                        
                        </dis>
                    </div>
                    
                </div>
                <div className={cx("image")}>
                    <div className={cx("carousel")}>
                        <ul className={cx("slides")}>
                        <input type="radio" name="radio-buttons" id="img-1" checked />
                        <li className={cx("slide-container")}>
                            <div className={cx("slide-image")}>
                                <img src={anh_1} style={{width: '50%'}}/>
                            </div>

                        </li>
                        <input type="radio" name="radio-buttons" id="img-2" />
                        <li className={cx("slide-container")}>
                            <div className={cx("slide-image")}>
                                <img src={anh_2} style={{width: '50%'}}/>
                            </div>

                        </li>
                        <input type="radio" name="radio-buttons" id="img-3" />
                        <li className={cx("slide-container")}>
                            <div className={cx("slide-image")}>
                                <img src={anh_3} style={{width: '50%'}}/>
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

export default Forget_Password