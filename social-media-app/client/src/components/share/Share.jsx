import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const [file, setFile] = useState(null);
  const desc = useRef();
  const { user } = useContext(AuthContext);

  const hadleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      username: user.username,
    };

    const doNewPost = async () => {
      try {
        console.log(newPost);
        await axios.post("/post", newPost);
      } catch (e) {}
    };

    if (file) {
      const fileName = Date.now() + file.name;
      const data = new FormData();
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
    }

    doNewPost();
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareT">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <div className="bLower">
          <form
            className="share_options"
            encType="multipart/form-data"
            onSubmit={hadleSubmit}
          >
            <label htmlFor="file" className="share_option">
              <PermMediaIcon htmlColor="tomato" className="share_icon" />
              <span className="share_optionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.value[0])}
              />
            </label>
            <div className="share_option">
              <LabelIcon htmlColor="blue" className="share_icon" />
              <span className="share_optionText">Tag</span>
            </div>
            <div className="share_option">
              <RoomIcon htmlColor="DodgerBlue" className="share_icon" />
              <span className="share_optionText">Location</span>
            </div>
            <div className="share_option">
              <EmojiEmotionsIcon htmlColor="red" className="share_icon" />
              <span className="share_optionText">Feelings</span>
              <button className="share-bt" type="share">
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
