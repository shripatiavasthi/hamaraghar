import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Button,
  Image,
  BackHandler,
  Alert
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {postLogin} from '../../Slices/LoginSlice';
import {postUserLogin} from './loginSlice';
import {alies_exist} from '../../Slices/AliesCheckSlice';
import {navigate, Screens} from '../../helpers/Screens';
import Geolocation from '@react-native-community/geolocation';
import {
  validateName,
  _nameValidate,
  _passwordvalidate,
} from '../../helpers/CommonValidator';
import axios from 'axios';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonTextInput from '../CommonTextInput/CommonTextInput';
import IMAGES from '../Allassets/Allassets';
import {unwrapResult} from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';

const {height, width} = Dimensions.get('screen');
const TOPIC = 'MyNews';
const image = {image: require('../../staticdata/images/BackgroundImage.png')};

const LoginScreen = props => {
  const {navigation} = props;

  const [Password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const [Name, setName] = useState('');
  const [errorName, setErrorName] = useState(null);
  const [email, setemail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);

  const [lat, setlat] = useState('');
  const [lon, setlon] = useState('');

  const [fcmToken, setfcmToken] = useState('');


  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
          setfcmToken(fcmToken)
        });
    } else console.log('Not Authorization status:', authStatus);

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
              'Notification caused app to open from quit state',
          );
          console.log(remoteMessage);
     
          
            if (remoteMessage.data.type === 'lead') {
              navigation.navigate('Productdetails', {item: "33"})
            //  props.navigation.navigate(Screens.Productdetails)
              }else if(remoteMessage.data.type === 'review'){
                navigation.navigate('Review');
              }
          
          // alert(
          //   'getInitialNotification: Notification caused app to' +
          //     ' open from quit state',
          // );
        }
      });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: ' +
            'Notification caused app to open from background state',
        );
        console.log(">>>>>>>>>>>>>>>",remoteMessage);
        if (remoteMessage.data.type === 'lead') {
          navigation.navigate('Productdetails', {item: "33"})
        //  props.navigation.navigate(Screens.Productdetails)
          }else if(remoteMessage.data.type === 'review'){
            navigation.navigate('Review');
          }
        //}
        // alert(
        //   'onNotificationOpenedApp: Notification caused app to' +
        //     ' open from background state',
        // );
      }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      if (remoteMessage.data.type === 'lead') {
        navigation.navigate('Productdetails', {item: "33"})
      //  props.navigation.navigate(Screens.Productdetails)
        }else if(remoteMessage.data.type === 'review'){
          navigation.navigate('Review');
        }
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //alert('A new FCM message arrived!');
      console.log('A new FCM message arrived!', remoteMessage.data);
    //  if (remoteMessage.data.type === 'lead') {
       
    if (remoteMessage.data.type === 'lead') {
      navigation.navigate('Productdetails', {item: "33"})
    //  props.navigation.navigate(Screens.Productdetails)
      }else if(remoteMessage.data.type === 'review'){
        navigation.navigate('Review');
      }
     // }
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  const handleLogin = async () => {
    let fromBody = new FormData();
    fromBody.append('email', email);
    fromBody.append('password', Password);
    fromBody.append('device_token', fcmToken);

    const data = {
      body: fromBody,
      query: {},
      formData: true,
    };

    console.log(data, fromBody ,'direct method');


    const res = await props.doLogin(data);
    const result = await unwrapResult(res);

    if (result?.token) {
      navigation.navigate('LeadGeneration');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          source={require('../../staticdata/images/Brandlogo.png')}
          style={{height: 70, width: 170}}
        />
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Sign In to Hamaragharr</Text>
        <CommonTextInput
          headingtext={'Email Address'}
          value={email}
          onChangeText={setemail}
          placeholder="Enter your email here"
          password={false}
          rightIconShow={false}
        />
        <CommonTextInput
          headingtext={'Password'}
          value={Password}
          onChangeText={setPassword}
          placeholder="Enter password"
          password={true}
          rightIconShow={true}
        />
        <View
          style={{
            height: 55,
            paddingHorizontal: 10,
            marginBottom: 10,
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {/* <View style={styles.Inputtextfeildconatiner}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../staticdata/images/selected.png')}
                style={{height: 25, width: 25}}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: '#0A1629',
                  fontWeight: '400',
                }}>
                Remember me
              </Text>
            </View>
          </View> */}
        </View>
        <View
          style={{
            height: 73,
            paddingHorizontal: 10,
            marginBottom: 10,
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity style={styles.SIgnInButton} onPress={handleLogin}>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Sign In
            </Text>
            <Image
              source={require('../../staticdata/images/white.png')}
              style={{marginLeft: 7, height: 22, width: 25}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            paddingHorizontal: 10,
            marginBottom: 10,
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {/* <TouchableOpacity style={styles.accountButton} 
      
          >
            <Text style={{fontSize: 16, color: '#3F8CFF', fontWeight: '600'}}>
              Don’t have an account?
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F4F9FD',
  },
  logocontainer: {
    marginTop: '16%',
    height: '14%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    backgroundColor: '#fff',
    flexGrow: 0.2 / 7,
    width: '90%',
    padding: 10,
    //  justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    opacity: 0.7, // Opacity (0 is transparent, 1 is opaque)
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset (width, height)
    shadowOpacity: 0.25, // Shadow opacity (0 is transparent, 1 is opaque)
    shadowRadius: 3, // Shadow radius
    elevation: 5, // Elevation for Android (affects shadow appearance)
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
    color: '#0A1629',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  Inputtextfeildconatiner: {
    height: 40,
    width: '100%',
    borderColor: '#D8E0F0',
    // borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SIgnInButton: {
    height: 53,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#3F8CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  accountButton: {
    height: 40,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // mainContinter: {
  //     flex: 1,
  //     // backgroundColor: 'cyan',
  // },
  // MainDiv: {
  //     height: height,
  //     width: width / 1,
  //     // backgroundColor: 'lightblue',
  // },
  // titleCon: {
  //     height: height / 7,
  //     width: width / 1.4,
  //     // backgroundColor: 'cyan',
  //     justifyContent: 'flex-end',
  //     // alignItems: 'center',
  //     alignSelf: 'center'

  // },
  // titTxt: {
  //     fontSize: height / 20,
  //     // fontFamily: Montserrat,
  //     fontWeight: '400',
  //     color: '#FFFFFF'
  // },
  // usercon: {
  //     height: height / 1.8,
  //     width: width / 1.4,
  //     // backgroundColor: 'cyan',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     alignSelf: 'center',
  // },
  // useText: {
  //     height: height / 16,
  //     width: width / 1.4,
  //     marginBottom : 30,
  //     backgroundColor: '#FFFFFF',
  //     paddingHorizontal: 20,
  //     fontSize: height / 55,
  //     borderWidth: 0.5,
  //     borderRadius: 10
  // },
  // forgotCon: {
  //     height: height / 30,
  //     width: width / 1.4,
  //     // backgroundColor: 'cyan',
  //     alignSelf: 'center',
  //     justifyContent: 'center',
  //     alignItems: 'flex-end'
  // },
  // frgTxt: {
  //     fontSize: 13,
  //     fontWeight: '400',
  //     color: '#FFFFFF'
  // },
  // btnCon: {
  //     height: height / 16,
  //     width: width / 1.4,
  //     backgroundColor: '#FF4500',
  //     justifyContent: 'center',
  //     alignItems: 'center'
  // },
  // btnTxt: {
  //     color: '#FFFFFF',
  //     fontSize: 20
  // },
  // titleCons: {
  //     height: height / 15,
  //     width: width / 1.4,
  //     // backgroundColor: 'cyan',
  //     justifyContent: 'flex-end',
  //     // alignItems: 'center',
  //     alignSelf: 'center'
  // },
  // forCon: {
  //     height: height / 27,
  //     width: width / 1.4,
  //     // backgroundColor: 'cyan',
  //     alignSelf: 'center',
  //     justifyContent: 'flex-end',
  //     alignItems: 'baseline'
  // },
  // anTxt: {
  //     color: '#707070',
  //     fontSize: 18,
  //     fontWeight:'bold',

  // },
  // redCon: {
  //     height: height * 0.02,
  //     width: width / 1.4,
  //     // backgroundColor: 'green',
  //     alignSelf: 'center'
  // },
  // redTxt: {
  //     color: 'red',
  //     fontSize: 13,
  // }
});

const mapStateToProps = state => ({
  login: state.LoginSlice,
});

const mapDispatchToProps = dispatch => {
  return {
    doLogin: data => {
      return dispatch(postUserLogin(data));
    },
    aliesexist: data => {
      return dispatch(alies_exist(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
