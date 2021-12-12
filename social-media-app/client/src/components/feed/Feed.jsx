import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios"
import "./feed.css";


export default function Feed() {
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    const  fetchData= async ()=>{
      const res= await axios.get("http://localhost:8800/api/post/timeline/6178fa66ada636cc28d295bd")
      setPosts(res.data)
      console.log(res.data)
    };
    fetchData();
  },[])
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