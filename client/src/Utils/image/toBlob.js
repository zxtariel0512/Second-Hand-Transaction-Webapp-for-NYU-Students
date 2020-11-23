import compressImage from "./imgCompressor";

/**
 * Create a random file name based on timestamp
 */
const createFileName = () => {
  return Date.now() + "_" + Math.floor(Math.random() * 1000) + ".png";
};

/**
 * @param {String} url Blob URL
 * @returns {Blob}
 */
async function urlToBlob(url) {
  const blob = await fetch(url).then((r) => r.blob());
  return blob;
}

/**
 * Convert and Compress the image file
 * @param {String} url
 * @param {String} { compressed: false } default
 */

async function urlToFile(url, { compressed }) {
  const blob = await urlToBlob(url);
  if (compressed) {
    const compressed = await compressImage(blob);
    return new File([compressed], createFileName());
  } else {
    return new File([blob], createFileName());
  }
}

export { urlToBlob, urlToFile };
