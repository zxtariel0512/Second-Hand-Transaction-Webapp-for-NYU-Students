// Controller to request and manage list items data/state
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { Auth } from "aws-amplify";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  // check user auth status
  async function checkStatus() {
    try {
      const user = await Auth.currentSession();
      setToken(user.getIdToken().jwtToken);
      setUsername(user.getIdToken().payload["cognito:username"]);
      setAuthStatus(true);
      console.log(user.getIdToken().jwtToken);
    } catch {
      setAuthStatus(false);
    }
  }

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={[
        authStatus,
        setAuthStatus,
        checkStatus,
        token,
        setToken,
        username,
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
