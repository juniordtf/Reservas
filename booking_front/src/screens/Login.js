import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableHighlight
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Item,
  Body,
  Icon,
  Left,
  Right,
  Title,
  Input,
  Form,
  Label
} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import styles from "./style";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  //comunicação com a API para realização de Login
  allowUser = async () => {
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    await axios
      .request({
        method: "post",
        url: "http://localhost:4321/api/Usuarios/login",
        data: credentials
      })
      .then(response => {
        let user = response.data.token;
        if (response.status == 200) {
          AsyncStorage.setItem("userToken", user);
          const { navigate } = this.props.navigation;
          navigate("Home");
          this.setState({
            username: "",
            password: ""
          });
        }
      })
      .catch(function(error) {
        if (error.response) {
          Alert.alert("E-mail ou senha inválidos!");
          console.log(error.response.status);
        }
      });
  };

  //chamada a função de Login e validaçãoes de usuário 
  onSubmit = async () => {
    try {
      if (this.state.username.length == 0) {
        Alert.alert("Campo e-mail não preenchido!");
      } else if (this.state.password.length == 0) {
        Alert.alert("Campo senha não preenchido!");
      } else if (this.state.password.length <= 5) {
        Alert.alert("A senha deve ter ao menos 6 caracteres!");
      } else {
        this.allowUser();
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  //validação do e-mail
  validateUsername = () => {
    if (this.state.username == "" || this.state.username.length < 3) {
      return false;
    } else {
      return true;
    }
  };

  //validação do password
  validatePassword = () => {
    if (this.state.password == "" || this.state.password.length < 5) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left />
          <Body>
            <Text style={styles.title}>Login</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <Text />
          <Text />
          <View style={styles.buttonSection}>
            <Image source={require("../../assets/bell.png")} />
            <Text />
            <Image source={require("../../assets/Reservas.png")} />
          </View>
          <Text />
          <Text />
          <Text />
          <Form>
            <Item
              success={this.validateUsername() ? true : false}
              error={!this.validateUsername() ? true : false}
              floatingLabel
            >
              <Label>Username</Label>
              <Input
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                maxLength={25}
              />
            </Item>
            <Item
              success={this.validatePassword() ? true : false}
              error={!this.validatePassword() ? true : false}
              floatingLabel
            >
              <Label>Senha</Label>
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                maxLength={15}
              />
            </Item>
            <Text />
          </Form>
          <View style={styles.buttonSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.onSubmit()}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableHighlight>
          </View>
          <Text />
          <Button
            onPress={() => this.props.navigation.navigate("Cadastro")}
            title="Criar cadastro"
          />
        </Content>
      </Container>
    );
  }
}


export default Login;
