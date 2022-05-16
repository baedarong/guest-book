import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import AuthForm from "components/AuthForm";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    const auth = getAuth();  

    const onSocialClick =  async (event) => {
      const { target: {name} } = event; // event가 발생하는 곳의 target Name;
      let provider;
      if(name === 'google') {
        provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
      }
      else if (name === 'github') {
        provider = new GithubAuthProvider();
        provider.addScope('repo');
      }
    }
    
    return (
      <div className="authContainer">
      <FontAwesomeIcon
        icon={faEnvelopeOpenText}
        color={"#FEBD00"}
        size="3x"
        style={{ marginBottom: 25 }}
      />
      <span style={{"paddingBottom": 10}}> 다롱네 방명록 (｡•̀ᴗ-)✧" </span>
      <span style={{"paddingBottom": 30}}> Instagram @darongBae </span>
        <AuthForm auth={auth}/>
        <div>
         <div className="authBtns">
          <button onClick={onSocialClick} name="google" className="authBtn">
          Google로 시작하기 <FontAwesomeIcon icon={faGoogle} /></button>     
          <button onClick={onSocialClick} name="github" className="authBtn">
          Github로 시작하기 <FontAwesomeIcon icon={faGithub} /></button>
        </div>
        </div>
        <span style={{color:"darkgray", fontSize:11, paddingTop:10}}> * 가입 절차는 게시글의 수정 및 삭제 권한을 위함입니다. </span>
        <span style={{color:"darkgray", fontSize:11, paddingTop:10}}> 이외의 개인정보는 수집되지 않습니다. </span>
      </div>
    );
  };

export default Auth;