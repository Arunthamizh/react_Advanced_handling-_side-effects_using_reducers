import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ! this will create a infinate loop
  // ! Because when update the useState the function will be called again and react render the component(infinate loop)
  // if(storedUserLoggedInInformation === '1'){
  //   setIsLoggedIn(true);
  // }

  // ! useEffect will run after component re-evaluation is done by react
  // ! If dependency('[]') are not mentioned the useEffect will run only once when app starts

  // ! This will fix the infinate loop by using useEffect
  // ! useEffect will be called only once when the component is mounted and after component re-evaluation
  // ! If we pass an empty array as the second argument, useEffect will be called every time the component is re-rendered
  // ! If we pass an array with a value, useEffect will be called only when the value in the array changes
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment>
    //  ! In provider props we can add values prop and pass it to all the components
    // 
    <AuthContext.Provider 
      value={
      {isLoggedIn: isLoggedIn}
      }>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
    // </React.Fragment>
  );
}

export default App;
