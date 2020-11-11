import React, { useState } from "react";
import './App.css';
import Routes from "./routes";
import Message from "./Components/Message/index";
import MessageContext from "./Context/MessageContext";
function App() {
  // Global Error Context
  const [error, setError] = useState(null);
  return (
    <>
      <MessageContext.Provider value={{error, setError}}>
          <Message message={error} type="error" />
          <Routes />
      </MessageContext.Provider>
    </>
  );
}

export default App;
