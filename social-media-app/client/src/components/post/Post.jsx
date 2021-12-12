import "./post.css";
import { MoreVert } from "@mui/icons-material";

import { useState } from "react";

export default function Post({ post }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const PF= process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={post.profilePicture && post.profilePicture}
              alt=""
            />
            <span className="postUsername">
              {post.username && post.username}
            </span>
            <span className="postDate">{post.date && post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={PF+"heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment && post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
