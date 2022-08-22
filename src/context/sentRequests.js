import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./userContext";

import { db } from "../firebase/db";
import {
  doc,
  getDoc,
  onSnapshot,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

export const SentReqContext = createContext();

const SentReqContextProvider = (props) => {
  const [user] = useContext(UserContext);
  const [sentReq, setSentReq] = useState([]);

  useEffect(() => {
    let unsub;
    if (user.authorized) {
      try {
        unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.data()) {
            if (doc.data().sentRequests) {
              setSentReq([]);

              doc.data().sentRequests.forEach((sr) => {
                rideExists(sr).then(async (res) => {
                  if (res) {
                    setSentReq((prev) => [...prev, sr]);
                  } else {
                    removeRide(sr);
                  }
                });
              });
              // setSentReq((prev) => [...prev, ...doc.data().sentRequests]);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    return () => {
      if (unsub) unsub();
    };
    // eslint-disable-next-line
  }, [user]);

  const removeRide = async (rid) => {
    await updateDoc(doc(db, "users", user.uid), {
      sentRequests: arrayRemove(rid),
    });
  };
  const rideExists = async (rideId) => {
    const docRef = doc(db, "rides", rideId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //     if (sentReq.length !== 0)
  //         sentReq.forEach((e) => {
  //             console.log(e);
  //         })
  // }, [sentReq])

  return (
    <SentReqContext.Provider value={[sentReq, setSentReq]}>
      {props.children}
    </SentReqContext.Provider>
  );
};

export default SentReqContextProvider;
