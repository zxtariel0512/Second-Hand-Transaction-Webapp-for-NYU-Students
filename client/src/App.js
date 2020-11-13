import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Routes from "./routes";
import Message from "./Components/Message/index";
import MessageContext from "./Context/MessageContext";
import { AuthProvider, AuthContext } from "Context/AuthContext";
function App() {
  // Global Error Context
  const [error, setError] = useState(null);
  return (
    <>
      <MessageContext.Provider value={{ error, setError }}>
        <Message message={error} type="error" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </MessageContext.Provider>
    </>
  );
}

export default App;
