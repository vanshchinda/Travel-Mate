import React, { useContext } from "react";

import "../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";

import { UserContext } from "../context/userContext";

const auth = getAuth();

export const logOutUser = () => {
  const [user, setUser] = useContext(UserContext);

  signOut(auth)
    .then(() => {
      setUser({
        authorized: false,
        displayName: "",
        photoURL: "",
      });
    })
    .catch((error) => {
      alert("Error Sign Out Failed :: ", error.message);
    });
};
