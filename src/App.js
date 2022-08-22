import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { db } from "./firebase/db";
import { doc, updateDoc } from "firebase/firestore";

// Components
// import { Login } from "./components/Login";
import AddRequest from "./components/AddRequest/AddRequest";

// Contexts
import {
  LoginContextProvider,
  WindowContextProvider,
  ThemeContextProvider,
} from "./context";
import ResponseContextProvider from "./context/responseContext";
import NotificationContextProvider from "./context/notificationContext";
import RoomsContextProvider from "./context/roomsContext";
import ChatContextProvider from "./context/chatContext";
import SearchContextProvider from "./context/searchContext";
import DashboardContextProvider from "./context/dashboardContext";
import SentReqContextProvider from "./context/sentRequests";

import "./firebase/firebase";

import SearchResult from "./pages/SearchResult/SearchResult";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// Pages
import { Home } from "./pages/Home";
import { Notification } from "./components/Notification";
// import { ChatPage } from "./pages/Chat";
import Dashboard from "./components/Dashboard/Dashboard";
import { ChatPage } from "./pages/Chat";

import { BottomNav, BottomNavPageContainer } from "./components/Nav";
import { UserContext } from "./context/userContext";

// import { MessagesBox } from "./components/ChatComponents";

//Test
// import { SearchBox } from "./components/HomeComponents";

//mui
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const Navigation = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100vw" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Add Request" icon={<AddCircleIcon />} />
        <BottomNavigationAction
          label="Notifications"
          icon={<NotificationsIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

function App() {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [u, setU] = useState(auth.currentUser);

  const addEmail = async (uid, email) => {
    try {
      updateDoc(doc(db, "users", uid), {
        email,
      });
    } catch (e) {
      console.error("Error adding email: ", e);
    }
  };

  useEffect(() => {
    let userData = {};

    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        userData = { authorized: false };
        setU(userData);
      } else {
        addEmail(userFound.uid, userFound.email);
        userData = {
          authorized: true,
          uid: userFound.uid,
          displayName: userFound.displayName,
          photoURL: userFound.photoURL,
          email: userFound.email,
        };
        setU(userData);
      }
    });
  }, []);

  window.addEventListener("storage", (e) => {
    // if (e.key === "openpages") {
    //   // Listen if anybody else is opening the same page!
    //   console.log("openpages");
    // }
    // if (e.key === "page_available") {
    //   console.log("One more page already open");
    // }
    const changedData = JSON.parse(window.localStorage.getItem("user"));

    if (JSON.stringify(u) !== JSON.stringify(changedData)) {
      // localStorage.setItem("user", JSON.stringify(u));
      setUser({
        authorized: false,
        displayName: "",
        photoURL: "",
        email: "",
      });
    }
  });

  return (
    // <MobileFullscreen mask={Mask}>
    <WindowContextProvider>
      <NotificationContextProvider>
        <SentReqContextProvider>
          <ThemeContextProvider>
            <SearchContextProvider>
              <LoginContextProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <ChatContextProvider>
                    <Router>
                      <Switch>
                        <Route exact path="/addRequest">
                          <BottomNavPageContainer>
                            <AddRequest />
                          </BottomNavPageContainer>
                          <BottomNav />
                        </Route>

                        <Route exact path="/notifications">
                          <BottomNavPageContainer>
                            <Notification />
                          </BottomNavPageContainer>
                          <BottomNav />
                        </Route>

                        <Route exact path="/search">
                          <ResponseContextProvider>
                            <BottomNavPageContainer>
                              <SearchResult />
                            </BottomNavPageContainer>
                            <BottomNav />
                          </ResponseContextProvider>
                        </Route>

                        <Route exact path="/dashboard">
                          <DashboardContextProvider>
                            <BottomNavPageContainer>
                              <Box
                                sx={{
                                  mb: {
                                    xs: 3,
                                    md: 0,
                                  },
                                }}
                              >
                                <Dashboard />
                              </Box>
                            </BottomNavPageContainer>
                            <BottomNav />
                          </DashboardContextProvider>
                        </Route>

                        <Route exact path="/chat">
                          <RoomsContextProvider>
                            <BottomNavPageContainer>
                              <ChatPage />
                            </BottomNavPageContainer>
                            <BottomNav />
                          </RoomsContextProvider>
                        </Route>

                        <Route exact path="/">
                          <BottomNavPageContainer>
                            <Home />
                          </BottomNavPageContainer>
                          <BottomNav />
                        </Route>
                      </Switch>
                    </Router>
                  </ChatContextProvider>
                </LocalizationProvider>
              </LoginContextProvider>
            </SearchContextProvider>
          </ThemeContextProvider>
        </SentReqContextProvider>
      </NotificationContextProvider>
    </WindowContextProvider>
    // </MobileFullscreen>
  );
}

export default App;
