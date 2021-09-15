import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";
const isNotEmpty = (value) => value.trim() !== "";
const isFiveChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  let formIsValid = false;

  const {
    value: nameInput,
    valueIsValid: nameInputIsValid,
    valueHasError: nameInputHasError,
    onChangeHandler: onChangeNamehandler,
    onBlurHandler: onBlurNameHandler,
    resetValue: resetName,
  } = useInput(isNotEmpty);

  const {
    value: streetInput,
    valueIsValid: streetInputIsValid,
    valueHasError: streetInputHasError,
    onChangeHandler: onChangeStreethandler,
    onBlurHandler: onBlurStreetHandler,
    resetValue: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: cityInput,
    valueIsValid: cityInputIsValid,
    valueHasError: cityInputHasError,
    onChangeHandler: onChangeCityhandler,
    onBlurHandler: onBlurCityHandler,
    resetValue: resetCity,
  } = useInput(isNotEmpty);

  const {
    value: postalCodeInput,
    valueIsValid: postalCodeInputIsValid,
    valueHasError: postalCodeInputHasError,
    onChangeHandler: onChangePostalCodehandler,
    onBlurHandler: onBlurPostalCodeHandler,
    resetValue: resetPostalCode,
  } = useInput(isFiveChar);

  formIsValid =
    nameInputIsValid &&
    streetInputIsValid &&
    postalCodeInputIsValid &&
    cityInputIsValid;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    props.onAddOrder({
      name: nameInput,
      street: streetInput,
      postal: postalCodeInput,
      city: cityInput,
    });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const enteredNameIsValidClass = `${classes.control} ${
    !nameInputHasError ? "" : classes.invalid
  }`;
  const enteredStreetIsValidClass = `${classes.control} ${
    !streetInputHasError ? "" : classes.invalid
  }`;
  const enteredPostalCodeIsValidClass = `${classes.control} ${
    !postalCodeInputHasError ? "" : classes.invalid
  }`;
  const enteredCityIsValidClass = `${classes.control} ${
    !cityInputHasError ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={enteredNameIsValidClass}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          onChange={onChangeNamehandler}
          onBlur={onBlurNameHandler}
        />
        {nameInputHasError && <p>Name must be not empty</p>}
      </div>
      <div className={enteredStreetIsValidClass}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={onChangeStreethandler}
          onBlur={onBlurStreetHandler}
        />
        {streetInputHasError && <p>Street must be not empty</p>}
      </div>
      <div className={enteredPostalCodeIsValidClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          type="text"
          onChange={onChangePostalCodehandler}
          onBlur={onBlurPostalCodeHandler}
        />
        {postalCodeInputHasError && (
          <p>Please enter a valid postal ( 5 characters long)</p>
        )}
      </div>
      <div className={enteredCityIsValidClass}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={onChangeCityhandler}
          onBlur={onBlurCityHandler}
        />
        {cityInputHasError && <p>City must be not empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
