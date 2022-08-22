import React, { useState, useContext, createContext, useEffect } from "react";

import { UserContext } from "./userContext";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [user] = useContext(UserContext);

  useEffect(() => {
    setLoggedIn(user.authorized);
    return () => {
      setLoggedIn(user.authorized);
    };
  }, [user]);

  return (
    <LoginContext.Provider
      value={{
        userLogged: [loggedIn, setLoggedIn],
        loginDialog: [loginDialogOpen, setLoginDialogOpen],
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
