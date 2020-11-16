import React, { useState, useContext, useEffect } from "react";
import ImgDropZone from "./ImgDropZone";
import ImgCropper from "./ImgCropper";
import ImgDisplay from "./ImgDisplay";
import ImgDropAndCropContext from "./Store/ImgDropAndCropContext";
import PostItemContext from "../../View/PostItem/store/context";
import useLocalStorage from "../../Utils/useLocalStorage";

/**
 * Image Drop And Crop Component
 * Author: Yulong
 * Description: Drop and crop the image using ImgDropzone, ImgCropper, and display as image thumbnails
 */

export default function ImgDropAndCrop(props) {
  const [files, setFiles] = useState([]);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [currentCrop, setCurrentCrop] = useState(null);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [counter, setCounter] = useState(0);
  const [inputDisable, setInputDisable] = useState(false);

  const { croppedImages, setCroppedImages } = useContext(PostItemContext);

  // Dynamically use localstorage
  const localStorageVar = () => {
    return props.type === "cover" ? "savedCoverPhoto" : "savedSkillPhoto";
  };

  // Local Storage to save the cropped image
  const [savedCroppedImg, setSavedCroppedImg] = useLocalStorage(
    localStorageVar(),
    []
  );

  useEffect(() => {
    if (props.type === "skill") setCroppedImages(croppedImage);
    if (props.type === "cover") setCroppedImages(croppedImage);
    // Update Localstorage when items changed
    setSavedCroppedImg(croppedImage);
  }, [croppedImage]);

  return (
    <ImgDropAndCropContext.Provider
      value={{
        files,
        setFiles,
        openPreviewModal,
        setOpenPreviewModal,
        currentCrop,
        setCurrentCrop,
        currentEdit,
        setCurrentEdit,
        croppedImage,
        setCroppedImage,
        counter,
        setCounter,
        inputDisable,
        setInputDisable,
      }}
    >
      <>
        <ImgDropZone {...props} />
        <ImgCropper type={props.type} />
        <ImgDisplay />
      </>
    </ImgDropAndCropContext.Provider>
  );
}
