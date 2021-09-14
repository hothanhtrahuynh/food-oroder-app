import { useState } from "react";
const useInput = (validateData) => {
    const [value, setValue] = useState(1);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateData(value);
    const valueHasError = !valueIsValid && isTouched;

    const onChangeHandler = (event) => {
        const number = event.taget.value + 1;
        console.log(number);
        setValue();
    }

    const onBlurHandler = () => {
        setIsTouched(true);
    }

    const resetValue = () => {
        setValue(0);
        setIsTouched(false);
    }

    return {
        value: value,
        valueIsValid,
        valueHasError,
        onChangeHandler,
        onBlurHandler,
        resetValue
    }
}
export default useInput;