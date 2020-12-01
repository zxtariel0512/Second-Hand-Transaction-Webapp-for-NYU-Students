import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 3,
  maxWidthOrHeight: 4096,
  useWebWorker: true,
  onProgress: (progress) => console.log("Compression: " + progress + "%"),
};

async function compressImage(Imgfile) {
  try {
    const compressedFile = await imageCompression(Imgfile, options);
    return compressedFile;
  } catch (e) {
    console.error(e);
  }
}

export default compressImage;
