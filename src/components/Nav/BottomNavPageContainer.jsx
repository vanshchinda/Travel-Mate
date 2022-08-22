import React from "react";

import { Box } from "@mui/material";

export function BottomNavPageContainer(props) {
  return (
    <Box
      sx={{
        mb: {
          xs: 7,
          md: 0,
        },
      }}
    >
      {props.children}
    </Box>
  );
}
