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
import {postLogin} from '../../Slices/LoginSlice';
import {postUserLogin} from './ReviewSlice';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarReview from './StarReview';

const {height, width} = Dimensions.get('screen');

const image = {image: require('../../staticdata/images/BackgroundImage.png')};

const Review = props => {
  const {navigation} = props;

  const [Password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const [Name, setName] = useState('');
  const [errorName, setErrorName] = useState(null);
  const [email, setemail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [rating , setrationg] = useState(0)
  const [leadid , setleadid] = useState(0)

  

  useEffect(() => {
    console.log(props?.route?.params?.item , "all props in review")
    setleadid(props?.route?.params?.item)
  },[])

  const reviewsubmit = () => {
    console.log(props?.token , "token in review")
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${props?.token}`,
    );

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `http://35.154.222.142/feedback?lead_id=${leadid}&rating=${rating}&desc=${email}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const handleRatingChange = (newRating) => {
    console.log('New Rating:', newRating);
    setrationg(newRating)
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={{flexDirection:"row" , justifyContent:"space-between",alignItems:"center"}}>
      <TouchableOpacity
      style={{marginRight:30}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image
            source={require('../../staticdata/images/backarrow.png')}
            style={{height: 30, width: 30, borderRadius: 50}}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Please give feeback</Text>
        </View>
        {/* <View
          style={{
            height: 50,
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginRight: 10}}>
            <AntDesign name="staro" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10}}>
            <AntDesign name="staro" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10}}>
            <AntDesign name="staro" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10}}>
            <AntDesign name="staro" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10}}>
            <AntDesign name="staro" size={28} color="black" />
          </TouchableOpacity>
        </View> */}
        <StarReview onRatingChange={handleRatingChange} />
        <CommonTextInput
          headingtext={'Write your review'}
          value={email}
          onChangeText={setemail}
          placeholder="Enter your review here"
          password={false}
          rightIconShow={false}
        />

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
          <TouchableOpacity style={styles.SIgnInButton} onPress={reviewsubmit}>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Review Submit
            </Text>
            <Image
              source={require('../../staticdata/images/white.png')}
              style={{marginLeft: 7, height: 22, width: 25}}
            />
          </TouchableOpacity>
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
    flexGrow: 1,
    width: '100%',
    padding: 10,
    //  justifyContent: 'center',
    alignItems: 'center',
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
  token: state.loginSliceNew.token,
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
