import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import dateIcon from "../../img/dateIcon.svg";
import "./Card.css";
import PopUp from "../PopUp/PopUp";
// import Loader from "../../components/Loader/Loader";
import { Avatar } from '@mui/material';
import axios from 'axios';


import { db } from "../../firebase/db";
import { setDoc, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { SentReqContext } from "../../context/sentRequests";
// import { sendMailNoti } from "../../utils/nodeMailer";

function Card({
  currentCity,
  destinationCity,
  date,
  description,
  displayName,
  photoURL,
  userId,
  gender,
  nop,
  time,
  mode,
  rideId,
}) {
  const [user] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [sendText, setSendText] = useState("Send Request");
  const [loading, setLoading] = useState(false);
  const [sentReq] = useContext(SentReqContext);

  useEffect(() => {
    userId === user.uid ? setDisable(true) : setDisable(false);
  }, [user, userId]);

  useEffect(() => {
    if (sentReq.includes(rideId)) {
      setDisable(true);
      setSendText("Request sent ✅");
    }
    // eslint-disable-next-line
  }, [sentReq]);

  const updateuserRidesReq = async () => {
    const userRideRef = doc(db, "users", userId, "rides", rideId);
    await updateDoc(userRideRef, {
      requests: arrayUnion(user.uid + "-" + rideId),
    });
  };

  const addReq = async () => {
    await setDoc(
      doc(db, "users", userId, "requests", user.uid + "-" + rideId),
      {
        rideId,
        requestorId: user.uid,
        status: "pending",
      }
    );
    updateuserRidesReq();
  };
  const sendMailToUser = async () => {
    try {
      const reqData = await getDoc(doc(db, "users", userId));
      const other = reqData.data();
      const choice = 1;

      // axios.post(`${process.env.REACT_APP_BACKEND_URL}${actionName.toLowerCase()}`, { email, password })
      axios.post(`https://travelmate-back-end.herokuapp.com/send-mail`, { other, user, choice })
        .catch((error) => {
          console.log(error)
        });
    } catch (err) {
      console.log(err)
    }
  }
  const sendRequest = () => {
    if (user.authorized) {
      // setSendText("");
      setLoading(true);
      try {
        addReq();
        updateDoc(doc(db, "users", user.uid), {
          sentRequests: arrayUnion(rideId),
        }).then(() => {
          setLoading(false);

          if (!loading) setSendText("Request sent ✅");

          setDisable(true);
          sendMailToUser()

        });
      } catch (e) {
        console.error("Error sending req : ", e);
      }
    } else {
      console.log("Not authorized");
    }
  };

  return (
    <div
      className="card__container"
      onClick={() => {
        if (!open) {
          setOpen(true);
        }
      }}
    >
      <div className="user__name">
        <i className="user__icon">
          <Avatar
            sx={{ width: 36, height: 36, marginRight: "0.2rem" }}
            alt={displayName}
            src={photoURL}
          />
        </i>
        <span>{displayName ? displayName : "User Name"}</span>
      </div>
      <div className="user__data">
        <div>
          <i className="card__icon">
            <img src={currentLocationIcon} alt="currentLocationIcon" />
          </i>
          <span>
            {currentCity.length > 20
              ? currentCity.slice(0, 20) + "..."
              : currentCity}
          </span>
        </div>
        <div>
          <i className="card__icon">
            <img src={destinationLocationIcon} alt="destinationLocationIcon" />
          </i>
          <span>
            {destinationCity.length > 20
              ? destinationCity.slice(0, 20) + "..."
              : destinationCity}
          </span>
        </div>
        <div>
          <i className="card__icon">
            <img src={dateIcon} alt="dateIcon" />
          </i>
          <span>{date}</span>
        </div>
      </div>

      {/* Description Pop up */}

      <button className="desc__btn">Description</button>

      {open ? (
        <PopUp
          open={open}
          setOpen={setOpen}
          sendRequest={sendRequest}
          currentCity={currentCity}
          destinationCity={destinationCity}
          date={date}
          description={description}
          displayName={displayName}
          photoURL={photoURL}
          userId={userId}
          sendText={sendText}
          disable={disable}
          loading={loading}
          gender={gender}
          nop={nop}
          time={time}
          mode={mode}
        />
      ) : null}

      <div className="send__container">
        <button
          className="send-btn blue__btn"
          disabled={disable}
          onClick={sendRequest}
        >
          {sendText}
          {/* {loading && <Loader size={10} />} */}
        </button>
      </div>
    </div>
  );
}

export default Card;
