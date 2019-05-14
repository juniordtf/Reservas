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
        url: "http://localhost:4321/hotel/" + cidade + "/" + id,
        headers: { "x-access-token": acc }
      })
      .then(response => {
        this.setState({ hotel: response.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const qteDiarias = this.props.navigation.getParam("diarias");
    const start = this.props.navigation.getParam("start");
    const end = this.props.navigation.getParam("end");
    let idHotel = this.state.hotel._id;
    let local = this.state.hotel.cidade;
    let valorTotalA = qteDiarias*this.state.hotel.valorDiaria01;
    let valorTotalB = qteDiarias*this.state.hotel.valorDiaria02;
    let quartoA = this.state.hotel.quarto01;
    let quartoB = this.state.hotel.quarto02;

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
              <Text style={styles.textRoom}>{this.state.hotel.quarto01}</Text>
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
                    uri: this.state.hotel.imagemQuarto01
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Diária: R$ {this.state.hotel.valorDiaria01}
                </Text>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Valor total: R$ {valorTotalA}
                </Text>
                <View style={{ marginLeft: 130 }}>
                  <Button
                    bordered
                    onPress={() =>
                      this.props.navigation.navigate("Checkout", {
                        quartoA,
                        qteDiarias,
                        idHotel,
                        local,
                        start,
                        end
                      })
                    }
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
              <Text style={styles.textRoom}>{this.state.hotel.quarto02}</Text>
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
                    uri: this.state.hotel.imagemQuarto02
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Diária: R$ {this.state.hotel.valorDiaria02}
                </Text>
                <Text style={{ marginBottom: 2, fontSize: 15 }}>
                  Valor total: R$ {valorTotalB}
                </Text>
                <View style={{ marginLeft: 130 }}>
                  <Button
                    bordered
                    onPress={() =>
                      this.props.navigation.navigate("Checkout", {
                        quartoB,
                        qteDiarias,
                        idHotel,
                        local,
                        start,
                        end
                      })
                    }
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
        </Content>
      </Container>
    );
  }
}

export default EscolhaQuarto;
