import React from "react";
import { authService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Logout = ({userObj, refreshUser}) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    refreshUser();
    history.push("/");
    window.location.reload()
  };
  return (
    <div className="nav" onClick={onLogOutClick}>
    <FontAwesomeIcon
        icon={faDoorClosed}
        color={'rgb(255, 94, 228)'}
        size="2x"
        style={{ marginBottom: 15 }}
    />
    <span style={{"paddingBottom": 10}}> 로그아웃 </span>
  </div>
  )
};

export default Logout;