import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx; // use deconstructorring object to get only index 'items(to be dependency)' from cartCtx

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
	const timer = setTimeout(()=>{
		setBtnIsHighlighted(false);
	},300); //300ms is time play bump animation in css file

	return () =>{ //cleanup function to clear timer
		clearTimeout(timer)
	}

  }, [items]); // use items as a dependency

  return (
    <button className={btnClasses} onClick={props.onConfirm}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
