import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    props.onAddOrder({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostalCode,
      city: enteredCity,
    });

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });
  };

  const enteredNameIsValidClass = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const enteredStreetIsValidClass = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const enteredPostalCodeIsValidClass = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const enteredCityIsValidClass = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={enteredNameIsValidClass}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={enteredStreetIsValidClass}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={enteredPostalCodeIsValidClass}>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal ( 5 characters long)</p>
        )}
      </div>
      <div className={enteredCityIsValidClass}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
