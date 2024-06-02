// NotificationService.js
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationService = {
  navigationRef: null,

  setNavigation(navigationRef) {
    this.navigationRef = navigationRef;
  },

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      this.getFcmToken();
    }
  },

  async getFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.log('New FCM Token:', fcmToken);
      }
    } else {
      console.log('Existing FCM Token:', fcmToken);
    }
  },

  listenForNotifications() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);  
      if (this.navigationRef && remoteMessage.data && remoteMessage.data.type === 'lead') {
        this.navigationRef.navigate('Productdetails', remoteMessage.data.id);
      }
    });

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
          if (this.navigationRef && remoteMessage.data && remoteMessage.data.screen) {
            this.navigationRef.navigate(remoteMessage.data.screen, remoteMessage.data);
          }
        }
      });
  }
};

export default NotificationService;
