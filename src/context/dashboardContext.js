import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./userContext";
import DashboardCard from "../components/DashboardCard/DashboardCard";

import { db } from "../firebase/db";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [activeOffers, setActiveOffers] = useState([]);
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.authorized) {
      try {
        fetchData();
        setTimeout(() => {
          setLoading(false);
        }, 2300);
      } catch (err) {
        console.log("Response Fetching Error: " + err.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    onSnapshot(doc(db, "users", user.uid), (recievedReqSnap) => {
      let activeRides = [];
      setActiveOffers([]);
      if (recievedReqSnap.data().rides.length) {
        recievedReqSnap.data().rides.forEach((rideId) => {
          fetchRideData(rideId)
            .then((response) => {
              activeRides.push(response);
            })
            .then(() => {
              const x = activeRides.map((doc, i) => {
                if (
                  doc.currentCity &&
                  doc.destinationCity &&
                  doc.date &&
                  doc.nop &&
                  doc.rideId
                )
                  return (
                    <DashboardCard
                      key={Math.random(i + 1, 50 * i)}
                      currentCity={doc.currentCity.split(",")[0]}
                      destinationCity={doc.destinationCity.split(",")[0]}
                      date={doc.date}
                      nop={doc.nop}
                      rideId={doc.rideId}
                    />
                  );
                return undefined;
              });
              setActiveOffers(x);
            });
        });
      }
      //  else if (recievedReqSnap.data().rides.length === 0) {
      //   setRideLoading(false);
      // }
    });
  };

  const fetchRideData = async (rideId) => {
    const rideData = await getDoc(doc(db, "rides", rideId));
    if (
      rideData.data().currentCity &&
      rideData.data().destinationCity &&
      rideData.data().date &&
      rideData.data().nop
    )
      return {
        currentCity: rideData.data().currentCity,
        destinationCity: rideData.data().destinationCity,
        date: rideData.data().date.toDate().toDateString(),
        nop: rideData.data().nop,
        rideId,
      };
  };

  return (
    <DashboardContext.Provider
      value={{
        activeOffers,
        loader: [loading, setLoading],
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
