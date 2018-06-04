import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class ServicioDetalles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Part: "",
      Model: "",
      Descrpition: "",
      Family: "",
      "Precio Lista OOW": "",
      "Core Price": "",
      Costo: "",
      "Precio Stocking Sin Orden en GSX": "",
      MO: ""
    };
  }
  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Part: this.props.navigation.state.params.Part,
      Model: this.props.navigation.state.params.obj.Model,
      Descrpition: this.props.navigation.state.params.obj.Descrpition,
      Family: this.props.navigation.state.params.obj.Family,
      "Precio Lista OOW": this.props.navigation.state.params.obj[
        "Precio Lista OOW"
      ],
      "Core Price": this.props.navigation.state.params.obj["Core Price"],
      Costo: this.props.navigation.state.params.obj.Costo,
      "Precio Stocking Sin Orden en GSX": this.props.navigation.state.params
        .obj["Precio Stocking Sin Orden en GSX"],
      MO: ""
    });
  }
  render() {
    console.warn(this.state);
    return (
      <View style={styles.Container}>
        <Text>{this.state.Model}</Text>
        <Text>{this.state.Part}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
