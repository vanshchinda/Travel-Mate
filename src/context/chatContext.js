import React, { useState, createContext } from "react";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [roomId, setRoomId] = useState(null);
  const [chatterInfo, setchatterInfo] = useState({
    displayName: null,
    photoURL: null,
  });
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        currRoomId: [roomId, setRoomId],
        currChatterInfo: [chatterInfo, setchatterInfo],
        messageBoxInfo: [messageBoxOpen, setMessageBoxOpen],
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
