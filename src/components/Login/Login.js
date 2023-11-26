import React, { useEffect, useReducer, useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// ! sate contains the current state (latest state value)
// ! action contains the type of action that will change the state
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
}

const Login = (props) => {
  // ! commented because we are using useReducer
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  //  ! commented because we are using useReducer
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // * useReducer
  // ! The useReducer function will run whenever one of the dependencies changes and every component render cycle
  // ! useReducer is alternative to useEffect to overcome the limitation of useEffect
  // ! In useState we need two states to handle state value and state validity
  // ! In useReducer we need only one state to handle state value and state validity

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false
  })

  const authCtx = useContext(AuthContext);

  // * useEffect
  // ! The useEffect function will run whenever one of the dependencies changes and every component render cycle
  // ! so we don`t need to use same function in multiple places
  // ! if we mention an empty array as the second argument, useEffect will be called only once when the component is mounted
  // ! If didn't mention an array as the second argument, useEffect will be called every time the component is re-rendered

  // !  useEffect will be called every time
  // useEffect(() => {

  // })

  // ! useEffect called only once
  // useEffect(() => {

  // }, [])

  // ! useEffect
  // * commented because we are using useReducer

// !below code is for object destructuring with alias name
const { isValid: emailIsValid } = emailState;
const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier =  setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        // emailState.isValid && passwordState.isValid
        emailIsValid && passwordIsValid
      );
    }, 500);

    // * useEffect cleanup function
    // ! It will be executed before the useEffect function executes
    // ! Cleanup function will not called at first time.

    return () => {
      console.log('Clean up');
      identifier && clearTimeout(identifier);
    }
  },[emailIsValid, passwordIsValid])



  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    // setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
    //  ! The above code was commented because we are using useReducer
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
