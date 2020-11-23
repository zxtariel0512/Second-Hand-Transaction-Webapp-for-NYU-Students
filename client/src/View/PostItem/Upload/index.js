import React, { useEffect, useState } from "react";
import S3FileUpload from "react-s3";
import { urlToFile } from "../../../Utils/image/toBlob";
import { config } from "./config";
import { getLocalStorage } from "../../../Utils/localstorage";
import { CircularProgress, Box } from "@material-ui/core";

/**
 * Covert Photos to File Objects
 */
async function convertImages() {
  // Convert Blob URL to Blob
  const coverPhoto = JSON.parse(getLocalStorage("savedCoverPhoto"));
  const itemPhoto = JSON.parse(getLocalStorage("savedSkillPhoto"));
  const coverBlobs = await urlToFile(coverPhoto[0].cropped, {
    compressed: true,
  });
  const itemBlobs = [];
  for (let i = 0; i < itemPhoto.length; i++) {
    itemBlobs.push(await urlToFile(itemPhoto[i].cropped, { compressed: true }));
  }
  return { coverPhoto: coverBlobs, itemPhoto: itemBlobs };
}

/**
 * Upload a single file to AWS S3
 * @param {File} file
 */
async function uploadFile(file) {
  try {
    const res = await S3FileUpload.uploadFile(file, config);
    return res.location;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Upload multiple files and return the urls
 * @param {[String]} files
 */
async function uploadFiles(files) {
  const url = [];
  for (let i = 0; i < files.length; i++) {
    const res = await uploadFile(files[i]);
    url.push(res);
  }
  return url;
}

export default function UploadPostItem() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Upload the images
  useEffect(() => {
    const upload = async () => {
      setLoading(true);
      setStatus("Compressing Images");
      const imgFiles = await convertImages();
      setStatus("Uploading Images");
      const coverPhotoURL = await uploadFile(imgFiles.coverPhoto);
      const itemPhotoURL = await uploadFiles(imgFiles.itemPhoto);
      setStatus("Posting Your Items");
      // TODO: Integrate API
      // setStatus("Finished " + JSON.stringify(res));
    };
    upload();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" mt="100px">
        <CircularProgress />
      </Box>
      <Box display="flex" justifyContent="center" mt="30px">
        {status}
      </Box>
    </>
  );
}
