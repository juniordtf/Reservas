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

class EscolhaQuarto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: []
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

  renderItem = ({ item }) => {
    const qteDiarias = this.props.navigation.getParam('diarias');
    const start = this.props.navigation.getParam('start');
    const end = this.props.navigation.getParam('end');
    let idHotel = item._id;
    let local = item.cidade;
    let valorTotalA = qteDiarias*item.valorDiaria01;
    let valorTotalB = qteDiarias*item.valorDiaria02;
    let quartoA = item.quarto01;
    let quartoB = item.quarto02;
    return (
      <View>
        <View
          style={{
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View>
              <Text style={styles.textRoom}>{item.quarto01}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Text />
              <View>
                <Image
                  style={{ width: 90, height: 90 }}
                  source={{
                    uri: item.imagemQuarto01
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Diária: R$ {item.valorDiaria01}
                </Text>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Valor total: R$ {valorTotalA}
                </Text>
                <View style={{ marginLeft: 130 }}>
                  <Button
                    bordered
                    onPress={() => this.props.navigation.navigate("Checkout",{quartoA,qteDiarias,idHotel,local,start,end})}
                  >
                    <Text style={styles.bigBlueRoom}> Reservar </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.line} />
        </View>
        <View
          style={{
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Text />
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View>
              <Text style={styles.textRoom}>{item.quarto02}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Text />
              <View>
                <Image
                  style={{ width: 90, height: 90 }}
                  source={{
                    uri: item.imagemQuarto02
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Diária: R$ {item.valorDiaria02}
                </Text>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Valor total: R$ {valorTotalB}
                </Text>
                <View style={{ marginLeft: 130 }}>
                  <Button
                    bordered
                    onPress={() => this.props.navigation.navigate("Checkout",{quartoB,qteDiarias,idHotel,local,start,end})}
                  >
                    <Text style={styles.bigBlueRoom}> Reservar </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.line} />
        </View>
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
              data={this.state.hotel}
              renderItem={this.renderItem}
              keyExtractor={item => item.nome}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default EscolhaQuarto;
