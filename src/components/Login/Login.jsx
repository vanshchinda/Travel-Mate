import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Recaptcha from "react-recaptcha";
import "./Login.css";

// firebase
import "../../firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";

// firestore
import { db } from "../../firebase/db";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

//mui + UI
import { Box, Stack, Card, Button, Typography } from "@mui/material";
import googleLogo from "../../resources/icons/googleLogo.svg";
import travelmateLogo from "../../resources/icons/travelmateLogo.svg";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Login = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);

  const notify = (type, message) => {
    toast[type](message);
  };

  const addUser = async (displayName, photoURL, uid, email) => {
    try {
      setDoc(doc(db, "users", uid), {
        displayName,
        photoURL,
        email,
        rooms: [],
        rides: [],
      });
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  };

  const userExists = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const addEmail = async (uid, email) => {
    try {
      updateDoc(doc(db, "users", uid), {
        email
      });
    } catch (e) {
      console.error("Error adding email: ", e);
    }
  }

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, photoURL, uid, email } = result.user;
        console.log(uid)
        const authorized = result.user.accessToken ? true : false;

        setUser({
          authorized,
          displayName,
          photoURL,
          uid,
          email,
        });

        userExists(uid).then((res) => {
          if (!res) {
            addUser(displayName, photoURL, uid, email);
          } else {
            addEmail(uid, email);
            console.log("User already exists!");
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //logout function moved to firebaseUtils.js

  // eslint-disable-next-line
  const [isVerfied, setIsVerified] = useState(false);

  function login() {
    if (isVerfied) {
      signIn();
    } else {
      notify("error", "Verify captcha first");
    }
  }

  function onloadCallback() {
    console.log("Captcha loaded successfully");
  }

  function verifyCallback() {
    setIsVerified(true);
  }

  return (
    <Card
      sx={{
        minWidth: "315px",
        maxWidth: "540px",
        minHeight: "315px",
        padding: "1rem",
      }}
    >
      <Stack
        direction="column"
        flexWrap="nowrap"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ width: "50px", height: "50px" }}>
          <img src={googleLogo} alt="Google" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Sign In
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography>to continue to</Typography>
          <Box sx={{ width: "90px", height: "50px", marginLeft: "10px" }}>
            <img src={travelmateLogo} alt="travelmate" />
          </Box>
        </Box>

        <Recaptcha
          sitekey={process.env.REACT_APP_SITE_KEY}
          render="explicit"
          onloadCallback={onloadCallback}
          verifyCallback={verifyCallback}
        />
        <Typography variant="subtitle2" sx={{ fontSize: "11px" }}>
          By signing in you agree to the{" "}
          <a
            href="https://drive.google.com/file/d/1bX2XdsHL997EpHdh-StR4jvHbI1XtsFW/view"
            target="_blank"
            rel="noopener noreferrer"
            class="tcanchor"
          >
            Terms and Conditions
          </a>
        </Typography>

        <Stack width="100%" alignItems="flex-end">
          <Button variant="contained" onClick={login}>
            Sign In
          </Button>
        </Stack>
      </Stack>
      <Toast />
    </Card>
  );
};
