import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import Reservas from "../screens/Reservas";
import EscolhaHotel from "../screens/EscolhaHotel";
import EscolhaQuarto from "../screens/EscolhaQuarto";
import Checkout from "../screens/Checkout";
import Confirmacao from "../screens/Confirmacao";
import ConfereAuth from '../screens/ConfereAuth';


// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// login stack
const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Cadastro: {
    screen: Cadastro,
    navigationOptions: {
      header: null
    }
  },
})

// main stack
const MainStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  EscolhaHotel: {
    screen: EscolhaHotel,
    navigationOptions: {
      header: null
    }
  },
  EscolhaQuarto: {
    screen: EscolhaQuarto,
    navigationOptions: {
      header: null
    }
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      header: null
    }
  },
  Confirmacao: {
    screen: Confirmacao,
    navigationOptions: {
      header: null
    }
  }
})

const TabNavigator = createBottomTabNavigator({
  Home: { screen: MainStack },
  Reservas: { screen: Reservas },
});

// Manifest of possible screens
const Routes = createSwitchNavigator({
  confereAuth: { screen: ConfereAuth },
  LoginStack: { screen: LoginStack },
  TabNavigator: { screen: TabNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'confereAuth',
  transitionConfig: noTransitionConfig
})

export default createAppContainer(Routes)
