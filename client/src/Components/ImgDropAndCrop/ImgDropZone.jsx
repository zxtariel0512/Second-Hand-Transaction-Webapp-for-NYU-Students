import React, { useMemo, useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box } from "@material-ui/core";
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from "./style";
import ImgDropAndCropContext from "./Store/ImgDropAndCropContext";

function ImgDropZone(props) {
  const {
    setOpenPreviewModal,
    croppedImage,
    setFiles,
    counter,
    inputDisable,
    setInputDisable,
  } = useContext(ImgDropAndCropContext);

  // Styling

  // Events Handling

  /**
   * When drop is made
   * Currently, we only accept one drop at a time
   */

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file, i) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  };

  /**
   * When drop is accepted
   */
  const onDropAccepted = () => {
    setOpenPreviewModal(true);
  };

  // TODO: Revoke Data After Upload Complete / Form Submitted.
  const onRevokeData = () => {
    // revoke the data uris to avoid memory leaks
    croppedImage.forEach((img) => {
      URL.revokeObjectURL(img.original);
    });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: onDrop,
    onDropAccepted: onDropAccepted,
    multiple: false,
    disabled: inputDisable,
  });

  // Setting up the drop zone style
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  /*
    Setting the Maximum Number of file that we accept
  */
  useEffect(() => {
    if (croppedImage) {
      setInputDisable(croppedImage.length >= props.maxNum);
    }
  }, [croppedImage]);

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{props.label}</p>
        {inputDisable && (
          <Box paddingY="20px" color="red">
            <small>Maximum {props.maxNum} Image are allowed</small>
          </Box>
        )}
      </div>
      <div>
        {/* <Button onClick={onRevokeData} variant="contained" color="secondary">
          Upload
        </Button> */}
      </div>
    </section>
  );
}

export default ImgDropZone;
