const ImgContainerStyle = {
  container: {
    marginTop: "20px",
    width:'100%',
  },
};

const ImgCropperStyle = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  resultTitle: {
    padding: 40,
    textAlign: "center",
  },
  button: {
    marginLeft: "40px",
  },
  thumb: {
    borderRadius: 2,
    border: "1px solid #eaeaea",
    width: "50vw",
    height: "auto",
    padding: 4,
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
};

const ImgThumbNailStyle = {
  container: {
    position: "relative",
    width: "100%",
  },
  img: {
    height: "80px",
    width: "auto",
    border: "1px solid gray",
    borderRadius: "10px",
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 0,
    cursor: "pointer",
  },
};

const ImgDropZoneStyle = {
  imgThumbnails: {
    height: "150px",
    width: "auto",
    border: "1px solid gray",
    borderRadius: "10px",
  },
  imgContainer: {
    paddingTop: "20px",
  },
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export {
  ImgContainerStyle,
  ImgCropperStyle,
  ImgThumbNailStyle,
  ImgDropZoneStyle,
  baseStyle,
  acceptStyle,
  activeStyle,
  rejectStyle,
};
