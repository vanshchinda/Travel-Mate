import React from "react";
import { Link } from "react-router-dom";

/* MUI */
import { Box, Stack, Typography } from "@mui/material";

import vitrendzLogo from "../../resources/images/vitrendzLogo.webp";
import travelMateFullLogo from "../../resources/images/travelMateFullLogo.svg";

export function Footer() {
  const NavLink = ({ title, srcLink }) => {
    return (
      <>
        <Typography variant={"body1"} component={Link} to={srcLink}>
          {title}
        </Typography>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#D1D1E9",
          minHeight: "300px",
          marginTop: "4rem",
          padding: "4rem 6rem",
        }}
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
            justifyContent="space-between"
            sx={{
              width: {
                xs: "100%",
                sm: "60%",
              },
              alignItems: {
                xs: "center",
                sm: "flex-start",
              },
            }}
          >
            <Box width="200px">
              <img
                src={vitrendzLogo}
                alt="VITrendz"
                width="236px"
                height="80px"
              />
            </Box>

            <Box width="200px">
              <img src={travelMateFullLogo} alt="Travel Mate" />
            </Box>
          </Stack>

          <Stack
            direction="column"
            spacing={2}
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <NavLink title={"Home"} srcLink={"/"} />
            {/* <NavLink title={"About"} srcLink={"/#about"} /> */}
            <NavLink title={"Dashboard"} srcLink={"/dashboard"} />
            <NavLink title={"Add Request"} srcLink={"/addRequest"} />
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          backgroundColor: "#A7ACCE",
          height: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#001963" }} variant="caption">
          All Rights Reserved © {new Date().getFullYear()}
        </Typography>
      </Box>
    </>
  );
}
