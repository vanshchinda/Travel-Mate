import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader({ skeletonCount }) {
  let body = [];
  for (let i = 0; i < skeletonCount; i++) {
    body.push(
      <div className="card__container" key={i}>
        <div className="user__name">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={140} style={{ marginLeft: 22 }} />
        </div>
        <div>
          <Skeleton variant="text" width={180} style={{ marginTop: 15 }} />
          <Skeleton variant="text" width={180} style={{ marginTop: 10 }} />
          <Skeleton variant="text" width={180} style={{ marginTop: 10 }} />
          <Skeleton variant="text" width={100} style={{ marginTop: 10 }} />
        </div>
        <div>
          <Skeleton
            variant="text"
            width={100}
            height={40}
            style={{ marginLeft: 110 }}
          />
        </div>
      </div>
    );
  }

  return <div className="results">{body}</div>;
}
