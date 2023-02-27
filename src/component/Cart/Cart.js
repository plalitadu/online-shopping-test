import react, { useContext, useState, Fragment } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didItSubmit, setDidItSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = `฿${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHanlder = async (userData) => {
    console.log('cartCtx',cartCtx.items)
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-food-88161-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItem: cartCtx.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    setIsSubmitting(false);
    setDidItSubmit(true);
    cartCtx.clearItem();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const buttonAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHanlder} onCancel={props.onClose} />
      )}
      {!isCheckout && buttonAction}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Sent the order completed!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didItSubmit && cartContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didItSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
