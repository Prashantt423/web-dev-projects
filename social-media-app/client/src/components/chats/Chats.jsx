import React from "react";
import "./chats.css";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { useEffect } from "react";
// import axios from "axios";
export default function Chats(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <div className="chatboxContainer">
      <div className="chatBoxTopBar">
        <img
          className="chatBoxTopBarImg"
          src={
            props.user?.profilePic
              ? PF + props.user.profilePic
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <div className="chatBoxTopBarNameContainer">
          <p className="chatName">{props.user?.username}</p>
          <p className="chatStatus">Active now</p>
        </div>
        <div className="chatBoxTopBarIconContainer">
          <CallIcon
            sx={{
              transform: "scale(1.25)",
              marginRight: "15px",
              "&:hover": { cursor: "pointer" },
            }}
          />
          <VideocamIcon
            sx={{ transform: "scale(1.5)", "&:hover": { cursor: "pointer" } }}
          />
        </div>
      </div>
      {props.messages ? (
        <div className="imessage">
          {props.messages.map((msg, i) =>
            msg?.sender === user._id ? (
              <p
                key={i}
                className={
                  props.messages[i - 1]?.sender === user._id &&
                  props.messages[i + 1]?.sender === user._id
                    ? "from-me no-tail"
                    : "from-me"
                }
              >
                {msg.text}
              </p>
            ) : (
              <p
                key={i}
                className={
                  props.messages[i - 1]?.sender !== user._id &&
                  props.messages[i + 1]?.sender !== user._id
                    ? "from-them no-tail"
                    : "from-them"
                }
              >
                {msg.text}
              </p>
            )
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
