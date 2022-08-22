import React, { useEffect, useState, createContext, useCallback } from "react";

export const WindowContext = createContext();

export const WindowContextProvider = (props) => {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  // eslint-disable-next-line
  const handleWindowSizeEvent = useCallback((e) => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeEvent);
    window.addEventListener("load", handleWindowSizeEvent);

    return () => {
      window.addEventListener("resize", handleWindowSizeEvent);
      window.addEventListener("load", handleWindowSizeEvent);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <WindowContext.Provider
      value={{
        width: width,
        height: height,
      }}
    >
      {props.children}
    </WindowContext.Provider>
  );
};
