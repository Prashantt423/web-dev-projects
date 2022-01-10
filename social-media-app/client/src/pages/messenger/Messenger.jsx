import "./messenger.css";
import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Chats from "../../components/chats/Chats";
import Online from "../../components/online/Online";
import TextInput from "../../components/textInput/TextInput";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState(null);
  const [recievers, setRecievers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [currentRecieverId, setCurrentRecieverId] = useState(null);
  const [currentReciever, setCurrentReciever] = useState(null);
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

  useEffect(() => {
    const fetchRecievers = async () => {
      if (conversations) {
        const recieverData = await Promise.all(
          conversations.map(async (chat) => {
            const recieverId =
              chat.member[0] === user.id ? chat.member[0] : chat.member[1];
            const reciever = await axios.get(`/user?userId=${recieverId}`);
            return reciever.data;
          })
        );
        setRecievers(recieverData);
      }
    };

    fetchRecievers();
  }, [user.id, conversations]);

  const handleMessageRequest = async (recieverId) => {
    setCurrentRecieverId(recieverId);
    const msgId = conversations.map((data) => {
      if (data.member.includes(recieverId)) {
        return data._id;
      } else {
        return null;
      }
    });

    const msgs = msgId ? await axios.get(`/messages/${msgId}`) : null;
    setMessages(msgs.data);
  };

  useEffect(() => {
    const fetchCurrentReciever = async () => {
      try {
        const res = currentRecieverId
          ? await axios.get(`/user?userId=${currentRecieverId}`)
          : "";
        setCurrentReciever(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentReciever();
  }, [currentRecieverId]);

  messages && console.log(messages);
  conversations && console.log(conversations);
  recievers && console.log(recievers);
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
                    reciever.profilePic
                      ? PF + reciever.profilePic
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="chatsText">{reciever.username}</span>
              </div>
            ))}
        </div>
        <div className="chatBox">
          {messages ? <Chats messages={messages} user={currentReciever} /> : ""}
          <TextInput />
        </div>
        <div className="chatOnline">
          <Online />
          <Online />
          <Online />
          <Online />
        </div>
      </div>
    </>
  );
}
