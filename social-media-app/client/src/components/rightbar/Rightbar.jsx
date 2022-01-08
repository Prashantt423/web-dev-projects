import "./rightbar.css";
import Online from "../online/Online";

import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../context/AuthContext";
export default function Rightbar(props) {
  const { user: currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState(null);
  useEffect(() => {
    const fetchFriends = async () => {
      const data = props.username
        ? await axios.get(
            `http://localhost:8800/api/user/friends/${props.username}`
          )
        : "";
      setFriends(data.data);
    };

    fetchFriends();
  }, [props.username]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <div className="rightBarBox">
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online />
        </ul>
      </div>
    );
  };

  const ProfileRightbar = (prop) => {
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const user = await axios.get(
            `http://localhost:8800/api/user/profile/${prop.username}`
          );

          if (user.data) {
            user.data.followers.forEach((f) => {
              if (f === currentUser._id) {
                setIsFollowing(true);
              }
            });
          }
        } catch (e) {}
      };
      fetchUserId();
    }, [prop.username]);

    const handleFollow = () => {};
    return (
      <>
        <div>
          {prop.username !== currentUser.username ? (
            isFollowing ? (
              <button className="rightBarFollowButton" onClick={handleFollow}>
                Following
              </button>
            ) : (
              <button className="rightBarFollowButton" onClick={handleFollow}>
                Follow <AddIcon />
              </button>
            )
          ) : (
            ""
          )}
        </div>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends &&
            friends.map((frnd, i) => (
              <Link key={i} to={"/profile/" + frnd.username}>
                <div className="rightbarFollowing">
                  <img
                    src={PF + "/person/1.jpeg"}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span
                    className="rightbarFollowingName"
                    style={{ textAlign: "center" }}
                  >
                    {frnd.username}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {props.profile ? (
          <ProfileRightbar username={props.username} />
        ) : (
          <HomeRightbar />
        )}
      </div>
    </div>
  );
}
