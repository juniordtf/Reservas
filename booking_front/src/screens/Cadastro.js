import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
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
  Button,
  Input,
  Form
} from "native-base";
import axios from "axios";
import styles from "./style";

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  addUser = () => {

    if(this.state.password != this.state.confirmPassword){

      Alert.alert("Confirmação de senha não confere com a senha criada!")
      this.setState({
        password: "",
        confirmPassword: ""
      });

    } else{

      const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
  
      axios({
        method: "post",
        url: "http://localhost:4321/api/Usuarios",
        data: newUser
      })
        .then(response => {
          console.log(response.data);
          this.props.navigation.navigate("Login");
        })
        .catch(function(error) {
          if (error.response) {
            Alert.alert("Nome de usuario já existente. Alterá-lo!");
            console.log(error.response.status);
          }
        });
  
      

    }


  };

  render() {
    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: '#FFF'}} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>Cadastro</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <Text style={styles.topic}>Criar conta</Text>
          <Text />
          <Card>
            <CardItem>
              <Input
                placeholder="Nome de usuário..."
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                maxLength={25}
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="E-mail..."
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                maxLength={25}
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Senha..."
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                maxLength={15}
              />
            </CardItem>
            <Text/>
            <CardItem>
              <Input
                placeholder=" Confirmar senha..."
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.confirmPassword}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                maxLength={15}
              />
            </CardItem>
            <View style={styles.buttonSection}>
              <TouchableHighlight
                underlayColor="#2A4809"
                style={styles.button}
                onPress={() => this.addUser()}
              >
                <Text style={styles.buttonText}>Criar Conta</Text>
              </TouchableHighlight>
            </View>
            <Text />
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Cadastro;
