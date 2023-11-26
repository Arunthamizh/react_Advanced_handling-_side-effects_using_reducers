import React, { useState, useEffect } from "react";

// ! createContext is used to manage state to avoid chaining the state
// ! The createContext function is a feature provided by React
// ! That allows you to create a context object. Context in React 
// !provides a way to pass data through the component tree without having to pass props manually at every level.

// ! To use (AuthContext) we need to wrap our components with it like <AuthContext.Provider>

// ! If we added the default value to the AuthContext,
// ! We no need of the <AuthContext.Provider> and not 
// ! But with the help of provider we can change the default value

// AuthContext -> is a context object and that will contains a component
const AuthContext = React.createContext({
     isLoggedIn: false,
     onLogout: () => {},
     onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     
     useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
        if (storedUserLoggedInInformation === "1") {
          setIsLoggedIn(true);
        }
      }, []);

     const logoutHandler = () => {
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
     };
     
     const loginHandler = () => {
          localStorage.setItem("isLoggedIn", "1");
          setIsLoggedIn(true);
     };
     

     return (
          <AuthContext.Provider value={{
               isLoggedIn: isLoggedIn,
               onLogout: logoutHandler,
               onLogin: loginHandler
          }} >
               {props.children}
          </AuthContext.Provider>
     )
}

export default AuthContext;