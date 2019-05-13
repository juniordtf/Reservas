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
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import styles from "./style";

class Reservas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserva: []
    };
  }
  componentDidMount() {
    this.getHotel();
  }

  //importação da API
  getHotel = async () => {
    const acc = await AsyncStorage.getItem("userToken");

    axios
      .request({
        method: "get",
        url: "http://localhost:4321/Reserva/",
        headers: { "x-access-token": acc }
      })
      .then(response => {
        this.setState({ reserva: response.data });
      })
      .catch(err => console.log(err));
  };

  renderItem = ({ item }) => {
      return (
        <View style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Text />
          <Text style={styles.textProduct}>{item.nome}</Text>
          <Text style={{ marginBottom: 3, marginTop: 5 }}>Cidade: {item.cidade}</Text>
          <Text style={{ marginBottom: 3 }}>
            Quarto: {item.quarto} 
          </Text>
          <Text style={{ marginBottom: 3 }}>
            Data de entrada: {item.entrada} 
          </Text>
          <Text style={{ marginBottom: 3 }}>
            Data de saída: {item.saida} 
          </Text>
          <Text style={{ marginBottom: 5 }}>
            Quantiade de diárias: {item.numDiarias} 
          </Text>
          <Text style={{ marginBottom: 7 }}>
            Valor total: R$ {item.valorTotal} 
          </Text>
          <View style={styles.line} />
        </View>
      );
  };

  render() {
    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left/>
          <Body>
            <Text style={styles.title}>Minhas Reservas</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <FlatList
              data={this.state.reserva}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default Reservas;
