import React from "react";
/* MUI */
import { Stack, Typography } from "@mui/material";

export function About() {
  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        sx={{ padding: "4rem 0", width: "100%" }}
      >
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h3" sx={{
            fontSize: {
              xs: "2rem",
              md: "3rem"
            }
          }}>
            About Us
          </Typography>

          <a
            href="https://vitrendz.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="subtitle1" color="#F03E51">
              <u>vitrendz.com</u>
            </Typography>
          </a>
        </Stack>
        <Typography
          sx={{
            fontSize: "1.2rem",
            letterSpacing: "0.07rem",
            lineHeight: "2rem",
          }}
        >
          VITrendz is a student-run organization that was founded in the year
          2020. We are an all-in-one platform that entertains, educates, and
          helps students. We provide several services and academic resources to
          make their lives easier. We have an ever-growing student community of
          19.3K on Instagram, 6K+ on Telegram, 470 on LinkedIn, 2.3K+ on
          Discord, and 3.5K+ on Youtube.
        </Typography>
      </Stack>
    </>
  );
}
