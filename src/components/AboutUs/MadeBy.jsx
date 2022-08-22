import React from "react";

import {
  Stack,
  Typography,
  Card,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import dhaval4 from "../../resources/images/madeBy/dhaval4.webp";
import vansh2 from "../../resources/images/madeBy/vansh2.webp";
import monalisa2 from "../../resources/images/madeBy/monalisa2.webp";
import anushka2 from "../../resources/images/madeBy/anushka2.webp";

export function MadeBy() {
  const Person = ({
    image,
    pname,
    contribution,
    linkedin,
    github,
    imgProps,
  }) => {
    return (
      <Card
        // direction="row"
        // spacing={1}
        raised
        sx={{
          display: "flex",
          flexFlow: "column noWrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "450px",
          height: "250px",
          margin: {
            xs: "1rem",
            md: "1rem 0.8rem",
            lg: "2rem",
          },
          padding: "0.5rem",
          borderRadius: "15px",
        }}
      >
        <Avatar
          sx={{
            height: "100px",
            width: "100px",
            // border: "0.4px solid #001963",
            // borderRadius: "50%",
          }}
        >
          <img
            src={image}
            alt={pname}
            height={imgProps.height}
            width={imgProps.width}
          />
        </Avatar>

        <Stack
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
            }}
          >
            {pname}
          </Typography>
          <Typography variant="subtitle1" color="primary.light">
            {contribution}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <GitHubIcon fontSize="medium" />
            </IconButton>
          </a>
        </Stack>
      </Card>
    );
  };

  return (
    <>
      <Grid item direction="column" spacing={4} sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Made By
          </Typography>
          <a href="https://travelmate.vitrendz.com" rel="noopener noreferrer">
            <Typography variant="subtitle1" color="#F03E51">
              <u>travelmate.vitrendz.com</u>
            </Typography>
          </a>
        </Stack>

        <Grid
          container
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "1rem 0",
          }}
        >
          <Person
            image={anushka2}
            pname="Kumari Anushka"
            contribution="Backend Development"
            linkedin="https://www.linkedin.com/in/kumari-anushka-1410"
            github="https://github.com/anuxoxo"
            imgProps={{
              heigth: "557px",
              width: "557px",
            }}
          />
          <Person
            image={dhaval4}
            pname="Dhaval Kolhe"
            contribution="Front-end Development"
            linkedin="https://www.linkedin.com/in/dhaval-kolhe"
            github="https://github.com/dhavalkolhe"
            imgProps={{
              heigth: "600px",
              width: "600px",
            }}
          />

          <Person
            image={monalisa2}
            pname="Monalisa Maiti"
            contribution="Product Design"
            linkedin="https://www.linkedin.com/in/monalisa-maiti-4b789b1b8"
            github="https://github.com/monalisamaiti"
            imgProps={{
              heigth: "244px",
              width: "244px",
            }}
          />

          <Person
            image={vansh2}
            pname="Vansh Chinda"
            contribution="Design & Development"
            linkedin="https://www.linkedin.com/in/vansh-chinda-310884189/"
            github="https://github.com/vanshchinda"
            imgProps={{
              heigth: "543px",
              width: "543px",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
