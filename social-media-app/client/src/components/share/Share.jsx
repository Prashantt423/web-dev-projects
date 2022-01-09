import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const desc = useRef();
  const { user } = useContext(AuthContext);

  const hadleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      username: user.username,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareT">
          <img className="shareProfileImg" src={PF + "person/1.jpeg"} alt="" />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <ClearIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
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
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
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
