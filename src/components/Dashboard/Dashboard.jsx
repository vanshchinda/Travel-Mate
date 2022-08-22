import React, { useContext } from "react";
import { Nav } from "../../components/Nav";
import { Box, Container } from "@mui/material";
import wave from "../../img/dashWave.svg";
import dashBg from "../../img/dashBg.svg";
import "./Dashboard.css";
import Loader from "../../components/Loader/Loader";

import { DashboardContext } from "../../context/dashboardContext";
import { LoginContext } from "../../context/loginContext";
import { UserContext } from "../../context/userContext";
import { Redirect } from "react-router-dom";

// eslint-disable-next-line

function Dashboard() {
  const { activeOffers, loader } = useContext(DashboardContext);
  const [loading] = loader;
  const { loginDialog } = useContext(LoginContext);
  // eslint-disable-next-line
  const [loginDialogOpen, setLoginDialogOpen] = loginDialog;
  // eslint-disable-next-line

  const [user] = useContext(UserContext);

  return (
    <Box>
      <Container maxWidth="lg">
        <Nav />
      </Container>
      {!user.authorized ? (
        <div>
          <Redirect to="/" />
          {setLoginDialogOpen(true)}
        </div>
      ) : (
        <div>
          <Box className="dashBg-container">
            <img src={dashBg} alt="dashBg" />
          </Box>
          <Box className="crop">
            <img src={wave} alt="wave" />
          </Box>
          <div className="profile">
            <div className="profile-img-container">
              <img className="profile-img" src={user.photoURL} alt="user-img" />
            </div>

            <span className="profile-name">{user.displayName}</span>
            <span className="profile-email">{user.email}</span>
          </div>
          <div className="activeOffersContainer">
            <span className="active-text">Active Offers</span>
            {loading ? (
              <span className="noActiveText"><Loader size={20} /></span>

            ) : (
              activeOffers.length === 0 ? (
                <span className="noActiveText">No active Offers</span>
              ) : (
                <div className="activeOffersCards">{activeOffers}</div>
              )
            )}
          </div>
        </div>
      )}
    </Box>
  );
}

export default Dashboard;
