import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
//import { updateCurrentUser } from "firebase/auth";

function App() {
  const [init, setIint] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName == null) {
          const userName = user.email.split("@")[0];
          user.displayName = userName;
        }
        setIsLoggedIn(user);
        setUserObj(user);
/*        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args)
        });*/
      } else {
        setIsLoggedIn(false);
      }
      setIint(true);
    });
  }, []);
  
  const refreshUser = async () => {
    await authService.updateCurrentUser(authService.currentUser);
    setUserObj(authService.currentUser);
/*    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args)
    });*/
  }

  return (
    <>
      {init ? 
        <AppRouter 
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        /> : "initializing..."}
    </>
  );
}

export default App;
