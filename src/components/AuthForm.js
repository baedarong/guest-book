import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = ({auth}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") setEmail(value);
        else if(name === "password") setPassword(value);
    }

    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        if(newAccount) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
      } catch(error) {
        //Firebase: Error (auth/email-already-in-use).
        if(error.message.includes('email-already-in-use')) setError("해당 계정으로 가입한 이력이 존재합니다.")
        else if (error.message.includes('account-exists-with-different-credential')) setError("다른 방식으로 가입된 계정입니다. 해당 방식으로 로그인 해주세요.")
        else setError(error.message)
      }
    }

    const toggleAccount = () => {
      setNewAccount((prev)  => !prev) // setNewAccount(!newAccount); 
    }

    return (
        <>
        <form onSubmit={onSubmit} className="container">
          <input
              className="authInput"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange} 
              style={{"textAlign":"center"}}/>
          <input
              className="authInput"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange} 
              style={{"textAlign":"center"}}/>
          <input
            type="submit"
            className="authInput authSubmit"
            value={newAccount ? "가입하기" : "로그인"}
          />
          {error && <span className="authError">{error}</span>}
          </form>
          <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "계정으로 로그인하기" : "이메일로 가입하기"}
          </span>
          
      </>
    )
}

export default AuthForm;