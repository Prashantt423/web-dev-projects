import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

export default function Post(props) {
  const [like, setLike] = useState(props.post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const date_num = props.post.createdAt;
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setIsLiked(props.post.likes.includes(currentUser._id));
  }, [props.post.likes, currentUser._id]);
  const likeHandler = () => {
    axios.put("/post/" + props.post._id + "/like", { userId: currentUser._id });
    setIsLiked(!isLiked);

    setLike((like) => (isLiked ? like - 1 : like + 1));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${props.post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [props.post.userId]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"/profile/" + props.post.username}>
              <img
                className="postProfileImg"
                src={
                  user && user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              {props.username && props.username}
            </span>
            <span className="postDate">{date_num && format(date_num)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{props.post?.desc}</span>
          <img
            className="postImg"
            src={props.post.img ? PF + props.post.img : ""}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + "like.png"}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={PF + "heart.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {props.post.comment && props.post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
