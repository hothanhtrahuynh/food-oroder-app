import React, { useRef, useState } from "react";
//import useInput from "../../../hooks/use-input";
import Input from "../../UI/Card/Input";
import classes from "./MealItemForm.module.css";
//const validateData = (data) => data > 0 && data < 5;
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amount = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const amountStr = amount.current.value;
    const amountNumber = +amountStr;
    if (
      amountStr.trim().lenght === 0 ||
      (amountNumber < 1 && amountNumber > 5)
    ) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
      
      props.onAddToCart(amountNumber);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amount}
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button disabled={false}> +Add </button>{" "}
      {!amountIsValid && <p> Please entern a valid number </p>}{" "}
    </form>
  );
};

export default MealItemForm;
