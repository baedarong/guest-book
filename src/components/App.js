import React, {useEffect, useState} from 'react';
import AppRouter from './Router'
import { auth, authService } from '../fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user) setUserObj(user);
      if(user?.email === "qock6563@gmail.com") setAdmin(true);
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
    isAdmin={admin}
    userObj={userObj} 
    refreshUser={refreshUser}/> : <div className="authContainer"> 로딩중.... </div> 
    }
    </>
  );
}

export default App;
// 모든 로직을 다룰 것임
