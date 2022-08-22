import React, { useEffect, useState, useContext } from "react";
import "./chatComponenets.css";

import {
  Box,
  Stack,
  Avatar,
  Grid,
  Typography,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

import { RoomsContext } from "../../context/roomsContext";
import { ChatContext } from "../../context/chatContext";
import { WindowContext } from "../../context";

// import Loader from "../../components/Loader/Loader";

const Person = ({
  displayName,
  photoURL,
  roomId,
  handleRoomChange,
  currentCity,
  destinationCity,
}) => {
  return (
    <div
      onClick={() =>
        handleRoomChange(
          roomId,
          displayName,
          photoURL,
          currentCity,
          destinationCity
        )
      }
    >
      <Grid
        item
        container
        sx={{
          height: "74px",
          marginBottom: "10px",
          borderBottom: "1px solid #313131",
          padding: "0 8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            item
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Avatar
              src={photoURL}
              sx={{ width: 48, height: 48, marginRight: "0.4rem" }}
            />
            <Stack direction="column">
              <Typography variant={"body1"}>{displayName}</Typography>
              <Typography variant="caption">
                <>{currentCity.split(",")[0]}</>
                <b> - </b>
                <>{destinationCity.split(",")[0]}</>
              </Typography>
            </Stack>
          </Grid>
          {/* <Grid
            item
            sx={{
              height: "32px",
              width: "32px",
              borderRadius: "20px",
              backgroundColor: "#001963",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            2
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
};

export const Conversations = () => {
  const { roomData, loading } = useContext(RoomsContext);
  const [roomsData] = roomData;
  const [roomLoading] = loading;

  const [cardData, setCardData] = useState([]);
  const [chatsCount, setChatsCount] = useState(0);
  const { width } = useContext(WindowContext);

  const { currRoomId, currChatterInfo, messageBoxInfo } =
    useContext(ChatContext);
  // eslint-disable-next-line
  const [roomId, setRoomId] = currRoomId;
  // eslint-disable-next-line
  const [chatterInfo, setchatterInfo] = currChatterInfo;
  const [messageBoxOpen, setMessageBoxOpen] = messageBoxInfo;
  const [messageBoxOpenActive, setMessageBoxOpenActive] = useState(false);

  const handleRoomChange = (roomId, displayName, photoURL) => {
    setRoomId(roomId);
    setchatterInfo({
      displayName: displayName,
      photoURL: photoURL,
    });
    setMessageBoxOpenActive(true);
  };

  useEffect(() => {
    if (width < 900 && messageBoxOpenActive) {
      setMessageBoxOpen(true);
    }
    if (!messageBoxOpen) {
      setMessageBoxOpenActive(false);
    }
    return () => {
      if (width < 900 && messageBoxOpenActive) {
        setMessageBoxOpen(true);
      }
    };
    // eslint-disable-next-line
  }, [messageBoxOpenActive, messageBoxOpen]);

  useEffect(() => {
    setCardData([]);

    if (roomsData.length) {
      const x = roomsData
        .slice(0)
        .reverse()
        .map((room, i) => {
          return (
            <Person
              key={i}
              currentCity={room.currentCity}
              destinationCity={room.destinationCity}
              displayName={room.displayName}
              photoURL={room.photoURL}
              reqId={room.reqId}
              roomId={room.roomId}
              handleRoomChange={handleRoomChange}
            />
          );
        });

      setCardData(x);
      setChatsCount(x.length);
    }
    // eslint-disable-next-line
  }, [roomsData]);

  const [filterResults, setFilterResults] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const filterSearch = () => {
    if (searchValue === null || searchValue === "") {
      setFilterResults(null);
    } else {
      setFilterResults(
        roomsData
          .slice(0)
          .reverse()
          .filter((room) => {
            return (
              room.displayName
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              room.destinationCity
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
          .map((room, i) => {
            return (
              <Person
                key={i}
                currentCity={room.currentCity}
                destinationCity={room.destinationCity}
                displayName={room.displayName}
                photoURL={room.photoURL}
                reqId={room.reqId}
                roomId={room.roomId}
                handleRoomChange={handleRoomChange}
              />
            );
          })
      );
    }
  };

  useEffect(() => {
    filterSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <Grid
      container
      direction={"column"}
      columns={22}
      className="Convcontainer"
      sx={{
        flexWrap: "nowrap",
      }}
    >
      <Grid item xs={1}>
        <Typography variant="h6">Conversations</Typography>
      </Grid>
      <Grid item xs={1}>
        <OutlinedInput
          placeholder="Username or Destination City"
          sx={{ width: "100%" }}
          type="text"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && filterSearch();
          }}
          autoFocus={false}
        />
      </Grid>
      <Grid
        item
        className="conversationsContainer"
        sx={{
          borderTop: "1px solid #313131",
          marginTop: "10px",
          overflowX: "hidden",
          overflowY: "scroll",
          flexWrap: "nowrap",
          height: "100%",
        }}
      >
        {roomLoading ? (
          // <Loader />
          // <Stack direction="row">
          //   <Skeleton variant="circular" height={"48px"} width={"48px"} />
          //   <Skeleton variant="rectangular" height={"74px"} width="100%" />
          // </Stack>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            {chatsCount ? (
              <>{filterResults ? filterResults : cardData}</>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="button">No Chats!</Typography>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};
