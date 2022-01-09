import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const params = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get(
        `http://localhost:8800/api/user/?username=${params.username}`
      );
      setUser(resp.data);
    };
    fetchUser();
  }, [params.username]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPic ? user.coverPic : PF + "person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePic ? user.profilePic : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{params.username}</h4>
              <span className="profileInfoDesc">
                {user && user.desc ? user.desc : "Hello my friends!"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed noShareComponent={true} username={params.username} />
            {user && <Rightbar profile user={user} />}
          </div>
        </div>
      </div>
    </>
  );
}
