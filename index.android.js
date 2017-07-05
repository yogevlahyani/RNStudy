import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationAndroid from 'react-native-push-notification'


export default class RNStudy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkText: 'CHECK',
      isView: false,
      date: Date(Date.now() + (480 * 1000))
    };

  }

  componentWillMount() {
    let that = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          console.log( 'TOKEN:', token );
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
          that.setState({
            isView: true
          });
      },
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM SENDER ID",
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });

    /*
    PushNotificationAndroid.registerNotificationActions(['Yes','No']);
    DeviceEventEmitter.addListener('notificationActionReceived', function(action) {
      const info = JSON.parse(action.dataJSON);
      console.log ('Notification action received:: ', info.action);
      if (info.action == 'Yes') {
        that.setState({
          checkText: 'Accepted!!! Response: ' + info.action,
          isView: true
        });
      } else if (info.action == 'No') {
        that.setState({
          checkText: 'Rejected!!! Response: ' + info.action,
          isView: true
        });
      }
    });
    */

  }

  componentDidMount() {

  }

  _checkNotification = () => {

    PushNotification.localNotification({
      /* Android Only Properties */
      //id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: null, // (optional) default: null
      userInfo: null, // (optional) default: null (object containing additional notification data)

      /* iOS and Android properties */
      title: "Notification title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      message: "My Notification Message", // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //number: '15', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'time', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      repeatTime: 5000,
      //actions: "['Yes','No']",  // (Android only) See the doc for notification actions to know more
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this._checkNotification}>
          Send a Notification
        </Text>
        <Text style={styles.instructions} onPress={() => { PushNotification.cancelAllLocalNotifications() }}>
          Cancel all notifications
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text>{ this.state.date }</Text>
        <Text>
          { this.state.isView ? this.state.checkText : 'SRAT' }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNStudy', () => RNStudy);
