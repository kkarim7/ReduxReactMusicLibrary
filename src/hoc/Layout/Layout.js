import React, { Component } from "react";

import classes from "./Layout.module.css";
import Spotlight from "../../containers/Spotlight/Spotlight";
import Aux from "../Aux/Aux";
import NavigationBar from "../../components/UI/NavigationBar/NavigationBar";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <NavigationBar />
        <main className={classes.LayoutContent}>
          <Spotlight />
        </main>
      </Aux>
    );
  }
}

export default Layout;
