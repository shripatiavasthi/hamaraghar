import React, { useState , useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { navigate, Screens } from '../../helpers/Screens';
import { unwrapResult } from '@reduxjs/toolkit'
import {verify_otp_email} from '../../Slices/VerifyEmailOtpSlice'
import {verify_otp_phone } from '../../Slices/VerifyPhoneOtpSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('screen')

const VerifyEmailorPhone = (props) => {

  const { navigation } = props

  const image = { image: require("../../staticdata/images/BackgroundImage.png") }

  const [Number, setNumber] = useState('');
  const [errorNumber, setErrorNumber] = useState(null);
  const [Email, setEmail] = useState('');

  const [errorEmail, setErrorEmail] = useState(null);
  const [Password, setPassword] = useState('');

  const _emailValidate = email => {
    var emailRegex = /^[0-9]+$/;
    if (email === '') {
      setErrorEmail('*Please enter email.');
    } else if (!emailRegex.test(email)) {
      setErrorEmail('*Please enter valid email.');
    } else {
      setErrorEmail(null);
    }
  }
  
  const _numbervalidate = number => {
    var numberRegex =
      /^[0-9]+$/;
    if (number === '') {
      setErrorNumber('*Please enter number.');
    } else if (/([A-Z]+)/g.test(number) && number.length < 8) {
      setErrorNumber(
        '*Please enter a special character and length must be 8 digit.',
      );
    } else if (!numberRegex.test(number)) {
      setErrorNumber('*Please enter valid number.');
    } else {
      setErrorNumber(null);
    }
  };

  const [email, setemail] = useState()
  const [phone , setphone] = useState()

  useEffect(() => {
      EmailLocal()
      Phone()
  }, [])


  const EmailLocal = async () => {
      try {
          const value = await AsyncStorage.getItem('Email')
          if (value !== null) {
              // value previously stored
              setemail(value)
              console.log(value, "fetching data")
          }
      } catch (e) {
          // error reading value
      }
  }

  const Phone = async () => {
      try {
          const value = await AsyncStorage.getItem('phone')
          if (value !== null) {
              // value previously stored
              setphone(value)
              console.log(value, "fetching data")
          }
      } catch (e) {
          // error reading value
      }
  }

  console.log(Email , Number , "<<<<<<")

  const OTPemail = async () => {
      const data = {
          query: {},
          body: {
              email: email,
              otp : Email
          }
      }
      const resp = await props?.verifyOtpEmail(data)
      const rawData = await unwrapResult(resp)
      console.log(rawData, "verify Email Otp Response")
      if(rawData?.data?.message === 'Success'){
          navigation.push(Screens.Avatar)
      }else{
        alert(`${rawData?.data?.error}`)
      }
  }

  const OTPphone = async () => {
      const data = {
          query: {},
          body: {
              phone: phone,
              otp : Number
          }
      }
      const resp = await props?.verifyOtpPhone(data)
      const rawData = await unwrapResult(resp)
      console.log(rawData, "verify phone Otp Response")
  }


  return (
    <View style={styles.mainContinter}>
      {/* <ScrollView> */}
        <ImageBackground source={image.image} style={styles.MainDiv}>
          <View style={styles.titleCon}>
            <Text style={styles.titTxt}>Verify your e-mail or phone</Text>
          </View>
          <View style={styles.dtailCon}>
            <Text style={styles.detTxt}>
            We have sent you an OTP please check your email / phone and verify</Text>
          </View>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.usercon}>
              <TextInput
                style={styles.useText}
                placeholder='enter email OTP'
                placeholderTextColor={'#000000'}
                onChangeText={txt => {
                  setEmail(txt), _emailValidate(txt);
                }}
              />
              {errorEmail != null ? (
                <View
                  style={styles.redCon}>
                  <Text
                    style={styles.redTxt}>
                    {errorEmail}
                  </Text>
                </View>
              ) : null}
              <View style={styles.passcon}>
                <TextInput
                  style={styles.useText}
                  placeholder='enter phone OTP'
                  placeholderTextColor={'#000000'}
                  maxLength={10}
                  onChangeText={txt => {
                    setNumber(txt), _numbervalidate(txt);
                  }}
                />
                {errorNumber != null ? (
                  <View
                    style={styles.redCon}>
                    <Text
                      style={styles.redTxt}>
                      {errorNumber}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.forgotCon}>
          </View>
          <View style={styles.titleCons}>
            <TouchableOpacity style={styles.btnCon} 
                 onPress={() => {
                    OTPemail()
                    OTPphone()
                }}
            >
              <Text style={styles.btnTxt}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forCon}>
            <TouchableOpacity onPress={() => {
              navigation.push(Screens.Avatar)
            }}>
              <Text style={styles.anTxt}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContinter: {
    flex: 1,
    // backgroundColor: 'cyan',
  },
  MainDiv: {
    height: height * 0.92,
    width: width / 1,
    // backgroundColor: 'lightblue',
  },
  titleCon: {
    height: height / 6,
    width: width / 1.35,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    // alignItems: 'center',    
    alignSelf: 'center',

  },

  dtailCon: {
    // height: height / 7,
    width: width / 1.35,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    // alignItems: 'center',    
    alignSelf: 'center',

  },

  titTxt: {
    fontSize: height / 21,
    // fontFamily: Montserrat,
    fontWeight: '400',
    color: '#FFFFFF'
  },
  usercon: {
    height: height / 2.11,
    width: width / 1.35,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    // alignItems: 'center',    
    alignSelf: 'center',

  },
  useText: {
    height: height / 16,
    width: width / 1.35,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    fontSize: height / 55,
    borderWidth: 0.5,
    marginBottom : 30
  },
  forgotCon: {
    height: height / 30,
    width: width / 1.4,
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  frgTxt: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFFFFF'
  },
  btnCon: {
    height: height / 16,
    width: width / 1.35,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 20
  },
  titleCons: {
    height: height / 10,
    width: width / 1.35,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    // alignItems: 'center',    
    alignSelf: 'center'
  },
  forCon: {
    height: height / 27,
    width: width / 1.35,
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  anTxt: {
    color: '#707070',
    fontSize: 13,
    color: '#FFFFFF'
  },
  redCon: {
    height: height * 0.02,
    width: width / 1.4,
    // backgroundColor: 'green',
    alignSelf: 'center'
  },
  redTxt: {
    color: 'red',
    fontSize: 13,
  },
  detTxt: {
    color: '#FFFFFF',
    fontSize: 15,

  }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        verifyOtpEmail: (data) => {
            return  dispatch(verify_otp_email(data));
        },
        verifyOtpPhone: (data) => {
            return  dispatch(verify_otp_phone(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailorPhone)