import S3 from "react-s3";

const config = {
  bucketName: "second-hand-nyu",
  region: "us-east-1",
  accessKeyId: "AKIAID5OI2C4DZVJARZQ",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);

async function uploadFile(file) {
  return ReactS3Client.uploadFile(file, config);
}

export default uploadFile;
