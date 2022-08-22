import React, { useEffect, useState, useContext } from "react";
import { NotificationContext } from "../../context/notificationContext";
import Loader from "../../components/Loader/Loader";
import NotificationCard from "./NotificationCard";

//mui
import { Box, Divider, Typography } from "@mui/material";

export const Notification = () => {
  const { noti, load } = useContext(NotificationContext);
  const [notificationData] = noti;
  const [loading] = load;

  const [cardData, setCardData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(notificationData);
    setCardData([]);
    if (notificationData.length) {
      const pendingReq = notificationData.filter(
        (notification) => notification.status === "pending"
      );

      const x = pendingReq.map((notification, i) => {
        return (
          <>
            <NotificationCard
              key={i}
              currentCity={notification.currentCity}
              destinationCity={notification.destinationCity}
              displayName={notification.displayName}
              photoURL={notification.photoURL}
              reqId={notification.reqId}
              requestorId={notification.requestorId}
              rideId={notification.rideId}
            />
            <Divider />
          </>
        );
      });

      setCardData(x);
      setNotificationCount(x.length);
    }
  }, [notificationData]);

  return (
    <Box
      sx={{
        padding: "10px",
        maxHeight: {
          xs: "100%",
          md: "50vh",
        },
        overflowY: "auto",
      }}
    >
      {/* Notifications: {notificationCount} */}
      {loading ? (
        <Loader size={20} />
      ) : (
        <Box>
          {notificationCount ? (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Notifications
              </Typography>
              <Divider />
              {cardData}
            </>
          ) : (
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              No Notifications
            </Typography>
          )}
        </Box>
      )}
      {/* {loading && <Loader />} */}
    </Box>
  );
};
