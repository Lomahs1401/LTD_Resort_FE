import React, { useEffect } from "react";
import styles from "./Favourites.module.scss";
import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import AuthUser from "../../utils/AuthUser";
import { useState } from "react";
import { Divider } from 'antd'
import BookingCard from "../../components/BookingCard/BookingCard";
import singleBedroom from "../../img/single-bedroom.jpg";
import spa from "../../img/spaMassage.png";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../utils/firebase'
import Loading from '../../components/Loading/Loading';

const cx = classNames.bind(styles);

function Favourites() {
  const { user } = AuthUser();

  const [toggleState, setToggleState] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Create a reference from a Google Cloud Storage URI
  const avatarRef = ref(storage, user.avatar);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    getDownloadURL(avatarRef).then(url => {
      setImageUrl(url);
      setLoading(true);
    })
  }, [avatarRef])

  if (!loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div>
        <Header userInfo={user} imageUrl={imageUrl} />
        <div className={cx("body")}>
          <h1>List Favourites</h1>
          <div className={cx("container")}>
            <div className={cx("bloc-tabs")}>
              <button
                className={
                  toggleState === 1
                    ? cx("tabs__active")
                    : cx("tabs")
                }
                onClick={() => toggleTab(1)}
              >
                <div>
                  <h4 className={cx("label-tabs")}>Room</h4>
                  <div>2 mark</div>
                </div>
              </button>

              <Divider className={cx("seperate-line")} type="vertical" />
  
              <button
                className={
                  toggleState === 2
                  ? cx("tabs__active")
                  : cx("tabs")
                }
                onClick={() => toggleTab(2)}
              >
                <div>
                  <h4 className={cx("label-tabs")}>Service</h4>
                  <div>2 mark</div>
                </div>
              </button>
            </div>
  
            <div className={cx("content-tabs")}>
              <div
                className={
                  toggleState === 1
                    ? cx("active-content")
                    : cx("content") 
                }
              >
                <BookingCard
                  image={singleBedroom}
                  title={"Single Bedroom - Superior Room"}
                  price={203000}
                  ranking={5}
                  type={"Room"}
                  capacity={1}
                  listRooms={50}
                  area={18}
                  totalReviews={54}
                />
                <BookingCard
                  image={singleBedroom}
                  title={"Single Bedroom - Superior Room"}
                  price={203000}
                  ranking={5}
                  type={"Room"}
                  capacity={1}
                  listRooms={50}
                  area={18}
                  totalReviews={54}
                />
                <BookingCard
                  image={singleBedroom}
                  title={"Single Bedroom - Superior Room"}
                  price={203000}
                  ranking={5}
                  type={"Room"}
                  capacity={1}
                  listRooms={50}
                  area={18}
                  totalReviews={54}
                />
                <BookingCard
                  image={singleBedroom}
                  title={"Single Bedroom - Superior Room"}
                  price={203000}
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
                    ? cx("active-content")
                    : cx("content")
                }
              >
                <BookingCard
                  image={spa}
                  title={"SPA - Massage"}
                  price={203000}
                  ranking={5}
                  type={"Service"}
                  capacity={1}
                  listRooms={50}
                  area={18}
                  totalReviews={54}
                />
                <BookingCard
                  image={spa}
                  title={"SPA - Massage"}
                  price={203000}
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
}

export default Favourites;
