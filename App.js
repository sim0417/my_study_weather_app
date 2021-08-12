import React from 'react';
import Loading from './components/loading';
import { Alert, Text } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = 'e2e41e4ae74c3339b0b1ab184943a746';

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const BASE_URL = `http://api.openweathermap.org/data/2.5/weather`;
    const URL = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const { data } = await axios.get(URL);
    console.log(data);
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      const weather = this.getWeather(latitude, longitude);

      this.setState({ isLoading: false });
    } catch (err) {
      console.log(err.message);
      Alert.alert(`Can't find location`, `Location Error`);
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : <Text>Load weather info</Text>;
  }
}
