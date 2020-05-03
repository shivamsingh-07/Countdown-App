import React, {Component} from 'react';
import {View, StyleSheet, Animated, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Sound from 'react-native-sound';
import Icon from '../images/icon.png';
import Detail from './detail.js';
import License from './license.js';
import Countdown from './countdown.js';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

var whoosh = new Sound('laugh.m4a', Sound.MAIN_BUNDLE, error => {
  if (error) {
    return;
  }
});

class splash extends Component {
  state = {
    height: new Animated.Value(200),
    width: new Animated.Value(200),
    detail: false,
    license: false,
    countdown: false,
    component: 0,
  };

  async componentDidMount() {
    setTimeout(this.Animate, 1000);
    // Change which component shound be rendered
    await this.getData();
    switch (this.state.component) {
      case 0:
        setTimeout(() => this.setState({detail: true}), 1500);
        break;
      case 1:
        setTimeout(() => this.setState({license: true}), 1500);
        break;
      case 2:
        setTimeout(() => this.setState({countdown: true}), 1500);
        break;
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('User_Data');
      if (value !== null) {
        var Data = JSON.parse(value);
        this.setState({component: Data[4]});
      }
    } catch (e) {
      console.log(e);
    }
  };

  Animate = () => {
    whoosh.play();
    // whoosh.setSpeed(2);
    Animated.timing(this.state.width, {
      toValue: 10000,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.height, {
      toValue: 10000,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  render() {
    return this.state.detail ? (
      <Detail />
    ) : this.state.license ? (
      <License />
    ) : this.state.countdown ? (
      <Countdown />
    ) : (
      <View style={styles.background}>
        <Animated.Image
          source={Icon}
          style={{width: this.state.width, height: this.state.height}}
        />
      </View>
    );
  }
}

export default splash;
