import React, {useEffect, useState} from 'react';
import AppRouter from './Router'
import { auth, authService } from '../fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    // Adds an observer for changes to the user's sign-in state.
    // wating firebase
    onAuthStateChanged(auth, (user) => {
      if(user) setUserObj(user);
      setInit(true);
    })
  }, []);
   
  const refreshUser = () => {
    setUserObj(authService.currentUser);
  }

  return (
    <>
    {init ?
    <AppRouter 
    isLoggedIn={Boolean(userObj)} 
    userObj={userObj} 
    refreshUser={refreshUser}/> : <div className="authContainer"> 로딩중.... </div> 
    }
    </>
  );
}

export default App;
// 모든 로직을 다룰 것임
