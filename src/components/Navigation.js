import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({userObj}) => (
  <nav>
     <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Link to="/" 
        style={{
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
        }}>
        <FontAwesomeIcon icon={faHome} color={"#FEBD00"} size="2x" />
        <span style={{ marginTop: 10 }}>
          {"Home"}
        </span>          
      </Link>
      <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#FEBD00"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
            ? `${userObj.displayName}의 Profile`
            : "Profile"}
          </span>
        </Link>
     </ul>
  </nav>
);
export default Navigation;