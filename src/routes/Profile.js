import { authService, dbService } from "fbase";
//import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
/*
  const getMyNweets = async () => {
    const nweets = await getDocs(query(collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "asc")));
    
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);
*/
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {displayName: newDisplayName});
      refreshUser();
    }
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}  
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
    </div>
  );
};

export default Profile;