import React, {useEffect, useState} from "react";
import { authService, dbService } from "fbase";
import { collection, getDocs, query, where, orderBy, querySnapshot } from "@firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : "");
    const onLogOutClick = () => {
      authService.signOut();
      refreshUser();
      history.push("/");
      window.location.reload()
    };

    const getMyNweet = async() => {
       // DB 필터링
      const nweets = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid)
        );
      const querySnapshot =  await getDocs(nweets);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }
    
    const onChange = (event) => {
      const {target: {value},}  = event;
      setNewDisplayName(value);
    }
    
    const onSubmit = async (event) => {
      event.preventDefault();
      if(userObj.displayName !== newDisplayName) {
        await updateProfile(userObj, { displayName: newDisplayName });
        refreshUser();
      }
      history.push("/");
    }

    useEffect(() => {
      getMyNweet();
    })

    return (
      <div className="container">
            <input 
            type="text" 
            autoFocus 
            placeholder="닉네임 입력..." 
            onChange={onChange} 
            value={newDisplayName}
            style={{"textAlign":"center"}}
            />
            <input
            type="submit"
            onClick={onSubmit}
            value="닉네임 변경"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
          <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            로그아웃
          </span>
      </div>
    );
  };
  
  export default Profile;