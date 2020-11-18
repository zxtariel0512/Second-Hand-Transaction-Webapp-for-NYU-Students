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
  },
  chatBoxHeader: {
    padding: "20px",
    borderBottom: "1px solid black",
  },
  chatBoxMessages: {
    padding: "20px 20px 0 20px",
    flex: "1",
    overflowY: "scroll",
  },
  chatBoxInput: {
    padding: "0 20px 20px 20px",
    "& form": {
      display: "flex",
    },
  },
};

export default style;
