import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props,ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}/>  {/* use spread operator to inherit props of input to <input> html element*/}
	 
    </div>
  );
});

export default Input;
