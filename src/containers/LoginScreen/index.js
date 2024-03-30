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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
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

const {height, width} = Dimensions.get('screen');

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

  Geolocation.getCurrentPosition(info => {
    setlat(info?.coords?.latitude);
    setlon(info?.coords?.longitude);
    console.log(info?.coords?.latitude, 'location data ');
  });

  useEffect(() => {
    getlocation();
  }, [lat && lon]);

  const getlocation = () => {
    axios({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBFB_A5HYqjbBxCd5eLF7oUD7_movLicUk`,
    })
      .then(response => {
        console.log(response, 'direct method');
      })
      .catch(e => {
        console.log(e.response, 'direct method');
      });
  };

  // testing start
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', email, password);
  };
  // testing end

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          source={require('../../staticdata/images/IMG-20231104-WA0002-removebg-preview 1.png')}
          style={{height: 300, width: 300}}
        />
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Sign In to Hamaragharr</Text>
        <View
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, color: '#7D8592', fontWeight: '700'}}>
            Email Address
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            //  onChangeText={text => setEmail(text)}
            //   value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={{fontSize: 14, color: '#7D8592', fontWeight: '700'}}>
            Email Address
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            //  onChangeText={text => setPassword(text)}
            //  value={password}
            secureTextEntry
          />
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'lightblue',
  },
  logocontainer: {
    marginTop: '16%',
    backgroundColor: 'pink',
    height: '14%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    backgroundColor: 'yellow',
    flexGrow: 0.6,
    width: '90%',
    padding : 20,
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
    marginBottom: 20,
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
