import React, {Component} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GIF from '../images/loader.gif';
import Countdown from './countdown.js';

const styles = StyleSheet.create({
  animation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

var Data = [];

class preloader extends Component {
  state = {
    countdown: false,
  };

  componentDidMount() {
    this.userData();
    setTimeout(() => this.setState({countdown: true}), 5000);
  }

  userData = async () => {
    try {
      const value = await AsyncStorage.getItem('User_Data');
      if (value !== null) {
        Data = JSON.parse(value);
      }
      Data[4] = 2;
      await AsyncStorage.setItem('User_Data', JSON.stringify(Data));
      console.log(Data);
    } catch (e) {
      Alert.alert('Error!', 'An error occured. Try again!', [{text: 'OK'}]);
    }
  };

  render() {
    return this.state.countdown ? (
      <Countdown />
    ) : (
      <View style={styles.animation}>
        <Image source={GIF} style={{width: 250, height: 250}} />
      </View>
    );
  }
}

export default preloader;
