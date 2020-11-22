import uploadFile from "../../Model/upload/";
import S3FileUpload from "react-s3";

/**
 * Create a image file name based on timestamp
 */
function createFileName() {
  return `IMG_${Date.now()}.png`;
}

/**
 *
 * @param {String} blob blob URL
 */

export default async function uploadImages(blob) {
  // Convert the Blob file
  const file = new File([blob], createFileName());
  try {
    const res = await uploadFile(file);
    return { success: true, data: res };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

const config = {
  bucketName: "second-hand-nyu",
  accessKeyId: "AKIAID5OI2C4DZVJARZQ",
  region: "us-east-1",
  secretAccessKey: "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",
};

async function uploadFile(file) {
  try {
    const res = await S3FileUpload.uploadFile(file, config);
    return res;
  } catch (e) {
    console.error(e);
  }
}
