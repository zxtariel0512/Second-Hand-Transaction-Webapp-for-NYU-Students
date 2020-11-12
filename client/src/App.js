import react, {useState} from "react";
import Routes from "./routes";
import Message from "./Components/Message/index";
import MessageContext from "./Context/MessageContext";
import React from "react";

function App() {
    // Global Error Context
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null)
    return (
        <>
            <MessageContext.Provider value={{error, setError, message, setMessage}}>
                <Message message={error} type="error"/>
                <Message message={message} type="success" />
                <Routes/>
            </MessageContext.Provider>
        </>
    );
}

export default App;
