import React from "react";

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
     isLoggedIn: false
});

export default AuthContext;