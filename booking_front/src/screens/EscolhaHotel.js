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

class EscolhaHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoteis: []
    };
  }

  componentDidMount() {
    this.getHoteis();
  }

  //importação da API
  getHoteis = async () => {
    const acc = await AsyncStorage.getItem("userToken");
    const cidade = this.props.navigation.getParam('cidade');

    axios
      .request({
        url: "http://localhost:4321/hotel/"+cidade,
        method: "get",
        headers: { "x-access-token": acc }
      })
      .then(response => {
        this.setState({ hoteis: response.data });
      })
      .catch(err => console.log(err));
  };

  renderItem = ({ item }) => {
    let idHotel = item._id;
    let local = item.cidade;
    const diarias = this.props.navigation.getParam('qte');
    const start = this.props.navigation.getParam('start');
    const end = this.props.navigation.getParam('end');

    return (
      <View
        style={{
          marginLeft: "5%",
          marginRight: "5%"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <Text />
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: item.imagem
              }}
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.textProduct}>{item.nome}</Text>
            <Text style={{ marginBottom: 2 }}>
              Diárias a partir de: R$ {item.valorDiaria01}
            </Text>
            <Text />
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate("EscolhaQuarto", { idHotel, local, diarias, start, end })
              }
            >
              <Text style={styles.bigBlue}>Escolher quarto</Text>
            </Button>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
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
            <Text style={styles.title}>Reservas.com</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <View>
            <FlatList 
            data={this.state.hoteis} 
            renderItem={this.renderItem}
            keyExtractor={item => item._id} 
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default EscolhaHotel;
