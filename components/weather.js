import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOption = {
  2: {
    // Thunderstorm
    iconName: 'weather-lightning-rainy',
    backGround: ['#009FFF', '#ec2F4B'],
  },
  3: {
    // Drizzle
    iconName: 'weather-windy-variant',
    backGround: ['#eaafc8', '#654ea3'],
  },
  5: {
    // Rain
    iconName: 'weather-rainy',
    backGround: ['#6dd5ed', '#2193b0'],
  },
  6: {
    // Snow
    iconName: 'weather-snowy-heavy',
    backGround: ['#085078', '#85D8CE'],
  },
  7: {
    // Atmosphere
    iconName: 'weather-fog',
    backGround: ['#4A00E0', '#8E2DE2'],
  },
  8: {
    // Clouds
    iconName: 'weather-cloudy',
    backGround: ['#636FA4', '#E8CBC0'],
  },
  800: {
    // Clear
    iconName: 'weather-sunny',
    backGround: ['#38ef7d', '#11998e'],
  },
};

export default function Weather(props) {
  const { temp, tempMax, tempMin, icon, id, main } = props.data;
  const { iconName, backGround } = id === 800 ? weatherOption[id] : weatherOption[String(id)[0]];

  return (
    <LinearGradient style={styles.container} colors={backGround}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <MaterialCommunityIcons name={iconName} size={100} color="white" />
        <Text style={styles.temp}>{Math.round(temp)} °</Text>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.title}>{`Today weather is ${main}`}</Text>
        <Text style={styles.subtitle}>{`Max temp : ${Math.round(tempMax)}°`}</Text>
        <Text style={styles.subtitle}>{`Min temp : ${Math.round(tempMin)}°`}</Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  data: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    tmepMax: PropTypes.number,
    tempMin: PropTypes.number,
    icon: PropTypes.string,
    main: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  temp: {
    fontSize: 40,
    color: 'white',
  },
  title: {
    color: 'white',
    fontWeight: '300',
    fontSize: 38,
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontWeight: '400',
    fontSize: 22,
  },
});
