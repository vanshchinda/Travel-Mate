import React, { useState } from "react";
import AdSense from "react-adsense";
// import { Link } from "react-router-dom";

/* Componenets */
import {
  Nav,
  //  BottomNav
} from "../../components/Nav";
import {
  SearchSection,
  StepsInfo,
  Article,
  WebsiteInfo,
} from "../../components/HomeComponents";
import { About, MadeBy } from "../../components/AboutUs";
import { Footer } from "../../components/Footer";

import { Box, Container } from "@mui/material";

export function Home() {
  const [overlayDisplay, setoverlayDisplay] = useState("none");

  const homeContext = React.createContext({
    overlayDisplay: overlayDisplay,
    setoverlayDisplay: setoverlayDisplay,
  });

  return (
    <homeContext.Provider>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: "10",
          background: "rgba(0, 0, 0, .5) ",
          display: overlayDisplay,
        }}
      ></Box>
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }}>
          <Nav />
          <SearchSection />
        </Box>
        <StepsInfo />
        <AdSense.Google
          client="ca-pub-3524193275174890"
          slot="4162029724"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
            marginBottom: "3rem",
          }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        />
        <Article />
        {/* <div>
        <Link to="/addRequest">Add Request</Link>
      </div>
      <div>
        <Link to="/searchRequests">Search Requests</Link>
      </div> */}
      </Container>

      {/* <BottomNav /> */}

      <WebsiteInfo />
      <Container maxWidth="lg" id="about">
        <About />
        <MadeBy />
        <AdSense.Google
          client="ca-pub-3524193275174890"
          slot="4162029724"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        />
        {/* <MadeBy /> */}
      </Container>
      <Footer />
    </homeContext.Provider>
  );
}
