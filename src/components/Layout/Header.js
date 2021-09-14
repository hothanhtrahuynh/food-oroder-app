import React from "react";
import mealsImage from "../../assets/meals.jpg";

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
//const tamves = require("./tamvemayman.json");


const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1> OrderMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delecious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
