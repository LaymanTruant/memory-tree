import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      file: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 3 / 4
      },
      croppedImageUrl: null
    };
  }

  onImageLoaded = image => {
    this.croppedImageRef = image;
  };

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }

  // onSubmit = event => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", this.state.croppedImage);
  //   // this.props.uploadImage(this.props.id, formData);
  // };

  onSelectFile = (event, input) => {
    let imageFile = event.target.files[0];
    this.setState({
      file: URL.createObjectURL(imageFile)
    });
    input.onChange(imageFile);
  };

  async makeClientCrop(crop) {
    if (this.croppedImageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.croppedImageRef,
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

    const reader = new FileReader();
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
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

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  render() {
    return (
      <div className="ui field">
        <label>Your Profile</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={this.imageRef}
          onChange={event => this.onSelectFile(event, this.props.input)}
        />
        <ReactCrop
          src={this.state.file}
          crop={this.state.crop}
          ruleOfThirds
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />
      </div>
    );
  }
}

export default ImageUpload;
