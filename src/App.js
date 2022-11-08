import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';
import AppRouter from 'components/Router';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggined, setIsLoggined] = useState(false);
  const [userObj, setUserObj] = useState("");


  useEffect(()=>{
    onAuthStateChanged(authService, (user) => {
      setInit(true);
      if (user) {
        setUserObj({
          displayName : user.displayName,
          email : user.email,
          uid : user.uid,
          photoURL : user.photoURL,
        });
        setIsLoggined(true);
        console.log(user);
      }
    });
  }, []);
  console.log(isLoggined);
  return (
    <div>
      { init ? <AppRouter userObj={userObj} isLoggined={isLoggined} /> : "initalizing"}
    </div>
  )
}

export default App;
