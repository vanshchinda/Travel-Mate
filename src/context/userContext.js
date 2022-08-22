import React, { useState, createContext, useEffect } from "react";
import "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();
const auth = getAuth();

const UserContextProvider = (props) => {
  const localData = localStorage.getItem("user");
  const data = localData ? JSON.parse(localData) : { authorized: false };

  const [user, setUser] = useState(data);

  useEffect(() => {
    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        setUser({ authorized: false });
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
