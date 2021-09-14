import React from "react";
import classes from "./CartItem.module.css";
const CartItem = (props) => {
  const { meal } = props;

  return (
    <ul className={props.className}>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{meal.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{meal.price}</span>
            <span className={classes.amount}>x {meal.amount}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </li>
    </ul>
  );
};

export default CartItem;
