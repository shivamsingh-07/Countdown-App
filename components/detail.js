import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DateIcon from 'react-native-vector-icons/Fontisto';
import {Input, Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import License from './license.js';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    color: 'rgba(0,0,0,0.6)',
  },
  form: {
    width: 350,
    alignItems: 'center',
  },
});

class detail extends Component {
  state = {
    date: new Date('1970-01-01'),
    show: false,
    license: false,
    user_name: '',
    user_place: '',
  };

  storeData = async () => {
    var Data = [
      this.state.user_name,
      this.state.date,
      this.state.user_place,
      Date.now() + Math.floor(Math.random() * new Date(this.state.date)),
      0,
    ];

    try {
      await AsyncStorage.setItem('User_Data', JSON.stringify(Data));
    } catch (e) {
      Alert.alert('Error!', 'An error occured. Try again later.', [
        {text: 'OK'},
      ]);
    }
  };

  change = (event, selectedDate) => {
    selectedDate = selectedDate || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date: selectedDate,
    });
  };

  render() {
    return this.state.license ? (
      <License />
    ) : (
      <View style={styles.background}>
        <KeyboardAvoidingView behavior="height" style={styles.form}>
          <Text style={styles.header}>Enter Your Information</Text>
          <Text />
          <Text />
          <Input
            label="Your Full Name"
            placeholder="Eg. John Doe"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            leftIconContainerStyle={{marginRight: 15, marginLeft: 5}}
            style={styles.input}
            labelStyle={{fontSize: 18}}
            onChangeText={text => this.setState({user_name: text})}
          />
          <Text />
          <Input
            label="Your Date of Birth"
            value={
              this.state.date.getDate() +
              '-' +
              (this.state.date.getMonth() + 1) +
              '-' +
              this.state.date.getFullYear()
            }
            leftIcon={<DateIcon name="date" size={20} />}
            leftIconContainerStyle={{marginRight: 15, marginLeft: 5}}
            onFocus={() => this.setState({show: true})}
            labelStyle={{fontSize: 18}}
          />
          <Text />
          <Input
            label="Your Birth City"
            placeholder="Eg. New York"
            leftIcon={{type: 'materialicons', name: 'place'}}
            leftIconContainerStyle={{marginRight: 15, marginLeft: 5}}
            style={styles.input}
            labelStyle={{fontSize: 18}}
            onChangeText={text => this.setState({user_place: text})}
          />
          <Text />
          <Text />
          <Icon
            reverse
            name="arrow-right"
            type="feather"
            color="#000"
            size={30}
            onPress={() => {
              if (this.state.user_name !== '' && this.state.user_place !== '') {
                Alert.alert(
                  null,
                  'These details cannot be re-editted.\nAre you sure ?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        {
                          this.storeData();
                          this.setState({license: true});
                        }
                      },
                    },
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                  ],
                );
              } else {
                Alert.alert('Error!', 'No field can remain empty!', [
                  {text: 'OK'},
                ]);
              }
            }}
          />
        </KeyboardAvoidingView>

        {this.state.show && (
          <DateTimePicker
            value={this.state.date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={this.change}></DateTimePicker>
        )}
      </View>
    );
  }
}

export default detail;
