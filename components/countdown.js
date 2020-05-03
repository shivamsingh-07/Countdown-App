import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  timer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 100,
  },
  text: {
    fontSize: 20,
    paddingBottom: 20,
    paddingLeft: 5,
  },
});

let Time;
var Data = [];

class countdown extends Component {
  state = {
    year: 0,
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  };

  componentDidMount() {
    this.getData();
    var ID = setInterval(() => {
      var now = new Date().getTime();

      var distance = Time - now;

      this.setState({
        year: Math.floor(distance / (1000 * 60 * 60 * 24 * 365)),
        day: Math.floor(
          (distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24),
        ),
        hour: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) {
        clearInterval(ID);
      }
    }, 1000);
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('User_Data');
      if (value !== null) {
        Data = JSON.parse(value);
        Time = Data[3];
      }
    } catch (e) {
      Alert.alert('Error!', 'An error occured. Try again later.', [
        {text: 'OK'},
      ]);
    }
  };

  render() {
    return (
      <View style={styles.timer}>
        <View style={{alignItems: 'flex-end'}}>
          {/* Year Block */}
          <View style={styles.block}>
            <Text
              style={[
                styles.time,
                {color: this.state.year > 0 ? 'white' : 'red'},
              ]}>
              {this.state.year > 0 ? this.state.year : '00'}
            </Text>
            <Text
              style={[
                styles.text,
                {color: this.state.year > 0 ? 'white' : 'red'},
              ]}>
              YRS
            </Text>
          </View>

          {/* Day Block */}
          <View style={styles.block}>
            <Text
              style={[
                styles.time,
                {color: this.state.day > 0 ? 'white' : 'red'},
              ]}>
              {this.state.day > 0 ? this.state.day : '00'}
            </Text>
            <Text
              style={[
                styles.text,
                {color: this.state.day > 0 ? 'white' : 'red'},
              ]}>
              DAY
            </Text>
          </View>

          {/* Hour Block */}
          <View style={styles.block}>
            <Text
              style={[
                styles.time,
                {color: this.state.hour > 0 ? 'white' : 'red'},
              ]}>
              {this.state.hour > 0 ? this.state.hour : '00'}
            </Text>
            <Text
              style={[
                styles.text,
                {color: this.state.hour > 0 ? 'white' : 'red'},
              ]}>
              HRS
            </Text>
          </View>

          {/* Min Block */}
          <View style={styles.block}>
            <Text
              style={[
                styles.time,
                {color: this.state.min > 0 ? 'white' : 'red'},
              ]}>
              {this.state.min > 0 ? this.state.min : '00'}
            </Text>
            <Text
              style={[
                styles.text,
                {color: this.state.min > 0 ? 'white' : 'red'},
              ]}>
              MIN
            </Text>
          </View>

          {/* Sec Block */}
          <View style={styles.block}>
            <Text
              style={[
                styles.time,
                {color: this.state.sec > 0 ? 'white' : 'red'},
              ]}>
              {this.state.sec > 0 ? this.state.sec : '00'}
            </Text>
            <Text
              style={[
                styles.text,
                {color: this.state.sec > 0 ? 'white' : 'red'},
              ]}>
              SEC
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default countdown;
