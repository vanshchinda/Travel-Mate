import React, { useState, useEffect, useContext } from "react";
import "./chatComponenets.css";
import axios from 'axios';

import {
  Box,
  Grid,
  Stack,
  Avatar,
  Typography,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import { ChatContext } from "../../context";
import { UserContext } from "../../context/userContext";

import Toast from "../Toast/Toast";
import { toast } from "react-toastify";

import { db } from "../../firebase/db";
import {
  doc,
  query,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  orderBy,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
// import Message from "./Message";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket", "polling", "flashsocket"],
  SameSite: "None",
});

function MessageOut({ messageContent }) {
  return (
    <>
      <Grid item container direction="row-reverse" sx={{ width: "100%" }}>
        <Grid
          item
          sx={{
            backgroundColor: "#D1D1E9",
            padding: "10px 20px",
            borderRadius: "20px 20px 0px 20px",
            marginBottom: "0.5rem",
            maxWidth: {
              xs: "65%",
              md: "45%",
            },
          }}
        >
          <Typography display="inline" sx={{ overflowWrap: "break-word" }}>
            {messageContent}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

function MessageIn({ messageContent }) {
  return (
    <>
      <Grid item container direction="row" sx={{ width: "100%" }}>
        <Grid
          item
          sx={{
            backgroundColor: "#E5E5F3",
            padding: "10px 20px",
            borderRadius: "20px 20px 20px 0px",
            marginBottom: "0.5rem",
            maxWidth: {
              xs: "65%",
              md: "45%",
            },
          }}
        >
          <Typography display="inline" sx={{ overflowWrap: "break-word" }}>
            {messageContent}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export function MessagesBox() {
  const [user] = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [joined, setJoined] = useState(true);

  const { currRoomId, currChatterInfo } = useContext(ChatContext);
  // eslint-disable-next-line
  const [roomId, setRoomId] = currRoomId;
  // eslint-disable-next-line
  const [chatterInfo, setchatterInfo] = currChatterInfo;

  const isMemberOf = async () => {
    const roomData = await getDoc(doc(db, "rooms", roomId));
    return roomData.data()?.members.includes(user.uid);
  };

  const notify = (type, message) => {
    toast[type](message);
  };

  useEffect(() => {
    if (roomId) {
      isMemberOf().then((res) => {
        if (res) {
          try {
            const unsub = socket.emit("join_room", roomId);
            setJoined(true);
            return unsub;
          } catch (err) {
            console.log(err);
          }
        } else {
          setJoined(false);
        }
      });
    }
    //eslint-disable-next-line
  }, [roomId]);

  const fetchMemData = async (memId) => {
    const memData = await getDoc(doc(db, "users", memId));
    return {
      memId,
      displayName: memData.data().displayName,
      photoURL: memData.data().photoURL,
      email: memData.data().email,
    };
  };

  const sendMailToUser = async (other, text) => {
    try {
      const choice = 3;

      // axios.post(`${process.env.REACT_APP_BACKEND_URL}${actionName.toLowerCase()}`, { email, password })
      axios.post(`https://travelmate-back-end.herokuapp.com/send-mail`, { other, user, choice, text })
        .then(() => {
          console.log("email sent")
        })
        .catch((error) => {
          console.log(error)
        });
    } catch (err) {
      console.log(err)
    }
  }

  const findOtherMem = async (text) => {
    const roomData = await getDoc(doc(db, "rooms", roomId));
    if (roomData.exists()) {
      let otherID = 0;
      if (roomData.data().members[0] === user.uid) otherID = 1;

      fetchMemData(roomData.data().members[otherID])
        .then((memData) => {
          sendMailToUser(memData, text)
        })
    }
  }
  const fetchSavedMessages = async () => {
    let masterArr = [];
    const q = collection(db, "rooms", roomId, "messages");

    //   onSnapshot(query(q, orderBy("timestamp", "asc")), (querySnapshot) => {
    //     querySnapshot.docs.forEach((doc) => {
    //       masterArr.push({
    //         ...doc.data(),
    //         timestamp: doc.data().timestamp.toDate(),
    //         id: doc.id
    //       });
    //     });
    //     console.log(masterArr);
    //     return masterArr;
    //   });
    // }
    const querySnapshot = await getDocs(query(q, orderBy("timestamp", "asc")));
    querySnapshot.forEach((doc) => {
      masterArr.push({
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
        id: doc.id,
      });
    });
    return masterArr;
  };

  useEffect(() => {
    if (roomId) {
      fetchSavedMessages().then((masterArr) => {
        setMessageList(masterArr);
      });
    }
    //eslint-disable-next-line
  }, [roomId]);

  const saveMessage = async (messageData) => {
    let limit = 0;
    const docSnap = await getDoc(doc(db, "rooms", roomId));
    if (docSnap.exists()) {
      limit = docSnap.data().limit;
    }

    if (limit > 0) {
      if (limit === 1) {
        notify(
          "warning",
          "Message limit exceeded! We will delete the older messages."
        );
      }
      await updateDoc(doc(db, "rooms", roomId), {
        limit: increment(-1),
      });
    } else {
      fetchSavedMessages().then(async (masterArr) => {
        let temp = masterArr[0].id;
        await deleteDoc(doc(db, "rooms", roomId, "messages", temp));
      });
    }
    await setDoc(
      doc(db, "rooms", roomId, "messages", messageData.msgId),
      messageData
    );
  };

  const sendMessage = async () => {
    try {
      if (currentMessage !== "") {
        const messageData = {
          room: roomId,
          msgId: uuidv4(),
          uid: user.uid,
          author: user.displayName,
          message: currentMessage,
          timestamp: new Date(),
        };

        socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        saveMessage(messageData);
        findOtherMem(messageData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    //eslint-disable-next-line
  }, [socket]);

  const { messageBoxInfo } = useContext(ChatContext);
  // eslint-disable-next-line
  const [messageBoxOpen, setMessageBoxOpen] = messageBoxInfo;

  function handleMessageBoxClose() {
    setMessageBoxOpen(false);
    setchatterInfo({
      displayName: null,
      photoURL: null,
    });
  }

  return (
    <>
      {!joined ? (
        <Box>
          <Typography variant="caption">This doesn't seem correct!</Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={1}
          direction={"column"}
          className="messagesBoxContainer"
          justifyContent={"space-between"}
          sx={{
            padding: {
              xs: "0",
              md: "0 1.5rem",
            },
            margin: 0,
          }}
        >
          <Grid
            item
            container
            xs={1}
            className="messageHead"
            sx={{
              alignItems: "center",
              position: {
                xs: "fixed",
                md: "relative",
              },
              zIndex: 10,
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
              sx={{
                margin: "0 2rem",
              }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Avatar
                  src={chatterInfo.photoURL}
                  sx={{ width: 48, height: 48, marginRight: "0.4rem" }}
                />
                <Stack direction="column">
                  <Typography variant={"body1"}>
                    {chatterInfo.displayName}
                  </Typography>
                  {/* <Typography variant="caption">
                    <>{currentCity.split(",")[0]}</>
                    <b> - </b>
                    <>{destinationCity.split(",")[0]}</>
                  </Typography> */}
                </Stack>
              </Stack>
              <IconButton onClick={handleMessageBoxClose}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>

          <Grid
            container
            xs
            className="messageBox"
            direction="column-reverse"
            sx={{
              height: "100%",
              flexWrap: "nowrap",
              padding: "0 20px",
              position: {
                xs: "fixed",
                md: "relative",
              },
              bottom: {
                xs: "70px",
                md: "0",
              },
              // zIndex: -1,
              overflowY: "scroll",
              overflowX: "hidden",
              paddingTop: {
                xs: "170px",
                md: "10px",
              },
            }}
          >
            {messageList
              .slice(0)
              .reverse()
              .map((messageContent) => {
                return (
                  <>
                    {user.uid === messageContent.uid ? (
                      <MessageOut
                        key={messageContent.msgId}
                        messageContent={messageContent.message}
                        roomId={roomId}
                      />
                    ) : (
                      <MessageIn
                        key={messageContent.msgId}
                        messageContent={messageContent.message}
                        roomId={roomId}
                      />
                    )}
                  </>
                );
              })}
          </Grid>

          <Stack
            spacing={1}
            className="messageInput"
            alignItems="center"
            direction="row"
            sx={{
              padding: {
                xs: "10px",
                md: "0px",
              },
              position: {
                xs: "fixed",
                md: "relative",
              },
              bottom: 0,
            }}
          >
            {/* <Avatar sx={{ width: 42, height: 42 }} /> */}

            <OutlinedInput
              placeholder="Type your message here"
              sx={{ width: "100%" }}
              type="text"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
              autoFocus={true}
              inputProps={{ maxLength: 300 }}
            />

            <IconButton
              fontSize="large"
              size="large"
              sx={{
                backgroundColor: "#001963",
                "&:hover": {
                  backgroundColor: "#103193",
                },
              }}
              onClick={sendMessage}
            >
              <SendIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
          <Toast />
        </Grid>
      )}
    </>
  );
}
