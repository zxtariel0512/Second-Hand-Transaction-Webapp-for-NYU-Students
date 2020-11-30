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
  overflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
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
    overflowY: "scroll",
    borderRight: ".5px solid #e0e0e0",
  },
  chatBox: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  chatBoxHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    height: "60px",
    borderBottom: ".5px solid #e0e0e0",
  },
  chatBoxMessages: {
    padding: "20px 20px 0 20px",
    flex: "1",
    overflowY: "scroll",
  },
  chatBoxInput: {
    padding: "10px 20px 20px 20px",
    "& form": {
      display: "flex",
    },
    borderTop: ".5px solid #e0e0e0",
  },
  chatBoxDirect: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "20px",
  },
};

export default style;
