// Controller to request and manage list items data/state
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { Auth } from "aws-amplify";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authStatus, setAuthStatus] = useState(false);

  // check user auth status
  async function checkStatus() {
    try {
      const user = await Auth.currentSession();
      setAuthStatus(true);
    } catch {
      setAuthStatus(false);
    }
  }

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <AuthContext.Provider value={[authStatus, setAuthStatus, checkStatus]}>
      {props.children}
    </AuthContext.Provider>
  );
};
