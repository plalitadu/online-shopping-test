import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const inputHasError = !enteredValueIsValid && isTouched;

  const valueInputHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () =>{
      setEnteredValue('');
      setIsTouched(false);
  }

  return{
    value: enteredValue,
    valueIsValid : enteredValueIsValid,
    inputHasError,
    valueInputHandler,
    valueInputBlurHandler,
    reset
  };
};

export default useInput;
