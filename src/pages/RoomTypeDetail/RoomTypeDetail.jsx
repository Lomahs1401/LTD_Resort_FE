import React, { useState } from "react";
import styles from "./RoomTypeDetail.module.scss";
import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Comment from "../../components/Comment/Comment";
import AuthUser from "../../utils/AuthUser";
import { Rate, Divider, Pagination } from "antd";
import { BsFillHeartFill, BsFillShareFill, BsWifi } from "react-icons/bs";
import {
  IoSparkles,
  IoRestaurant,
  IoCafe,
  IoPersonSharp,
  IoBedSharp,
} from "react-icons/io5";
import { FaSwimmingPool, FaConciergeBell } from "react-icons/fa";
import { BiSpa, BiDrink } from "react-icons/bi";
import { IoIosFitness } from "react-icons/io";
import { GiAchievement } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import img1 from "../../img/overviewRoom1.png";
import img2 from "../../img/overviewRoom2.png";
import img3 from "../../img/overviewRoom3.png";
import img4 from "../../img/overviewRoom4.png";
import img5 from "../../img/overviewRoom5.png";
import img6 from "../../img/overviewService1.png";
import img7 from "../../img/overviewService2.png";
import img8 from "../../img/overviewService3.png";
import img9 from "../../img/overviewService4.png";
import img10 from "../../img/overviewService5.png";

const cx = classNames.bind(styles);

export const RoomTypeDetail = () => {
  const { user } = AuthUser();

  function showImage(image) {
    // document.getElementById('mainImage').src = image;
    const mainimg = document.getElementById("mainImage");
    if (mainimg) {
      mainimg.src = image;
    }

    // console.log("showImage called with", image, number);
  }
  function showPopup(imageSrc) {
    // Tạo một phần tử <div> mới để chứa cửa sổ popup
    const popupDiv = document.createElement("div");
    popupDiv.classList.add("popup");

    // Tạo một phần tử <img> mới với nguồn là ảnh được chọn
    const popupImg = document.createElement("img");
    popupImg.src = imageSrc;

    // Thêm phần tử <img> vào phần tử <div> popup
    popupDiv.appendChild(popupImg);

    // Thêm phần tử <div> popup vào thân của trang web
    document.body.appendChild(popupDiv);
  }

  return (
    <div>
      <Header userInfo={user} />

      <div className={cx("room-content")}>
        <div className={cx("room-info")}>
          <div className={cx("left")}>
            <h2>Single Bedroom - Superior Room</h2>
            <div className={cx("achievement")}>
              <div>
                <Rate disabled defaultValue={5} style={{ color: "#FF8682" }} />5
                Star Hotel
              </div>
              <div style={{ display: "flex" }}>
                <GiAchievement size={25} style={{ color: "#FFD700	" }} />
                star
              </div>
            </div>
            <div className={cx("space")}>
              <IoPersonSharp />
              1 persons
              <IoBedSharp />
              50 rooms
              <RxDimensions />
              18 m2
            </div>
          </div>
          
        </div>
        <Divider style={{ background: "#112211" }} />
        <div  className={cx("use")}>
          <div className={cx("image")}>
            <div>
              <img id="mainImage" src={img1} />
            </div>
            <div className={cx("holder")}>
              <img src={img1} title="Item 1" onClick={() => showImage(img1)} />

              <img src={img2} title="Item 2" onClick={() => showImage(img2)} />

              <img src={img3} title="Item 3" onClick={() => showImage(img3)} />

              <img src={img4} title="Item 4" onClick={() => showImage(img4)} />

              <img src={img5} title="Item 5" onClick={() => showImage(img5)} />

              <img src={img6} title="Item 6" onClick={() => showImage(img6)} />

              <img src={img7} title="Item 7" onClick={() => showImage(img7)} />

              <img src={img8} title="Item 8" onClick={() => showImage(img8)} />

              <img src={img9} title="Item 9" onClick={() => showImage(img9)} />

              <img
                src={img10}
                title="Item 10"
                onClick={() => showImage(img10)}
              />
            </div>
          </div>


          <div className={cx("overview")}>
            <h1>overview</h1>
            Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park
            Bosphorus Hotel Istanbul has risen from the ashes of the historic
            Park Hotel, which also served as Foreign Affairs Palace 120 years
            ago and is hosting its guests by assuming this hospitality mission.
            With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness
            area, 18 meeting rooms including 4 dividable ones and 3 terraces
            with Bosphorus view, Istanbuls largest terrace with Bosphorus view
            (4500 m2) and latest technology infrastructure, CVK Park Bosphorus
            Hotel Istanbul is destined to be the popular attraction point of the
            city. Room and suite categories at various sizes with city and
            Bosphorus view, as well as 68 separate luxury suites, are offered to
            its special guests as a wide variety of selection.
            <div className={cx("strength")}>
              <div className={cx("box__special")}>
                <h3>4.2</h3>
                <div>
                  <h4>very good</h4>
                  371 reviews
                </div>
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Near beach
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Near mall
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Amusement Parks
              </div>
              <div className={cx("box")}>
                <IoSparkles size={20} />
                Clean Room
              </div>
            </div>
            <div className={cx("right")}>
            Price from
            <h3 style={{ color: "#FF8682" }}>203.000 VND/Night</h3>
            <div className={cx("button")}>
              <div className={cx("button__left")}>
                <button>
                  <BsFillHeartFill />
                </button>
                <button>
                  <BsFillShareFill />
                </button>
              </div>
              <div className={cx("button__right")}>
                <button>book now</button>
              </div>
            </div>
          </div>
          </div>
        </div>

        <Divider style={{ background: "#112211" }} />

        <div className={cx("checking")}>
          <h1>Check-in time/Check-out time</h1>
          <div className={cx("time")}>
            <div className={cx("checkingtime")}>
              <div>Check-in time</div>
              <div>Check-out time</div>
            </div>
            <div className={cx("checkingtime")}>
              <h4>from 2:00 pm</h4>
              <h4>before 12.00 am</h4>
            </div>
          </div>
        </div>
        <div className={cx("amenities")}>
          <h2>Amenities</h2>
          <div className={cx("amenities-attributes")}>
            <div className={cx("amenities-attributes__icons")}>
              <div className={cx("amenities-attributes__icons-one")}>
                <FaSwimmingPool size={20} />
                Outdoor pool
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <FaSwimmingPool size={20} />
                Indoor pool
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <BiSpa size={20} />
                Spa and wellness center
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <IoRestaurant size={20} />
                Restaurant
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <FaConciergeBell size={20} />
                Room service
              </div>
            </div>
            <div>
              <div className={cx("amenities-attributes__icons-one")}>
                <IoIosFitness size={20} />
                Fitness center
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <BiDrink size={20} />
                Bar/Lounge
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <BsWifi size={20} />
                Free Wi-Fi
              </div>
              <div className={cx("amenities-attributes__icons-one")}>
                <IoCafe size={20} />
                Tea/coffee machine
              </div>
              <div
                className={cx("amenities-attributes__icons-one")}
                style={{ color: "orange" }}
              >
                +24 more
              </div>
            </div>
          </div>
        </div>
        <div className={cx("review")}>
          <h2>Review</h2>
          <div className={cx("score")}>
            <h3>4.3</h3>
            <div className={cx("summary")}>
              <h4>Very good</h4>
              371 verified reviews
            </div>
          </div>
        </div>
        <div className={cx("comment")}>
          <Comment />
          <Divider style={{ background: "#112211" }} />
          <Comment />
          <Divider style={{ background: "#112211" }} />
          <Comment />
          <Divider style={{ background: "#112211" }} />
          <Comment />
          <Divider style={{ background: "#112211" }} />
          <Comment />
          <div className="pagination">
            <Pagination defaultCurrent={1} total={12} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default RoomTypeDetail;
