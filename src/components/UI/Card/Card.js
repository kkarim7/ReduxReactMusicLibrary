import React from "react";
import classes from "./Card.module.css";

const card = (props) => (
  <div className={classes.Card} onClick={props.clicked}>
    {props.children}
  </div>
);

export default card;
