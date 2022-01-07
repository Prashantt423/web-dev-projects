import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = username
        ? await axios.get(
            `http://localhost:8800/api/post/timeline/user/${username}`
          )
        : await axios.get(`http://localhost:8800/api/post/feed/${user._id}`);
      setPosts(res.data);
    };
    fetchData();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts ? (
          posts.map((p) => <Post key={p._id} username={p.username} post={p} />)
        ) : (
          <Stack
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            direction="row"
          >
            <CircularProgress size="30px" color="inherit" />
          </Stack>
        )}
      </div>
    </div>
  );
}
