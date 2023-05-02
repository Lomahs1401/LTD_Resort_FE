import React from "react";
import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import avatar from "../../img/testimonial1.png";
import { BsFlagFill } from "react-icons/bs";
import { Divider } from "antd";
const cx = classNames.bind(styles);

const Comment = (imageUrl) => {
  return (
    <div className={cx("comment")}>
      <div className={cx("avatar")}>
        <img src={imageUrl} alt="Avatar" />
      </div>
      <div className={cx("content")}>
        <div className={cx("score")}>
          <h4>5.0 Amazing</h4>
          <Divider
            type="vertical"
            style={{ background: "black", height: "auto" }}
          />
          <div>Omar Siphron</div>
        </div>
        <div className={cx("thecomment")}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        
      </div>
      <button className={cx("report")}>
          <BsFlagFill />
      </button>
    </div>
  );
};

export default Comment;
