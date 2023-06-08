import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageGallery.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ImageGallery = ({ images , onClosePopup ,isShow  , setIsShow}) => {

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [imageList, setImageList] = useState(images);
  const popupRef = useRef(null);
  const popupRef1 = useRef(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    setShowPopup(true);

  };

  const handleClose = (e) => {
    if (e.target === popupRef?.current || e.target === popupRef1?.current) {
      setShowPopup(false);
      onClosePopup(imageList);
      setIsShow(false);
    }
  };

  const handleAdd = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setImageList((prevImages) => prevImages.filter((image) => image !== selectedImage));
    setSelectedImage(imageList[0]);
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newImage = reader.result;
      setImageList((prevImages) => [...prevImages, newImage]);
      setSelectedImage(newImage);
    };
    reader.readAsDataURL(file);
  };



  return (
    <div>
      {/* <button onClick={handleButtonClick}>Open Popup</button> */}

      {isShow && (
        <div
          className={cx("popup-container")}
          ref={popupRef}
          onClick={handleClose}
        >
          <div
            className={cx("popup-content")}
            ref={popupRef1}
            onClick={handleClose}
          >
            <div className={cx("image-container")}>
              <img src={selectedImage} alt="Large Image" />
              <div className={cx("custom-button")}>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
            <div className={cx("thumbnail-popup-container")}>
              {imageList.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(image)}
                  className={selectedImage === image ? cx("active") : cx("")}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for selecting images */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageGallery;