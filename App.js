import React from 'react';
import Loading from './components/loading';
import { Alert, Text } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './components/weather';

const API_KEY = 'e2e41e4ae74c3339b0b1ab184943a746';

export default class extends React.Component {
  state = {
    isLoading: true,
    weather: null,
  };

  getWeather = async (latitude, longitude) => {
    const BASE_URL = `http://api.openweathermap.org/data/2.5/weather`;
    const URL = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const {
      data: {
        main: { temp, temp_max: tempMax, temp_min: tempMin },
        weather,
      },
    } = await axios.get(URL);
    let { icon, id, main } = weather.length === 0 ? {} : weather[0];
    this.setState({ isLoading: false, weather: { temp, tempMax, tempMin, icon, id, main } });
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (err) {
      console.log(err.message);
      Alert.alert(`Can't find location`, `Location Error`);
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, weather } = this.state;
    console.log(weather);

    return isLoading ? <Loading /> : <Weather data={weather} />;
  }
}
