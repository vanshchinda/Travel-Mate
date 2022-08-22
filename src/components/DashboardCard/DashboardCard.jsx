import React, { useContext } from "react";
import "./DashboardCard.css";
import rightArrow from "../../img/ArrowLong.svg";
import deleteIcon from "../../img/trashCan.svg";
import { db } from "../../firebase/db";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { UserContext } from "../../context/userContext";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";
import { DashboardContext } from "../../context/dashboardContext";


import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function DashboardCard({ currentCity, destinationCity, date, nop, rideId }) {
  const [user] = useContext(UserContext);
  const { loader } = useContext(DashboardContext);
  // eslint-disable-next-line
  const [loading, setLoading] = loader;

  const catchError = (err) => {
    // toast.update(tid, { render: "Failed to delete ride!", type: "error", isLoading: false, autoClose: 1000 });
    notify("error", "Failed to delete ride!");
  };
  //Toast Function
  const notify = (type, message) => {
    toast[type](message);
  };
  const delRequests = async (reqId) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "requests", reqId));
    } catch (error) {
      catchError(error);
    }
  };

  const delRooms = async (roomId) => {
    try {
      const roomSnap = await getDoc(doc(db, "rooms", roomId));
      if (roomSnap.data().members.length > 0)
        roomSnap.data().members.forEach(async (uid) => {
          await updateDoc(doc(db, "users", uid), {
            rooms: arrayRemove(roomId),
          });
        });

      const snapshot = await getDocs(
        collection(db, "rooms", roomId, "messages")
      );
      snapshot.forEach(async (msg) => {
        await deleteDoc(doc(db, "rooms", roomId, "messages", msg.id));
      });
      await deleteDoc(doc(db, "rooms", roomId));
    } catch (error) {
      catchError(error);
    }
  };

  const deleteAllRideMisc = async () => {
    try {
      const userRideRef = doc(db, "users", user.uid, "rides", rideId);
      const d = await getDoc(userRideRef);

      if (d.exists()) {
        const reqArr = d.data().requests;
        const roomArr = d.data().rooms;
        reqArr.forEach((req) => {
          delRequests(req);
        });
        roomArr.forEach((room) => {
          delRooms(room);
        });
      }
      return deleteDoc(doc(db, "users", user.uid, "rides", rideId));
    } catch (error) {
      catchError(error);
    }
  };
  const deleteRide = () => {
    // tid = toast.loading("Please wait...")
    // toast.update(tid, { render: "Deleting Ride..", type: "pending", isLoading: true });
    setLoading(true);

    deleteDoc(doc(db, "rides", rideId))
      .then(() => {
        return updateDoc(doc(db, "users", user.uid), {
          rides: arrayRemove(rideId),
        });
      })
      .then(() => {
        return deleteAllRideMisc();
      })
      .then(() => {
        // toast.update(tid, { render: "Ride Deleted", type: "success", isLoading: false, autoClose: 1500 });
        setLoading(false);
        notify("success", "Ride Deleted");
      })
      .catch((err) => {
        catchError(err);
      });
  };

  // Confirm Popup
  const confirmDelete = () => {
    confirmAlert({
      message: "Do you want to delete?",
      buttons: [
        {
          label: "Yes",
          className: "yesButton",
          onClick: () => {
            // addRequest();
            deleteRide();
          },
        },
        {
          label: "No",
          className: "noButton",
          //onClick: () => alert("Cancelled"),
        },
      ],
    });
  };

  return (
    <div className="dashCardContainer">
      <div className="top-container">
        <span className="dashCity srcCity">
          {currentCity.length > 8
            ? currentCity.slice(0, 6) + "..."
            : currentCity}
        </span>
        <span>
          <img src={rightArrow} alt="arrow" />
        </span>
        <span className="dashCity desCity">
          {destinationCity.length > 8
            ? destinationCity.slice(0, 6) + "..."
            : destinationCity}
        </span>
        <span className="dashDeleteIcon" onClick={confirmDelete}>
          <img src={deleteIcon} alt="delete-icon" />
        </span>
      </div>
      <hr />
      <div className="bottom-container">
        <span className="date-container">{date}</span>
        <span className="nop-container">Passengers: {nop}</span>
      </div>
      <Toast />
    </div>
  );
}

export default DashboardCard;
