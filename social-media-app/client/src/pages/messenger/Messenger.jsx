import "./messenger.css";
import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Chats from "../../components/chats/Chats";
// import Online from "../../components/online/Online";
// import TextInput from "../../components/textInput/TextInput";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
// import { io } from "socket.io-client";
export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState(null);
  const [recieversId, setRecieversId] = useState(null);
  const [recievers, setRecievers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [currentRecieverId, setCurrentRecieverId] = useState(null);
  const [currentReciever, setCurrentReciever] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);s

  useEffect(() => {
    const FetchConversations = async () => {
      try {
        const result = await axios.get(`/conversation/${user._id}`);
        setConversations(result.data);
      } catch (e) {
        console.log(e);
      }
    };

    FetchConversations();
  }, [user._id]);

  // fetch reciever datas;
  useEffect(() => {
    const fetchRecieverDatas = async () => {
      const reciever = recieversId
        ? await Promise.all(
            recieversId.map(async (id) => {
              const r = await axios.get(`/user?userId=${id}`);
              return r.data;
            })
          )
        : null;

      setRecievers(reciever);
    };

    fetchRecieverDatas();
  }, [recieversId]);

  // fetch recievers ids
  useEffect(() => {
    const recieverArray = conversations?.map((conversation) =>
      conversation?.member.find((u) => u !== user._id)
    );

    setRecieversId(recieverArray);
  }, [user._id, conversations]);

  const handleMessageRequest = async (recieverId) => {
    setCurrentRecieverId(recieverId);
    // console.log(recieverId);
    // console.log(recieverId);
    // console.log(conversations);
    const con = await conversations.find((element) =>
      element.member.includes(recieverId)
    );
    const msgs = con?._id ? await axios.get(`/messages/${con._id}`) : null;
    setMessages(msgs.data);
  };

  useEffect(() => {
    const fetchCurrentReciever = async () => {
      try {
        const res = currentRecieverId
          ? await axios.get(`/user?userId=${currentRecieverId}`)
          : "";
        setCurrentReciever(res?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentReciever();
  }, [currentRecieverId]);

  // recievers && console.log(recievers);
  // messages && console.log(messages);
  // currentReciever && console.log(currentReciever);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <input
            type="text"
            placeholder="Search for friends"
            className="searchInputBox"
          />
          {recievers &&
            recievers.map((reciever, i) => (
              <div
                key={i}
                className="chats"
                onClick={() => {
                  handleMessageRequest(reciever._id);
                }}
              >
                <img
                  className="chatsImg"
                  src={
                    reciever?.profilePic
                      ? PF + reciever.profilePic
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="chatsText">{reciever?.username}</span>
              </div>
            ))}
        </div>
        <div className="chatBox">
          {messages ? (
            <Chats
              messages={messages}
              setMessage={setMessages}
              user={currentReciever}
              // setOnlineUsers={setOnlineUsers}
            />
          ) : (
            "Tap a Conversation to see messages"
          )}
        </div>
        <div className="chatOnline">
          {/* <Online onlineUsers={onlineUsers} /> */}
        </div>
      </div>
    </>
  );
}
