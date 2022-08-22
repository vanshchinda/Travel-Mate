import React from "react";
import { Link } from "react-router-dom";

import { Box, Grid, Stack, Button, Card, Typography } from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export function Article() {
  const ArticleCard = ({ link, website, title }) => {
    return (
      <Card
        componenet={Link}
        to={link}
        sx={{
          minWidth: "250px",
          maxWidth: "340px",
          // height: "180px",
          height: "100%",
          backgroundColor: "#DFDFF0",
        }}
      >
        <Grid
          container
          direction={"column"}
          sx={{ padding: "1rem", height: "100%" }}
        >
          <Grid item>
            <Typography sx={{ fontSize: 14 }} color="#001963" gutterBottom>
              {website}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              color="#2B2C34"
              gutterBottom
              variant="h6"
              sx={{
                height: "80px",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {title}
            </Typography>
          </Grid>

          <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="100%"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                  backgroundColor: "#001963",
                  "&:hover": {
                    backgroundColor: "#062580",
                  },
                }}
              >
                Read More
              </Button>
            </a>
          </Grid>
        </Grid>
      </Card>
    );
  };
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexFlow="column nowrap"
    >
      <Box>
        <Typography variant="h4">Travelling Safe</Typography>
      </Box>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{
          margin: "4rem 0 5rem 0",
          width: "100%",
        }}
      >
        <ArticleCard
          link={
            "https://www.cnbc.com/2017/07/24/7-tips-for-staying-safe-while-traveling.html"
          }
          website={"www.cnbc.com"}
          title={"7 tips for staying safe while traveling"}
        />
        <ArticleCard
          link={
            "https://health.clevelandclinic.org/how-to-protect-yourself-from-the-coronavirus-while-traveling/"
          }
          website={"health.clevelandclinic.org"}
          title={"How to Protect Yourself From the Coronavirus While Traveling"}
        />
        <ArticleCard
          link={
            "https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-during-covid19.html"
          }
          website={"www.cdc.gov"}
          title={"Domestic Travel During COVID-19"}
        />
      </Stack>
    </Stack>
  );
}
