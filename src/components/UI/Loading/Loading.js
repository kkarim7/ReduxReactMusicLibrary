import React from "react";
import classes from "./Loading.module.css";

const loading = () => {
  return (
    <div className={classes.Loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default loading;