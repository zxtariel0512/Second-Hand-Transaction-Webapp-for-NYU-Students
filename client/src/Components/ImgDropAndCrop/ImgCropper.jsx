import React, { useContext, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Cropper from "react-easy-crop";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ImgCropperStyle } from "./style";
import DropAndCropContext from "./Store/ImgDropAndCropContext";
import getCroppedImg from "./cropImg";
import useLocalStorage from "../../Utils/useLocalStorage";

const useStyles = makeStyles(ImgCropperStyle);

/**
 * Helper function to sort the image and make sure keep everything in order after editing
 */
function sortImage(arr) {
  return arr.sort((a, b) => a.id - b.id);
}

function createRandomId() {
  return (
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    "-" +
    new Date().getTime() +
    "-" +
    Math.random().toString().substr(2, 5)
  );
}

export default function ImgCropper(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);


  // Dynamically use localstorage
  const localStorageVar = () => {
    return props.type === 'cover' ? 'savedCoverPhoto' : 'savedSkillPhoto';
  }

  // Local Storage to save the cropped image
  const [savedCroppedImg, setSavedCroppedImg] = useLocalStorage(localStorageVar(), []);

  const {
    openPreviewModal,
    setOpenPreviewModal,
    croppedImage,
    setCroppedImage,
    files,
    setFiles,
    currentCrop,
    setCurrentCrop,
    currentEdit,
    setCurrentEdit,
    counter,
    setCounter,
  } = useContext(DropAndCropContext);

  const classes = useStyles();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleClose = () => {
    setFiles(null);
    setOpenPreviewModal(false);
    setCurrentCrop(null);
  };

  const handleSave = () => {
    setOpenPreviewModal(false);
    if (croppedImage) {
      if (currentEdit) {
        // We want to sort image to make sure the images in original orders
        setCroppedImage(
          sortImage([
            ...croppedImage.filter((e) => e.cropped !== currentEdit.cropped),
            currentCrop,
          ])
        );
        setSavedCroppedImg(
          sortImage([
            ...croppedImage.filter((e) => e.cropped !== currentEdit.cropped),
            currentCrop,
          ])
        );
      } else {
        setCroppedImage([...croppedImage, currentCrop]);
        setSavedCroppedImg([...croppedImage, currentCrop]);
        setCounter(counter + 1);
      }
    } else {
      setCroppedImage([currentCrop]);
      setSavedCroppedImg([currentCrop]);
      setCounter(counter + 1);
    }
    // Reset
    setCurrentCrop(null);
    setCurrentEdit(null);
  };

  // Preview Thumbnails
  const thumbs = files
    ? files.map((file) => (
        <Cropper
          image={file.preview}
          aspect={16 / 9}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      ))
    : "No file uploaded.";

  const showCroppedImage = useCallback(async () => {
    try {
      setLoading(true);
      const croppedImage = await getCroppedImg(
        files[0].preview,
        croppedAreaPixels,
        0
      );
      // Assign an id when we get cropped image
      // We also want to save the original for edit
      // If we are in EDIT mode, then assign the original id
      setCurrentCrop({
        id: currentEdit ? currentEdit.id : createRandomId(),
        cropped: croppedImage,
        original: files[0].preview,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <Dialog open={openPreviewModal} fullScreen>
      <DialogTitle id="alert-dialog-title">
        Crop Your Image
        {currentCrop ? (
          <>
            <Button
              className={classes.button}
              onClick={handleSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              className={classes.button}
              onClick={handleClose}
              color="primary"
              variant="contained"
            >
              Choose Another Image
            </Button>
          </>
        ) : (
          <>
            <Button
              className={classes.button}
              onClick={showCroppedImage}
              color="primary"
              variant="contained"
            >
              Show Result
            </Button>
            <Button
              className={classes.button}
              onClick={handleClose}
              color="primary"
              variant="contained"
            >
              Choose Another Image
            </Button>
          </>
        )}
        {loading && (
          <Box paddingY="20px">
            <LinearProgress className={classes.progress} />
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        <div className={classes.container}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {!currentCrop && (
              <Box display="flex" justifyContent="center">
                <div className={classes.thumbsContainer}>{thumbs[0]}</div>
              </Box>
            )}
            {currentCrop && (
              <>
                <h3 className={classes.resultTitle}>Crop Result</h3>
                <img className={classes.thumb} src={currentCrop.cropped} />
              </>
            )}
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
}
