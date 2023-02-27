import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealImage from '../../assets/meal.jpg';
const Header = (props) => {


  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Online Shopping</h1>
        <HeaderCartButton onConfirm={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
		  <img src={mealImage} alt="A Japan Meal"/>
	  </div>
    </React.Fragment>
  );
};

export default Header;
