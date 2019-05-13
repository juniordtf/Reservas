import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  FlatList,
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
  Button,
  Title,
  Input,
  Form,
  Label
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import styles from "./style";

class Confirmacao extends React.Component {
  render() {
    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: "#FFF" }} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>Confirmação</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <Text />
          <Text />
          <View style={styles.buttonSection}>
            <Image source={require("../../assets/bell-menor.png")} />
            <Text />
            <Image source={require("../../assets/Reservas-menor.png")} />
          </View>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text style={{ fontWeight: "bold", fontSize: 22, marginLeft: "5%" }}>
            Reserva realizada com sucesso. Obrigado por comprar conosco!
          </Text>
          <Text />
          <Text />
          <View style={styles.confirmacaoSection}>
            <TouchableHighlight
              underlayColor="#090948"
              style={styles.buttonA}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Voltar para tela inicial</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Confirmacao;
