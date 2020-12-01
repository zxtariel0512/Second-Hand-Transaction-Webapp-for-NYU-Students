import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@material-ui/core/Button";
import S3FileUpload from "react-s3";
import { config } from "../../View/PostItem/Upload/config";
import { urlToFile } from "../../Utils/image/toBlob";
import updateUser from "Controller/User/updateUser";
import { Auth } from "aws-amplify";

class AvatarCropper extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1,
    },
    container: {
      width: "80%",
      height: "80%",
    },
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  /**
   * Covert Photos to File Objects
   */
  async convertImages(blob) {
    // Convert Blob URL to Blob
    return await urlToFile(blob, { compressed: false });
  }

  /**
   * Upload a single file to AWS S3
   * @param {File} file
   */
  async uploadFile(file) {
    try {
      // 403 Error here don't know why but it worked fine yesterday.
      const res = await S3FileUpload.uploadFile(file, config);
      return res.location;
    } catch (e) {
      console.error(e);
    }
  }

  async uploadAvatar(croppedBlob) {
    const file = await this.convertImages(croppedBlob);
    const avatarUrl = await this.uploadFile(file);

    this.props.setEditAvatar(false);
    try {
      const user = await Auth.currentSession();
      const token = user.getIdToken().jwtToken;
      this.props.profile.avatarUrl = avatarUrl;
      updateUser(this.props.profile.netid, this.props.profile, token);
      // refresh page to get updated data
      window.location.reload();
    } catch {
      console.log("error");
    }
  }
  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div>
        <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        <div style={{ maxWidth: 600, maxHeight: 600 }}>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}
        </div>
        <Button onClick={() => this.uploadAvatar(croppedImageUrl)}>Done</Button>
      </div>
    );
  }
}

export default AvatarCropper;
