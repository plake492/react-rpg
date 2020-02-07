import React, { Component } from "react";
import Playercard from "../components/Playercard";

export default class Battle extends Component {
  render() {
    return (
      <div>
        <Playercard name="Aragorn" attack="100" defense="200" />
        <Playercard name="Gandalf" attack="100" defense="200" />
        <Playercard name="Sauron" attack="100" defense="200" />
        <Playercard name="Witchking" attack="100" defense="200" />
      </div>
    );
  }
}
