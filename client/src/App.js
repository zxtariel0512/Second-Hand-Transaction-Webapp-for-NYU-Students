import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Routes from "./routes";
import Message from "./Components/Message/index";
import MessageContext from "./Context/MessageContext";
import { AuthProvider } from "./Context/AuthContext";
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
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </MessageContext.Provider>
    </>
  );
}

export default App;
