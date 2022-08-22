import React, { useContext, useEffect } from "react";

import { ChatContext, WindowContext } from "../../context";

/* Componenets */
import { Nav } from "../../components/Nav";
import { Conversations, MessagesBox } from "../../components/ChatComponents";

/* MUI */
import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

import chatIllus1 from "../../resources/images/chatIllus1.svg";

function DesktopChatSection() {
  const { currChatterInfo } = useContext(ChatContext);
  const [chatterInfo] = currChatterInfo;

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: {
            xs: "none",
            md: "block  ",
          },
        }}
      >
        <Nav />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          height: {
            xs: "100%",
            md: "calc(100% - 146px)",
          },
        }}
      >
        <Grid
          container
          direction="row"
          sx={{
            height: "100%",
          }}
          spacing={2}
          columns={16}
        >
          <Grid item height="100%" xs={16} md={4}>
            <Conversations />
          </Grid>
          <Grid
            item
            height="100%"
            xs={12}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {chatterInfo.displayName ? (
              <MessagesBox />
            ) : (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Divider />
                <Stack direction="column" alignItems="center" width="80%">
                  <Box sx={{ height: "240px", opacity: "0.8" }}>
                    <img src={chatIllus1} alt="Chat Section" />
                  </Box>
                  <Chip label="v1.0" />
                  <Typography variant="overline" fontSize="2rem">
                    Chat Section
                  </Typography>
                  <Typography variant="body1">
                    Send And Receive Messages.
                  </Typography>
                  <Typography variant="caption">
                    Latest 50 Messages are stored only
                  </Typography>
                </Stack>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export function ChatPage() {
  const { messageBoxInfo } = useContext(ChatContext);
  const [messageBoxOpen] = messageBoxInfo;

  const { width, height } = useContext(WindowContext);
  useEffect(() => {}, [width, height]);

  return (
    <Box sx={{ height: "100vh" }}>
      {messageBoxOpen && (
        <Box
          sx={{
            position: "fixed",
            height: "101vh",
            width: "100vw",
            backgroundColor: "white",
            zIndex: "5",
            padding: "20px 0 0 0",
            margin: "0px",
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <MessagesBox />
        </Box>
      )}

      <DesktopChatSection />
    </Box>
  );
}
