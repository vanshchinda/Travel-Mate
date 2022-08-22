import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Zoom from "@mui/material/Zoom";
// import Loader from "../../components/Loader/Loader";
import wave from "../../img/popupWave.svg";
import userIcon from "../../img/user.svg";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import dateIcon from "../../img/dateIcon.svg";

import "./PopUp.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      direction="up"
      ref={ref}
      style={{ transitionDelay: "300ms" }}
      {...props}
    />
  );
});

const PopUp = ({
  open,
  setOpen,
  currentCity,
  destinationCity,
  date,
  description,
  displayName,
  photoURL,
  userId,
  sendText,
  disable,
  gender,
  nop,
  time,
  mode,
  sendRequest,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="title_img">
        <img
          src={photoURL ? photoURL : userIcon}
          alt="user-icon"
          className="img"
        />
        <span className="title_text">
          {displayName ? displayName : "User Name"}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container"
        >
          <img
            src={currentLocationIcon}
            alt="currentLocationIcon"
            className="icons"
          />
          <span className="pd-b">
            {currentCity.length > 20
              ? currentCity.slice(0, 20) + "..."
              : currentCity}
          </span>
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container"
        >
          <img
            src={destinationLocationIcon}
            alt="destinationLocationIcon"
            className="icons"
          />
          <span className="pd-b">
            {destinationCity.length > 20
              ? destinationCity.slice(0, 20) + "..."
              : destinationCity}
          </span>
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container"
        >
          <img src={dateIcon} alt="dateIcon" className="icons" />
          <span className="pd-b">{date}</span>
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container text_container"
        >
          <p>Time: {time}</p>
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container text_container"
        >
          <p>Mode: {mode}</p>
        </DialogContentText>
        {/* <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container text_container"
        >
          <p>Preffered Gender: {gender}</p>
        </DialogContentText> */}
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container text_container"
        >
          <p>No. of Passengers: {nop}</p>
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="info_container text_container"
        >
          <p>Description</p>
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="desc_container desc_box"
        >
          <span>{description ? description : "No description available"}</span>
        </DialogContentText>
      </DialogContent>
      <DialogContentText
        id="alert-dialog-slide-description"
        className="wave-container"
      >
        <img src={wave} alt="img" className="wave-img" />
        <DialogActions>
          <div className="send__container">
            <button
              className="send-btn blue__btn pop-up-btn"
              disabled={disable}
              onClick={sendRequest}
            >
              {sendText}
            </button>
          </div>
        </DialogActions>
      </DialogContentText>
    </Dialog>
  );
};

export default PopUp;
