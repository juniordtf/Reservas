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

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      cidade: "",
      nome: "",
      numDiarias: "",
      quarto: "",
      entrada: "",
      saida: "",
      valorTotal: ""
    };
  }

  componentDidMount() {
    this.getHotel();
  }

  //importação da API
  getHotel = async () => {
    const acc = await AsyncStorage.getItem("userToken");
    const cidade = this.props.navigation.getParam("local");
    const id = this.props.navigation.getParam("idHotel");

    axios
      .request({
        method: "get",
        url: "http://localhost:4321/hotel/" + cidade + "?" + id,
        headers: { "x-access-token": acc }
      })
      .then(response => {
        this.setState({ hotel: response.data });
      })
      .catch(err => console.log(err));
  };

    //realizacao da Reserva
    Reserva = async () => {
      const acc = await AsyncStorage.getItem("userToken");

      const dados = {
        cidade: this.state.cidade,
        nome: this.state.nome,
        numDiarias: this.state.numDiarias,
        quarto: this.state.quarto,
        entrada: this.state.entrada,
        saida: this.state.saida,
        valorTotal: this.state.valorTotal
      };
  
      await axios
        .request({
          method: "post",
          url: "http://localhost:4321/Reserva",
          headers: { "x-access-token": acc },
          data: dados
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    };

        //realizacao da Reserva
        Confirmar = () => {
          this.Reserva();
          this.props.navigation.navigate("Confirmacao")
        }

  renderItem = ({ item }) => {
    const qteDiarias = this.props.navigation.getParam("qteDiarias");
    const quartoA = this.props.navigation.getParam("quartoA");
    const quartoB = this.props.navigation.getParam("quartoB");
    const start = this.props.navigation.getParam("start");
    const end = this.props.navigation.getParam("end");
    let valorTotalA = qteDiarias * item.valorDiaria01;
    let valorTotalB = qteDiarias * item.valorDiaria02;

    //Para não renderizar produtos com quantidade 0
    if (quartoA == item.quarto01) {

      this.setState({
        cidade: item.cidade,
        nome: item.nome,
        numDiarias: qteDiarias,
        quarto: item.quarto01,
        entrada: start,
        saida: end,
        valorTotal: valorTotalA
      })

      return (
        <View style={{ marginLeft: "5%", marginRight: "5%" }}>
          <View style={styles.line} />
          <Text />
          <Text style={styles.textProduct}>{item.nome}</Text>
          <Text />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View>
              <Image
                style={{ width: 150, height: 150 }}
                source={{
                  uri: item.imagem
                }}
              />
            </View>
            <Text />
            <View style={{ marginLeft: "5%" }}>
              <Image
                style={{ width: 150, height: 150 }}
                source={{
                  uri: item.imagemQuarto01
                }}
              />
            </View>
          </View>
          <Text />
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            {item.quarto01}
          </Text>
          <Text style={{ marginBottom: 5, fontSize: 15 }}>
            Data de entrada: {start}
          </Text>
          <Text style={{ marginBottom: 5, fontSize: 15 }}>
            Data de entrada: {end}
          </Text>
          <Text style={{ marginBottom: 10, fontSize: 15 }}>
            Quantidade de diárias: {qteDiarias}
          </Text>
          <Text style={{ marginBottom: 5, fontSize: 17 }}>
            Valor Total: R$ {valorTotalA}
          </Text>
          <View style={styles.line} />
        </View>
      );
    } else if (quartoB == item.quarto02) {

      this.setState({
        cidade: item.cidade,
        nome: item.nome,
        numDiarias: qteDiarias,
        quarto: item.quarto02,
        entrada: start,
        saida: end,
        valorTotal: valorTotalB
      })

      return (
      <View style={{ marginLeft: "5%", marginRight: "5%" }}>
        <View style={styles.line} />
        <Text />
        <Text style={styles.textProduct}>{item.nome}</Text>
        <Text />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: item.imagem
              }}
            />
          </View>
          <Text />
          <View style={{ marginLeft: "5%" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: item.imagemQuarto02
              }}
            />
          </View>
        </View>
        <Text />
        <Text style={{ marginBottom: 10, fontSize: 18 }}>{item.quarto02}</Text>
        <Text style={{ marginBottom: 5, fontSize: 15 }}>
          Data de entrada: {start}
        </Text>
        <Text style={{ marginBottom: 5, fontSize: 15 }}>
          Data de entrada: {end}
        </Text>
        <Text style={{ marginBottom: 10, fontSize: 15 }}>
          Quantidade de diárias: {qteDiarias}
        </Text>
        <Text style={{ marginBottom: 5, fontSize: 17 }}>
          Valor Total: R$ {valorTotalB}
        </Text>
        <View style={styles.line} />
      </View>
      );
    }
  };

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
            <Text style={styles.title}>Checkout</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <Text style={styles.topic}>Favor revisar as informações abaixo:</Text>
          <Text />
          <Text />
          <View>
            <FlatList
              data={this.state.hotel}
              renderItem={this.renderItem}
              keyExtractor={item => item.nome}
            />
          </View>
          <Text />
          <Text />
          <Text />
          <Text />
          <View style={styles.buttonHomeSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.Confirmar()}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Checkout;
