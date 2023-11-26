import React, {useRef, useEffect, useImperativeHandle} from "react";
import classes from "./Input.module.css";

// ! the Input component contains a ref
// ! ref can be used to access the component and need to be passed to the parent component
// ! Then need to use React.forwardRef before the component
const Input = React.forwardRef((props, ref) => { 
    const inputRef = useRef();

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //         // !focus is the only method available in input provided by js
    //     }
    // },[])

    const activate = () => {
        inputRef.current.focus();
    }

    // ! useImperativeHandle hook
    // ! It is used to expose a ref to a parent component
    // ! It means that we can pass the ref to the parent component
    // ! We not accessing with props
    // ! It is external available outside the component
    // ! useImperativeHandle contain 2 parameters
    // ! 1. ref (external ref)
    // ! 2. callback function  
    useImperativeHandle( ref, () =>{
        // ! focus is the external name we going to use
      return {  focus: activate}
    })
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
