const style = (theme) => ({
  container: {
    width: "80%",
    margin: "150px auto",
  },
  header: {
    marginTop: "50px",
    margin: "auto",
    textAlign: "center",
  },
  categories: {
    height: "100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  category: {
    marginRight: "20px",
    height: "40px",
    backgroundColor: theme.palette.primary.light,
  },
  circle: {
    position: "fixed",
    bottom: 50,
    right: 50,
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
  },
  addicon: {
    color: "white",
  },
});

export default style;
