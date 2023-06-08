import React, { useState, useRef } from "react";
import styles from "./ImageGallery.module.scss";
import classNames from "classnames/bind";
import { Modal } from "antd";
import Draggable from "react-draggable";

const cx = classNames.bind(styles);

function ImageGallery({ images = null, onChangeImages }) {
  const [imageList, setImageList] = useState(images || []); // Danh sách các đường dẫn ảnh
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [showPopup, setShowPopup] = useState(false);

  const noImageMessage = "Hết ảnh"; // Thông báo khi hết ảnh
  const popupRef = useRef(null);
  const popupRef1 = useRef(null);
  const fileInputRef = useRef(null);

  const handleDelete = () => {
    const currentIndex = imageList.findIndex(
      (image) => image === selectedImage
    );
    if (currentIndex !== -1) {
      const newImageList = [...imageList];
      newImageList.splice(currentIndex, 1);
      setImageList(newImageList);
      if (newImageList.length === 0) {
        setSelectedImage("");
      } else if (currentIndex === 0) {
        setSelectedImage(newImageList[0]);
      } else {
        setSelectedImage(newImageList[currentIndex - 1]);
      }
      if (onChangeImages) {
        onChangeImages(newImageList);
      }
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = (e) => {
    if (e.target === popupRef.current || e.target === popupRef1.current) {
      setShowPopup(false);
    }
  };

  const handlePrevious = () => {
    const currentIndex = imageList.indexOf(selectedImage);
    const previousIndex =
      currentIndex === 0 ? imageList.length - 1 : currentIndex - 1;
    setSelectedImage(imageList[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex = imageList.indexOf(selectedImage);
    const nextIndex =
      currentIndex === imageList.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(imageList[nextIndex]);
  };
  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newImage = reader.result;
      const newImageList = [...imageList, newImage];
      setImageList(newImageList);
      setSelectedImage(newImage);

      if (onChangeImages) {
        onChangeImages(newImageList);
      }
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------      Modal Draggable      ---------------------------
  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [disabledCreate, setdisabledCreate] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <div>
      {selectedImage && (
        <div className={cx("image-grid")}>
          <button onClick={handlePrevious} className={cx("navigation-button")}>
            &lt;
          </button>
          <div className={cx("image-container")}>
            <img src={selectedImage} alt="Large Image" onClick={showModal} />
            <div className={cx("custom-button")}>
              <button onClick={handleDelete}>Xoá</button>
            </div>
          </div>
          <button onClick={handleNext} className={cx("navigation-button")}>
            &gt;
          </button>
        </div>
      )}
      <button onClick={handleUpload}>Upload</button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        zIndex={100000}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div
          className={cx("popup-content")}
          ref={popupRef1}
          onClick={handleClose}
        >
          <div className={cx("image-container")}>
            <img src={selectedImage} alt="Large Image" />
            <div className={cx("custom-button")}></div>
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
      </Modal>

      {imageList.length === 0 && <div>{noImageMessage}</div>}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageGallery;
