import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import step1 from "../../resources/images/step1.svg";
import step2 from "../../resources/images/step2.svg";
import step3 from "../../resources/images/step3.svg";
import step4 from "../../resources/images/step4.svg";
import step5 from "../../resources/images/step5.svg";

export function StepsInfo() {
  const Step = ({ image, num, data }) => {
    return (
      <Stack
        display="flex"
        flexFlow="column nowrap"
        justifyContent="center"
        alignItems="center"
        width="150px"
      >
        <img src={image} alt={num} />
        <Typography class="stepsInfoHead" variant="h4">
          Step {num}
        </Typography>
        <Typography variant="body1" width="140px" sx={{ textAlign: "center" }}>
          {data}
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexFlow="column nowrap"
        sx={{
          marginTop: "10vh",
        }}
      >
        <Box>
          <Typography variant="h4">How it Works</Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          spacing={{
            xs: 2,
            sm: 4,
            md: 8,
          }}
          sx={{ margin: "4rem 0 5rem 0" }}
        >
          <Step
            image={step1}
            num={"1"}
            data={
              "Search for relevent results if nothing comes up add a request"
            }
          />
          <Step
            image={step2}
            num={"2"}
            data={"Go through the results and send a request"}
          />
          <Step
            image={step3}
            num={"3"}
            data={"Chat with the person and discuss "}
          />
          <Step
            image={step4}
            num={"4"}
            data={"Remove the request if you find someone"}
          />
          <Step image={step5} num={"5"} data={"Travel Safe.\nTravel Mate."} />
        </Stack>
      </Stack>
    </>
  );
}
