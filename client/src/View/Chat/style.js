const style = {
  main: {
    height: "100vh",
    width: "100vw",
  },
  container: {
    paddingTop: "100px",
    paddingBottom: "20px",
    height: "100%",
    boxSizing: "border-box",
  },
  chat: {
    height: "100%",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
  },
  chatList: {
    width: "300px",
  },
  chatBox: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  chatBoxMessages: {
    flex: "1",
    overflowY: "scroll",
  },
  chatBoxInput: {
    "& form": {
      display: "flex",
    },
  },
};

export default style;
