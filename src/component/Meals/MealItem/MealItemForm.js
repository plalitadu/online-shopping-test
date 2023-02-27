import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIdValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value; //this number value is always string
    const numberAmount = +enteredAmount; // convert string to number
    console.log(enteredAmount);
    if (
      enteredAmount.trim().length === 0 ||
      numberAmount < 1 ||
      numberAmount > 5
    ) {
      setAmountIsValid(false);
	  return;
    }
	props.onAddToCart(numberAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
	  {!amountIdValid && <p>Please enter a valid amout(1-5).</p>}
    </form>
  );
};

export default MealItemForm;
