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
  Label,
  Picker
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import _isEmpty from "lodash/isEmpty";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import axios from "axios";
import styles from "./style";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: {},
      end: {},
      period: {},
      selected2: undefined
    };
  }

  //realização de logout
  logout = async () => {
    axios
      .get("http://localhost.com:4321/api/Usuarios/logout")
      .then(response => {
        console.log(response.body);
      })
      .catch(err => console.log(err));

    this.props.navigation.navigate("Login");
    await AsyncStorage.clear();
  };

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  getDateString(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let dateString = `${year}-`;
    if (month < 10) {
      dateString += `0${month}-`;
    } else {
      dateString += `${month}-`;
    }
    if (day < 10) {
      dateString += `0${day}`;
    } else {
      dateString += day;
    }

    return dateString;
  }

  getPeriod(startTimestamp, endTimestamp) {
    const period = {};
    let currentTimestamp = startTimestamp;
    while (currentTimestamp < endTimestamp) {
      const dateString = this.getDateString(currentTimestamp);
      period[dateString] = {
        color: "green",
        startingDay: currentTimestamp === startTimestamp
      };
      currentTimestamp += 24 * 60 * 60 * 1000;
    }
    const dateString = this.getDateString(endTimestamp);
    period[dateString] = {
      color: "green",
      endingDay: true
    };
    return period;
  }

  setDay(dayObj) {
    const { start, end } = this.state;
    const { dateString, day, month, year } = dayObj;
    // timestamp returned by dayObj is in 12:00AM UTC 0, want local 12:00AM
    const timestamp = new Date(year, month - 1, day).getTime();
    const newDayObj = { ...dayObj, timestamp };
    // if there is no start day, add start. or if there is already a end and start date, restart
    const startIsEmpty = _isEmpty(start);
    if (startIsEmpty || (!startIsEmpty && !_isEmpty(end))) {
      const period = {
        [dateString]: {
          color: "green",
          endingDay: true,
          startingDay: true
        }
      };
      this.setState({ start: newDayObj, period, end: {} });
    } else {
      // if end date is older than start date switch
      const { timestamp: savedTimestamp } = start;
      if (savedTimestamp > timestamp) {
        const period = this.getPeriod(timestamp, savedTimestamp);
        this.setState({ start: newDayObj, end: start, period });
      } else {
        const period = this.getPeriod(savedTimestamp, timestamp);
        this.setState({ end: newDayObj, start, period });
      }
    }
  }


  pesquisar = () => {
    let start = this.state.start.dateString
    let end = this.state.end.dateString

    let diarias = JSON.stringify(this.state.period);
    var array = diarias.split("},");

    let qte = 0;
    for (let index = 0; index <= array.length; index++) {
      qte = index;
    }
    let cidade = this.state.selected2
    this.props.navigation.navigate("EscolhaHotel",{cidade, qte, start, end})

    this.setState({
      selected2: "",
      start: {},
      end: {},
      period: {}
    })
    
  }

  render() {
    const { period } = this.state;

    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left />
          <Body>
            <Text style={styles.title}>Reservas.com</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.logout()}>
              <Text style={{ fontSize: 18, color: "white" }}>Sair</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text />
          <Text style={styles.topic}>
            Encontre as melhores opções de hospedagem
          </Text>
          <Text />
          <Form>
            <Item rounded picker>
              <Icon active name="home" />
              <Label>Cidade</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Escolha a cidade"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Curitiba" value="Curitiba" />
                <Picker.Item label="Recife" value="Recife" />
                <Picker.Item label="Salvador" value="Salvador" />
              </Picker>
            </Item>
            <Item rounded>
              <Icon active name="calendar" />
              <Label>Data de entrada</Label>
              <Input
                value={this.state.start.dateString}
              />
            </Item>
            <Item rounded>
              <Icon active name="calendar" />
              <Label>Data de saída</Label>
              <Input value={this.state.end.dateString} />
            </Item>
            <Text />
          </Form>
          <Text />
          <Text />
          <View style={styles.buttonHomeSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() =>
                this.pesquisar()
              }
            >
              <Text style={styles.buttonText}>Pesquisar hotéis</Text>
            </TouchableHighlight>
          </View>
          <Text />
          <Text />
          <Text />
          <Calendar
            onDayPress={this.setDay.bind(this)}
            markingType="period"
            markedDates={period}
          />
        </Content>
      </Container>
    );
  }
}

export default Home;
