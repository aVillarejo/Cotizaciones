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
      Part: this.props.navigation.state.params.obj.Id,
      Nombre: this.props.navigation.state.params.obj.Nombre,
      Direccion: this.props.navigation.state.params.obj.Direccion,
      Municipio: this.props.navigation.state.params.obj.Municipio,
      Estado: this.props.navigation.state.params.obj.Estado,
      Tipo: this.props.navigation.state.params.obj.Tipo,
      Telefono: this.props.navigation.state.params.obj.Telefono,
      Correo: this.props.navigation.state.params.obj.Correo
    });
  }
  render() {
    return (
      <View style={styles.Container}>
        <Text>ServicioDetalles</Text>
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
