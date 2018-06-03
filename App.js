import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Precios from "./src/Precios";

//Pantallas Stack Servicios
import Servicios from "./src/Servicios";
import ServicioDetalles from "./src/ServicioDetalles";

//Pantallas Stack Servicios
const ServiciosStack = createStackNavigator({
  ServiciosHome: Servicios,
  ServiciosDetalles: ServicioDetalles
});

//Pantallas Stack Tabulador
import Tabulador from "./src/Tabulador";
import Inverso from "./src/Inverso";
//Stack Tabulador
const TabuladorStack = createStackNavigator({
  TabuladorHome: Tabulador,
  Inverso: Inverso
});

export default createBottomTabNavigator(
  {
    Servicios: ServiciosStack,
    "Pantallas iPhone": Precios,
    Tabulador: TabuladorStack
  },
  {
    lazy: false,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Pantallas iPhone") {
          iconName = `cellphone-iphone${focused ? "" : ""}`;
        } else if (routeName === "Servicios") {
          iconName = `desktop-mac${focused ? "" : ""}`;
        } else if (routeName === "Tabulador") {
          iconName = `calculator${focused ? "" : ""}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "rgba(20,61,97,0.9)",
      inactiveTintColor: "gray"
    }
  }
);
