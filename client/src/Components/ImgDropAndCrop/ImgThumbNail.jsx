import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grow } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import ImgCropAndDropContext from "./Store/ImgDropAndCropContext";
import { ImgThumbNailStyle } from "./style";

const useStyles = makeStyles(ImgThumbNailStyle);

export default function ImgThumbNail({ id, src }) {
  const classes = useStyles();

  const {
    croppedImage,
    counter,
    setCroppedImage,
    setOpenPreviewModal,
    setFiles,
    setCurrentEdit,
    setCounter,
  } = useContext(ImgCropAndDropContext);

  /**
   * Edit the cropped Image
   */
  const onEdit = () => {
    setOpenPreviewModal(true);
    setFiles([{ preview: src.original }]);
    setCurrentEdit({ cropped: src.cropped, id: src.id });
  };

  /**
   * Deletion Handling
   */
  const onDelete = () => {
    setCroppedImage(croppedImage.filter((img) => img.cropped !== src.cropped));
    setCounter(counter - 1);
  };

  return (
    <div className={classes.container}>
      <img
        alt="thumbnail"
        key={id}
        className={classes.img}
        src={src.cropped}
        onClick={onEdit}
        style={{cursor: 'pointer'}}
      />
      <span onClick={onDelete}>
        <DeleteIcon color="secondary" className={classes.closeBtn} />
      </span>
    </div>
  );
}
