// import * as React from 'react';
// import { Provider } from 'react-redux'
// import store from './src/app/store';
// import MainNaviagtor from './src/app/MainNaviagtor';
// import { persistStore } from "redux-persist"
// import { PersistGate } from "redux-persist/integration/react"
// import { Text } from "react-native";
// import AppLevelSpinner from './src/containers/spinner/AppLevelSpinner';

// import messaging from '@react-native-firebase/messaging';
// import {PermissionsAndroid, Platform} from 'react-native';

// let persistor = persistStore(store)

// function App() {

// //   async function requestUserPermission() {
// //     const authStatus = await messaging().requestPermission();
// //     const enabled =
// //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// //     if (enabled) {
// //       console.log('Authorization status:', authStatus);
// //     }
// //   }

// //   const gettoken = async() => {
// //     const token = await messaging().getToken()
// //     console.log('Token:', token);
// //   }
// //  const getfcmtoekn = async() => {
// //   const fcmToken = await messaging().getToken();
// //   console.debug("hello world")
// //   if (fcmToken) {
// //       console.debug('Your Firebase Token is:', fcmToken);
// //     } else {
// //       console.debug('Failed', 'No token received');
// //     }
// //   }

// //   React.useEffect(()=> {
// //     requestUserPermission()
// //       gettoken()
// //       getfcmtoekn()
// //   },[])

// const requestUserPermission = async () => {
//   if (Platform.OS === 'ios') {
//     //Request iOS permission
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   } else if (Platform.OS === 'android') {
//     //Request Android permission (For API level 33+, for 32 or below is not required)
//     const res = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//   }
// }

// React.useEffect(() => {

//   getFCMToken()
// },[])

//   return (
// <Provider store={store}>
//   <PersistGate loading={<Text>Loading....</Text>} persistor={persistor}>
//     <MainNaviagtor />
//     <AppLevelSpinner/>
//   </PersistGate>
// </Provider>
//   );
// }

// export default App;

/*
 * #8 Send Notification to React Native App using
 * Firebase Cloud Messaging
 * https://aboutreact.com/react-native-notification-firebase-cloud-messaging
 */

// import React in our code
import React, {useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/app/store';
import MainNaviagtor from './src/app/MainNaviagtor';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AppLevelSpinner from './src/containers/spinner/AppLevelSpinner';
import DeviceInfo from 'react-native-device-info';

let persistor = persistStore(store);



const App = () => {
 

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              backgroundColor: '#F4F9FD',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('./src/staticdata/images/Brandlogo.png')}
              style={{height: 70, width: 170}}
            />
            <ActivityIndicator style={styles.loader} />
          </View>
        }
        persistor={persistor}>
        <MainNaviagtor />
        <AppLevelSpinner />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#307ecc',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
});

export default App;
