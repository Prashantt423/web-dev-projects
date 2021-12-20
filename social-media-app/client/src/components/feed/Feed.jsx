import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios"
import "./feed.css";


export default function Feed({ username }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = username ?
      await axios.get(`http://localhost:8800/api/post/timeline/${username}`) :
      await axios.get("http://localhost:8800/api/post/feed/61bf68044dd2ec38ead5404e")
      setPosts(res.data)
  
    };
    fetchData();
  }, [username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts && posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}