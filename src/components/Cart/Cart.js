import React, { useContext, useState } from "react";
import useHttp from "../../hooks/use-http";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Card/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const { error, isLoading, isDone, fetchData } = useHttp();

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hashItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckOutHandler = () => {
    setIsCheckout(true);
  };

  const addOderHandler = (newOrderUser) => {
    fetchData(
      {
        url: "https://react-http-81dd2-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        method: "POST",
        body: { user: newOrderUser, orderedItems: cartCtx.items },
      },
      (data) => {}
    );

    if (!error && !isLoading) {
      cartCtx.clearCart();
    }
  };
  const modalConfirm = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hashItem && (
        <button onClick={showCheckOutHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((meal) => (
        <CartItem
          key={meal.id}
          meal={meal}
          onAdd={cartItemAddHandler.bind(null, meal)}
          onRemove={cartItemRemoveHandler.bind(null, meal.id)}
        />
      ))}
    </ul>
  );

  let cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onAddOrder={addOderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && modalConfirm} ;
    </React.Fragment>
  );

  if (isDone) {
    cartModalContent = (
      <React.Fragment>
        <p>Successfully sent the order!</p>{" "}
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      {isLoading && <p> The order is confirming...</p>}
      {error && <p> Something went wrong here. {error}</p>}
      {cartModalContent}
    </Modal>
  );
};

export default Cart;
