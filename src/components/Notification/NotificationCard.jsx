import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import { db } from "../../firebase/db";
import {
  updateDoc,
  getDoc,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

//mui
import { Box, Stack, Typography, Button } from "@mui/material";

function NotificationCard({
  currentCity,
  destinationCity,
  displayName,
  photoURL,
  reqId,
  requestorId,
  rideId,
}) {
  const [user] = useContext(UserContext);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  // eslint-disable-next-line
  const { noti, load } = useContext(NotificationContext);
  // eslint-disable-next-line
  const [loading, setLoading] = load;

  const createChatRoom = async (roomId) => {
    await setDoc(doc(db, "rooms", roomId), {
      members: [user.uid, requestorId],
      rideId: rideId,
      limit: 50,
    });
  };
  const updateUserRideRooms = async (roomId) => {
    try {
      const userRideRef = doc(db, "users", user.uid, "rides", rideId);
      await updateDoc(userRideRef, {
        rooms: arrayUnion(roomId),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const updateUserRooms = async (roomId) => {
    try {
      const userRoomRef = doc(db, "users", user.uid);
      await updateDoc(userRoomRef, {
        rooms: arrayUnion(roomId),
      });

      const requestorRoomRef = doc(db, "users", requestorId);
      await updateDoc(requestorRoomRef, {
        rooms: arrayUnion(roomId),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const sendMailToUser = async () => {
    try {
      const reqData = await getDoc(doc(db, "users", requestorId));
      const other = reqData.data();
      const choice = 2;

      // axios.post(`${process.env.REACT_APP_BACKEND_URL}${actionName.toLowerCase()}`, { email, password })
      axios.post(`https://travelmate-back-end.herokuapp.com/send-mail`, { other, user, choice })
        .catch((error) => {
          console.log(error)
        });
    } catch (err) {
      console.log(err)
    }
  }
  const handleAccept = async () => {
    setLoading(true);

    let roomId = uuidv4();
    try {
      await updateDoc(doc(db, "users", user.uid, "requests", reqId), {
        status: "active",
        roomId,
      });
      await updateDoc(doc(db, "users", requestorId), {
        sentRequests: arrayRemove(rideId),
      });
      await updateDoc(doc(db, "users", requestorId), {
        acceptedRequests: arrayUnion(rideId),
      });

      createChatRoom(roomId);
      updateUserRooms(roomId);
      updateUserRideRooms(roomId).then(() => {
        sendMailToUser();
      });
      setLoading(false);
      setAccepted(true);
    } catch (err) {
      console.log("accept err : ", err);
    }
  };

  const handleReject = async () => {
    setLoading(true);

    try {
      await deleteDoc(doc(db, "users", user.uid, "requests", reqId));
      const userRef = doc(db, "users", requestorId);
      await updateDoc(userRef, {
        sentRequests: arrayRemove(rideId),
      });
      await updateDoc(doc(db, "users", requestorId), {
        rejectedRequests: arrayUnion(rideId),
      });
      setRejected(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Stack direction="row" sx={{ mt: "0.2rem" }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "100%",
          overflow: "hidden",
          marginRight: "0.4rem",
        }}
      >
        <img src={photoURL} alt={displayName} />
      </Box>

      <Box justifyContent="center">
        <Typography>{displayName}</Typography>
        <Typography variant="caption">
          {currentCity} - {destinationCity}
        </Typography>
        {/* {loading && <Loader size={15} />} */}
        {accepted ? (
          <div>
            <Typography variant="caption" style={{ color: "green" }}>
              Request Accepted
            </Typography>
          </div>
        ) : rejected ? (
          <div>
            <Typography variant="caption" style={{ color: "red" }}>
              Request Rejected
            </Typography>
          </div>
        ) : loading ? (
          <div></div>
        ) : (
          <Box>
            <Button onClick={handleAccept}>Accept</Button>
            <Button onClick={handleReject}>Reject</Button>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

export default NotificationCard;
