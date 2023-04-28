import React from "react";
import styles from "./Favourites.module.scss";
import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import AuthUser from "../../AuthUser";
import { useState } from "react";
import { Divider } from 'antd'
import BookingCard from "../../components/BookingCard/BookingCard";
import singleBedroom from "../../img/single-bedroom.jpg";
import spa from "../../img/spaMassage.png";
const cx = classNames.bind(styles);

function Favourites() {
  const { user } = AuthUser();

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <Header userInfo={user} />
      <div className={cx("body")}>
        <h1>Favourites </h1>
        <div className={cx("container")}>
          <div className={cx("bloc-tabs")}>
            <button
              className={
                toggleState === 1
                  ? `${cx("tabs")} ${cx("active-tabs")}`
                  : cx("tabs")
              }
              onClick={() => toggleTab(1)}
            >
              <div>
                <h4 className={cx("label-tabs")}>Room</h4>
                <div> 2 mark </div>
              </div>
            </button>
            <Divider className={cx("seperate-line")} type="vertical" />

            <button
              className={
                toggleState === 2
                  ? `${cx("tabs")} ${cx("active-tabs")}`
                  : cx("tabs")
              }
              onClick={() => toggleTab(2)}
            >
              <div>
                <h4 className={cx("label-tabs")}>Service</h4>
                <div> 2 mark </div>
              </div>
            </button>
          </div>

          <div className={cx("content-tabs")}>
            <div
              className={
                toggleState === 1
                  ? `${cx("content")} ${cx("active-content")}`
                  : cx("content")
              }
            >
              <h2>Room</h2>
              <BookingCard
                image={singleBedroom}
                bedroomType={"Single Bedroom"}
                roomType={"Superior Room"}
                price={"203.000"}
                ranking={5}
                type={"Room"}
                capacity={1}
                listRooms={50}
                area={18}
                totalReviews={54}
              />
              <BookingCard
                image={singleBedroom}
                bedroomType={"Single Bedroom"}
                roomType={"Superior Room"}
                price={"203.000"}
                ranking={5}
                type={"Room"}
                capacity={1}
                listRooms={50}
                area={18}
                totalReviews={54}
              />
              <BookingCard
                image={singleBedroom}
                bedroomType={"Single Bedroom"}
                roomType={"Superior Room"}
                price={"203.000"}
                ranking={5}
                type={"Room"}
                capacity={1}
                listRooms={50}
                area={18}
                totalReviews={54}
              />
              <BookingCard
                image={singleBedroom}
                bedroomType={"Single Bedroom"}
                roomType={"Superior Room"}
                price={"203.000"}
                ranking={5}
                type={"Room"}
                capacity={1}
                listRooms={50}
                area={18}
                totalReviews={54}
              />
            </div>

            <div
              className={
                toggleState === 2
                  ? `${cx("content")} ${cx("active-content")}`
                  : cx("content")
              }
            >
              <h2>Service</h2>
              <BookingCard
                image={spa}
                service={"SPA - Massage"}
                price={"203.000"}
                ranking={5}
                type={"Service"}
                capacity={1}
                listRooms={50}
                area={18}
                totalReviews={54}
                styleW={{ gap: "90px" }}
              />
              <BookingCard
                image={spa}
                service={"SPA - Massage"}
                price={"203.000"}
                ranking={5}
                type={"Service"}
                capacity={1}
                listRooms={50}
                area={18}
                totalReviews={54}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Favourites;
