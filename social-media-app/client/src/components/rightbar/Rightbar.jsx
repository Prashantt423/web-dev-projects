import "./rightbar.css";
import Online from "../online/Online";

import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../context/AuthContext";
export default function Rightbar(props) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  async function handleClick() {
    try {
      if (isFollowing) {
        await axios.put(
          `http://localhost:8800/api/user/${props.user?._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: props.user._id });
      } else {
        await axios.put(
          `http://localhost:8800/api/user/${props.user?._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: props.user._id });
      }
    } catch (e) {
      console.log(e);
    }

    setIsFollowing(!isFollowing);
  }

  useEffect(() => {
    if (props.user && props.user.followers.includes(currentUser._id)) {
      setIsFollowing(true);
    }
  }, [currentUser._id, props.user]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = props.user
          ? await axios.post(
              `http://localhost:8800/api/user/friends?username=${props.user.username}`
            )
          : "";
        setFriends(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchFriends();
  }, [props.user]);
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

  const ProfileRightbar = () => {
    return (
      <>
        {currentUser.username !== props.user.username &&
          (isFollowing ? (
            <div onClick={handleClick} className="rightBarFollowButton">
              Following
            </div>
          ) : (
            <div onClick={handleClick} className="rightBarFollowButton">
              Follow <AddIcon />
            </div>
          ))}
        <div></div>
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
            friends.map((frnd, i) => {
              if (frnd) {
                return (
                  <Link key={i} to={"/profile/" + frnd ? frnd.username : ""}>
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
                );
              } else {
                return "";
              }
            })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {props.profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
