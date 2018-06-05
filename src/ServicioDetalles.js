import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

export default class ServicioDetalles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Part: "",
      Model: "",
      Description: "",
      Family: "",
      "Precio Lista OOW": "",
      "Core Price": "",
      Costo: "",
      "Precio Stocking Sin Orden en GSX": "",
      MO: 387.93,
      Refaccion: "",
      Subtotal: "",
      IVA: "",
      Total: ""
    };
  }
  static navigationOptions = {
    title: "Detallado"
  };
  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Part: this.props.navigation.state.params.Part,
      Model: this.props.navigation.state.params.obj.Model,
      Description: this.props.navigation.state.params.obj.Description,
      Family: this.props.navigation.state.params.obj.Family,
      "Precio Lista OOW": this.props.navigation.state.params.obj[
        "Precio Lista OOW"
      ],
      "Core Price": this.props.navigation.state.params.obj["Core Price"],
      Costo: this.props.navigation.state.params.obj.Costo,
      "Precio Stocking Sin Orden en GSX": this.props.navigation.state.params
        .obj["Precio Stocking Sin Orden en GSX"],
      Refaccion: (this.props.navigation.state.params.obj.Costo * 1.3).toFixed(
        2
      ),
      Subtotal: (
        this.props.navigation.state.params.obj.Costo * 1.3 +
        this.state.MO
      ).toFixed(2),
      IVA: (
        (this.props.navigation.state.params.obj.Costo * 1.3 + this.state.MO) *
        0.16
      ).toFixed(2),
      Total: (
        (this.props.navigation.state.params.obj.Costo * 1.3 + this.state.MO) *
        1.16
      ).toFixed(2)
    });
  }
  render() {
    console.warn(this.state);
    return (
      <View style={styles.Container}>
        <Card title={this.state.Description}>
          <ListItem
            hideChevron
            title="Mano de Obra"
            rightTitle={`$${this.state.MO}`}
            rightTitleStyle={{ marginRight: 0, color: "black" }}
          />
          <ListItem
            hideChevron
            title="Costo Refaccion"
            rightTitle={`$${this.state.Costo}`}
            rightTitleStyle={{ marginRight: 0, color: "black" }}
          />
          <ListItem
            hideChevron
            title="Refaccion +30%"
            rightTitle={`$${this.state.Refaccion}`}
            rightTitleStyle={{ marginRight: 0, color: "black" }}
          />
          <ListItem
            hideChevron
            title="Subtotal"
            rightTitle={`$${this.state.Subtotal}`}
            rightTitleStyle={{ marginRight: 0, color: "black" }}
          />
          <ListItem
            hideChevron
            title="IVA"
            rightTitle={`$${this.state.IVA}`}
            rightTitleStyle={{ marginRight: 0, color: "black" }}
          />
        </Card>
        <Card title="Total">
          <ListItem
            hideChevron
            title={this.state.Part}
            rightTitle={`$${this.state.Total}`}
            rightTitleStyle={{ marginRight: 0, color: "black" }}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center"
  }
});
