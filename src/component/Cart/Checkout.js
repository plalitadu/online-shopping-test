import { useState } from "react";
import Modal from "../UI/Modal";
import classes from './Checkout.module.css';
import useInput from "../../hooks/use-input";
// import classes from './Modal.module.css';

const Checkout = (props) => {
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    inputHasError: nameInputIsInvalid,
    valueInputHandler: nameInputHandler,
    valueInputBlurHandler: nameInputOnblurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    valueIsValid: enteredStreetIsValid,
    inputHasError: streetInputIsInvalid,
    valueInputHandler: streetInputHandler,
    valueInputBlurHandler: streetInputOnblurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostcode,
    valueIsValid: enteredPostcodeIsValid,
    inputHasError: postcodeInputIsInvalid,
    valueInputHandler: postcodeInputHandler,
    valueInputBlurHandler: postcodeInputOnblurHandler,
    reset: resetPostcodeInput,
  } = useInput(
    (value) =>
      !isNaN(value) &&
      parseInt(Number(value)) == value &&
      !isNaN(parseInt(value, 10))
  );

  const {
    value: enteredCity,
    valueIsValid: enteredCityIsValid,
    inputHasError: cityInputIsInvalid,
    valueInputHandler: cityInputHandler,
    valueInputBlurHandler: cityInputOnblurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  //   const enteredInputIsInvalid = enteredName.trim() !== "" && enteredStreet.trim() !== ""
  //   && enteredPostal.trim() !== '' && enteredCity.trim() !== '';

  let formIsInvalid = false;
  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostcodeIsValid &&
    enteredCityIsValid
  ) {
    formIsInvalid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsInvalid) {
      return;
    }
   
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postcode: enteredPostcode,
        city: enteredCity
    });
  };

  const nameControlClasses = `${classes.control} ${!nameInputIsInvalid ? '': classes.invalid }`;
  const streetControlClasses = `${classes.control} ${!streetInputIsInvalid ? '': classes.invalid }`;
  const postcodeControlClasses = `${classes.control} ${!postcodeInputIsInvalid ? '': classes.invalid }`;
  const cityeControlClasses = `${classes.control} ${!cityInputIsInvalid ? '': classes.invalid }`;
  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputHandler}
          onBlur={nameInputOnblurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="errortext">Name must not empty.</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputHandler}
          onBlur={streetInputOnblurHandler}
          value={enteredStreet}
        />
        {streetInputIsInvalid && (
          <p className="errortext">Street must not empty.</p>
        )}
      </div>
      <div className={postcodeControlClasses}>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          onChange={postcodeInputHandler}
          onBlur={postcodeInputOnblurHandler}
          value={enteredPostcode}
        />
        {postcodeInputIsInvalid && (
          <p className="errortext">
            Postcode must not empty & should be integer.
          </p>
        )}
      </div>
      <div className={cityeControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputHandler}
          onBlur={cityInputOnblurHandler}
          value={enteredCity}
        />
        {cityInputIsInvalid && <p>City must not empty.</p>}
      </div>
      {/* {!formIsInvalid && <p className="error-text">All Input are required.</p>} */}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsInvalid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
