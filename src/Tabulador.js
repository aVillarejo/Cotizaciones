import React, { Component } from "react";
import {
  StyleSheet,
  AppRegistry,
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Alert,
  Picker
} from "react-native";
import { Button } from "react-native-elements";
import ServerURL from "./ServerURL";
export default class Repas extends Component {
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
      MO: "",
      ActivityIndicator_Loading: false
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    if (this.state.ActivityIndicator_Loading) {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>Cargando</Text>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.logoConten}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require("./Assets/logo.png")}
            />
          </View>
          <KeyboardAvoidingView behavior="padding" style={styles.keycontainer}>
            <TextInput
              placeholder="Numero de Parte: "
              placeholderTextColor="#FFF"
              returnKeyType="done"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={TextInputText =>
                this.setState({ Part: TextInputText })
              }
            />
            <TextInput
              placeholder="Mano de Obra(hrs): "
              placeholderTextColor="#FFF"
              returnKeyType="done"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={TextInputText =>
                this.setState({ MO: TextInputText })
              }
            />
          </KeyboardAvoidingView>

          <Button
            title="Cotizar"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.btn}
            containerStyle={{ marginTop: 0 }}
            onPress={this._fetchURL}
          />

          <View style={styles.register}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Registro")}
            >
              <Text style={styles.bold}>Tabulador Inverso</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _fetchURL = () => {
    if (this.state.Part != "" && this.state.MO != "") {
      this.setState({ ActivityIndicator_Loading: true }, () => {
        fetch(ServerURL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Part: this.state.Part
          })
        })
          .then(response => response.json())
          .then(responseJsonFromServer => {
            try {
              obj = responseJsonFromServer[this.state.Part];
              let subtotal = obj["Costo"] * 1.3;
              let Total = (subtotal * 1.16).toFixed(2);
              Alert.alert(
                `${obj["Descrpition"]}`,
                `Costo: ${Total}\nN. Parte: ${this.state.Part}`,
                [
                  {
                    text: "OK",
                    onPress: () => console.log("OK Pressed")
                  }
                ],
                { cancelable: false }
              );
            } catch (error) {
              Alert.alert(
                "Lo sentimos",
                "No se encontro el numero de parte",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      this.setState({
                        Part: ""
                      });
                      console.log(error);
                    }
                  }
                ],
                { cancelable: false }
              );
            }

            this.setState({ ActivityIndicator_Loading: false });
          })
          .catch(error => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
            Alert.alert(
              "Lo sentimos",
              "Ocurrio un problema al conectarse con el servidor",
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.setState({
                      Part: ""
                    });
                    console.log(error);
                  }
                }
              ],
              { cancelable: false }
            );
          });
      });
    } else {
      Alert.alert(
        "Error",
        "Proporcione un numero de parte",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed")
          }
        ],
        { cancelable: false }
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingBottom: 10
    //  backgroundColor:'rgb(90,61,123)',
  },
  logoConten: {
    //sflex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleApp: {
    // backgroundColor:'rgb(90,61,123)',
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(90,61,123)",
    width: 200,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center"
    // color :'#ffffff'
  },
  logo: {
    marginTop: 10,
    width: 350,
    height: 200
  },
  register: {
    minHeight: 90,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  registertext: {
    textAlign: "center",
    fontSize: 18,
    color: "rgba(20,61,97,0.9)",
    alignSelf: "center",
    justifyContent: "center"
  },
  bold: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(20,61,97,0.9)",
    alignSelf: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "rgba(20,61,97,0.9)",
    width: 300,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  keycontainer: {
    flexGrow: 2,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    minWidth: 300,
    flexWrap: "wrap",
    height: 50,
    backgroundColor: "rgba(31,85,135,0.8)",
    //backgroundColor: "rgba(148,114,146,0.8)",
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10
  },
  buttonContainer: {
    // backgroundColor: "#1980b9",
    backgroundColor: "rgb(90,61,123)",
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 20
  },
  loginbutton: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "700"
  }
});
