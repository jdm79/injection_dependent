import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class ConfirmButton extends Comppnent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  }
}

export default ConfirmButton;
