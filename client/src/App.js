import React, { useState } from "react";
import Routes from "./routes";
import Message from "./Components/Message/index";
import MessageContext from "./Context/MessageContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import "./App.css";

function App() {
  // Global Error Context
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  return (
    <>
      <MessageContext.Provider value={{ error, setError, message, setMessage }}>
        <ThemeProvider theme={theme}>
          <Message message={error} type="error" />
          <Message message={message} type="success" />
          <Routes />
        </ThemeProvider>
      </MessageContext.Provider>
    </>
  );
}

export default App;
