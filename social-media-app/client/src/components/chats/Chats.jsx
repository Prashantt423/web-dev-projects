import React, { useEffect, useRef, useState } from "react";
import "./chats.css";
// import CallIcon from "@mui/icons-material/Call";
// import VideocamIcon from "@mui/icons-material/Videocam";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

// import { useEffect } from "react";
// import axios from "axios";
export default function Chats(props) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  // const [messageId, setMessageId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  const recieverUser = props.user?._id;
  const setMsg = props.setMessage;
  useEffect(() => {
    arrivalMessage &&
      recieverUser === arrivalMessage.sender &&
      setMsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, recieverUser, setMsg]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    // r
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [props.messages]);
  // it auto scrolls into view.

  const handleSendRequest = async () => {
    const messageId = props.messages[0]?.messageId;
    if (messageId) {
      const newMsg = {
        messageId: messageId,
        sender: user._id,
        text: newMessage,
      };
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: props.user._id,
        text: newMessage,
      });
      try {
        const res = await axios.post("/messages", newMsg);
        props.setMessage((data) => {
          return [...data, res.data];
        });
        setNewMessage("");
      } catch (e) {}
    } else {
      console.log("No message Id");
    }

    // window.location.reload();
  };

  // useEffect(() => {
  //   setMessageId();
  // }, [props.messages]);
  return (
    <>
      <div className="chatboxContainer">
        {/* <div className="chatBoxTopBar">
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
        </div> */}
        {props.messages ? (
          <div className="imessage">
            {props.messages.map((msg, i) =>
              msg?.sender === user._id ? (
                <p
                  ref={scrollRef}
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
                  ref={scrollRef}
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

            <div className="messegeWritingBox">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="write something here..."
                className="textWriterInput"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              ></textarea>
              <SendIcon
                onClick={(e) => {
                  handleSendRequest();
                }}
                color="success"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                  marginLeft: "1em",
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
