import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Preloader from './preloader.js';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  content: {
    padding: 20,
    textAlign: 'justify',
  },
});

var Data = [];

class license extends Component {
  state = {
    preloader: false,
  };

  componentDidMount() {
    this.userData();
  }

  userData = async () => {
    try {
      const value = await AsyncStorage.getItem('User_Data');
      if (value !== null) {
        Data = JSON.parse(value);
      }
      Data[4] = 1;
      await AsyncStorage.setItem('User_Data', JSON.stringify(Data));
    } catch (e) {
      Alert.alert('Error!', 'An error occured. Try again later.', [
        {text: 'OK'},
      ]);
    }
  };

  render() {
    return this.state.preloader ? (
      <Preloader />
    ) : (
      <View style={styles.background}>
        <Text style={styles.header}>End User License Agreement</Text>
        <Text />
        <ScrollView style={{}}>
          <Text style={styles.title}>Countdown</Text>
          <Text style={{textAlign: 'center', fontSize: 16}}>
            {'\u00A9'} Countdown Production Ltd.
          </Text>
          <Text style={styles.content}>
            PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE USING
            COUNTDOWN PRODUCTIONS, LLC APP. BY USING THE COUNTDOWN, LLC APP YOU
            SIGNIFY YOUR AGREEMENT TO THESE TERMS OF USE including how we settle
            disputes between us. This app is owned and operated by Countdown
            Productions, LLC on its own behalf or in combination with any of its
            subsidiaries (collectively, “Company” or “we,” “us,” or “our”),
            which are all part of the entertainment operations of Countdown
            Financing, LLC (the “Parent Company”). Your use of Company app is
            subject to the following terms and conditions of use (“Terms of
            Use”). If you do not agree to these Terms of Use please do not use
            the Company app. We reserve the right to update or modify these
            Terms of Use at any time. Your continuing use of the Company app
            following the posting of any such updates or modifications means you
            have accepted those changes. We may add, change, discontinue, remove
            or suspend any of the Company app materials at any time, without
            notice and without liability. The information contained on this app
            is for informational and entertainment purposes and is subject to
            change at any time without notice. By accessing or linking to this
            app, you assume the risk that the information on this app may be
            incomplete, out of date, inaccurate, or may be inappropriate. Before
            using this app, please also review our Disclaimer.
          </Text>
          <Text style={styles.title}>DISCLAIMER</Text>
          <Text style={styles.content}>
            YOU UNDERSTAND AND AGREE THAT THE COMPANY WEBSITE AND ALL MATERIALS
            ON THE COMPANY APP ARE PROVIDED "AS IS" AS AVAILABLE “WITH ALL
            FAULTS.” TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE
            LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT
            NOT LIMITED TO, WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF
            MERCHANTABILITY, NON-INFRINGEMENT OR FITNESS FOR A PARTICULAR
            PURPOSE OR THOSE ARISING BY STATUTE OR OTHERWISE IN LAW OR FROM A
            COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT THE
            FUNCTIONS CONTAINED IN THE MATERIALS ON THE COMPANY APP WILL BE
            UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT
            THE APP OR THE SERVERS THAT MAKE SUCH MATERIALS AVAILABLE ARE FREE
            OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE DO NOT WARRANT OR MAKE
            ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF
            THE MATERIALS ON THE COMPANY WEB SITE IN TERMS OF THEIR CORRECTNESS,
            ACCURACY, RELIABILITY, OR OTHERWISE. YOU ASSUME THE ENTIRE COST OF
            ALL NECESSARY SERVICING, REPAIR, OR CORRECTION. APPLICABLE LAW MAY
            NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE
            EXCLUSION MAY NOT APPLY TO YOU. YOU MAY HAVE OTHER RIGHTS WHICH VARY
            BY JURISDICTION.
          </Text>
          <Text style={[styles.content, {color: 'red'}]}>
            ALL RESULTS OF THIS APP MAY OR MAY NOT BE REAL. PLEASE CONTINUE AT
            YOUR OWN RISK. THE COUNTDOWN PRODUCTIONS, LLC IS IN NO WAY
            RESPONSIBLE TO WHAT HAPPENS TO YOU.
          </Text>
        </ScrollView>
        <Icon
          reverse
          name="arrow-right"
          type="feather"
          color="#000"
          size={25}
          onPress={() =>
            Alert.alert(
              null,
              'I have read the user agreement and accept the terms and conditions.',
              [
                {
                  text: 'Accept',
                  onPress: () => this.setState({preloader: true}),
                },
                {
                  text: 'Cancel',
                  type: 'cancel',
                },
              ],
            )
          }
        />
      </View>
    );
  }
}

export default license;
