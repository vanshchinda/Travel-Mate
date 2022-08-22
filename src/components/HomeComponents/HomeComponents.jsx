import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
import "./HomeComponents.css";

import { SearchBox } from "./SearchBox";
import { WindowContext } from "../../context";

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Dialog,
} from "@mui/material";

import illustation1 from "../../resources/images/illustration1.svg";
import bgvector1 from "../../resources/images/bgVector1.svg";

import websiteInfoIcon1 from "../../resources/images/websiteInfoIcon1.svg";
import websiteInfoIcon2 from "../../resources/images/websiteInfoIcon2.svg";
import websiteInfoIcon3 from "../../resources/images/websiteInfoIcon3.svg";

export function SearchSection() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };
  // eslint-disable-next-line
  const { width, height } = useContext(WindowContext);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.7rem",
              md: "1.5rem",
            },
            marginLeft: {
              xs: "0vw",
              md: "20vw",
            },
            marginTop: "2rem",
            marginBottom: "1rem",
            texAlign: "left",
            letterSpacing: "0.03em",
            textTransform: {
              xs: "normal",
              md: "uppercase",
            },
            color: "#2B2C34",
          }}
        >
          Looking For Someone to travel With?
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: "180px",
            backgroundColor: "#6246EA",
            "&:hover": {
              backgroundColor: "#6251B5",
            },
            "&:active": {
              backgroundColor: "#6251B5",
            },
            display: {
              xs: "flex",
              md: "none",
            },
          }}
          onClick={handleSearchOpen}
        >
          Search For Mate
        </Button>

        <Dialog open={searchOpen} onClose={handleSearchClose}>
          <SearchBox />
        </Dialog>

        <Box
          sx={{
            marginLeft: {
              xs: "10vw",
              lg: "20vw",
            },
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <SearchBox />
        </Box>
      </Container>

      {height > 600 && (
        <>
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "40px", md: "0px" },
              left: "0px",
              display: "flex",
              justifyContent: "flex-end",
              pointerEvents: "none",
            }}
          >
            <img src={bgvector1} alt="illus" />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "40px", md: "0px" },
              width: {
                xs: "300px",
                md: "40vw",
              },
              display: "flex",
              justifyContent: "flex-end",
              pointerEvents: "none",
            }}
          >
            <img src={illustation1} alt="illus" />
          </Box>
        </>
      )}
    </>
  );
}

export function WebsiteInfo() {
  const Item = ({ image, head, data }) => {
    return (
      <Grid item container direction="column" maxWidth="300px" margin="2rem">
        <Grid item>
          <img src={image} alt={head} />
        </Grid>
        <Grid item>
          <Typography variant="h5">{head}</Typography>
        </Grid>
        <Grid item>
          <Typography>{data}</Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box
      sx={{
        backgroundColor: "#D1D1E9",
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Item
          image={websiteInfoIcon1}
          head={"Trust who you travel with"}
          data={
            "Travelmate enforces strict privacy policies to protect members against disclosure, unauthorized access."
            // The use of secured servers, designated data protection, implementation of appropriate security measures to prevent and protect personal data should put minds at ease.
          }
        />
        <Item
          image={websiteInfoIcon2}
          head={"Search, Connect and GO!"}
          data={
            "Enter your travel location and connect with your travel buddy without any hassels. "
            // All you need to do is enter your departure and arrival destination and push a request for your travel buddy to find you. Your request will be enlisted and your travel mate can connect with you only if you approve the request.
          }
        />
        <Item
          image={websiteInfoIcon3}
          head={"Chat within the Website"}
          data={`Travel mate is focused on providing a secure instant messaging chat platform to its users for them to connect. `}
          // and share their travel details with each other.
          // It comes in built-in security feature wherein an user's chat option is enabled only if your travel mate approves your request.
          // Hence, ensuring safety and security.
        />
      </Grid>
    </Box>
  );
}
