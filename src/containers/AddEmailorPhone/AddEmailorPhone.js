// import React, { useState , useEffect } from 'react'
// import { connect } from 'react-redux'
// import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
// import { send_otp_phone } from '../../Slices/SendPhoneOtpSlice'
// import { send_otp_email } from '../../Slices/SendEmailOtpSlice'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { navigate, Screens } from '../../helpers/Screens';
// import styles from '../../css/Maincss'
// import { unwrapResult } from '@reduxjs/toolkit'

// const { height, width } = Dimensions.get('screen')

// const image = { image: require("../../staticdata/images/BackgroundImage.png") }

// export const AddEmailorPhone = (props) => {

    // const { navigation } = props

    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    

    // const OTPphone = async () => {
    //     const data = {
    //         query: {},
    //         body: {
    //             phone: phone,
    //             country_code: 5
    //         }
    //     }
    //     PhoneData(phone)
    //     const resp = await props?.sendOtpPhone(data)
    //     const rawData = await unwrapResult(resp)
    //     if(rawData){
    //         navigation.push(Screens.VerifyOtp)
    //     }
    // }

    // const OTPemail = async () => {
    //     const data = {
    //         query: {},
    //         body: {
    //             email: email
    //         }
    //     }
    //     EmailData(email)
    //     const resp = await props?.sendOtpEmail(data)
    //     const rawData = await unwrapResult(resp)
    //     console.log(rawData, "Email Otp Response")
    //     if(rawData){
    //         navigation.push(Screens.VerifyOtp)
    //     }
    // }

    // const PhoneData = async (value) => {
    //     try {
    //         await AsyncStorage.setItem('phone', value)
    //     } catch (e) {
    //         console.log(e, 'storage error')
    //     }
    // }

    // const EmailData = async (value) => {
    //     try {
    //         await AsyncStorage.setItem('Email', value)
    //     } catch (e) {
    //         console.log(e, 'storage error')
    //     }
    // }



//     return (
//         <SafeAreaView >
//             <ImageBackground source={image.image} style={styles.maindiv}>
//                 <View style={styles.FirstView}>
//                     <View style={styles.PageView}>
//                         <View style={styles.Headingdiv}>
//                             <View style={styles.headingcontainer}>
//                                 <Text style={styles.headingtext}>Add your e-mail or phone</Text>
//                             </View>
//                             <View style={styles.headingcontainer}>
//                                 <Text style={styles.subheadingtext}> Adding an e-mail address or phone number helps us recover your account in case you forget your password or user id. We don’t use your email or phone to identfy you or sell this information to anyone. You can choose to skip this. enter email enter phone number Send OTP Skip</Text>
//                             </View>
//                         </View>
//                         <View style={styles.Contentbox}>
//                             <View style={styles.Input}>
//                                 <View style={styles.inputfeild}>
//                                     <TextInput placeholder='enter email' style={styles.input}
//                                         onChangeText={(value) => {
//                                             setEmail(value)
//                                         }}
//                                     >
//                                     </TextInput>
//                                     <TextInput placeholder='enter phone number' style={styles.input}
//                                         onChangeText={(value) => {
//                                             setPhone(value)
//                                         }}
//                                     >
//                                     </TextInput>
//                                 </View>
//                                 <View style={styles.subInput}>

//                                 </View>
//                             </View>
//                             <View style={styles.SubmitButton}>
//                                 <TouchableOpacity
//                                     disabled={phone && email ? false : true}
//                                     style={phone && email ? styles.button : styles.buttondisable}
                                    // onPress={() => {
                                    //     if (phone && email) {
                                    //         OTPphone()
                                    //         OTPemail()
                                    //     } 
                                    // }}
//                                 >
//                                     <Text style={styles.buttonText}>Send OTP</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.skipbutton}
//                                     onPress={() => {
                                        
//                                     }}
//                                 >
//                                     <Text style={styles.content}>Skip</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     )
// }



// const mapStateToProps = (state) => ({
//     phoenotp: state.send_otp_phone,
//     emailotp: state.send_otp_email
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         sendOtpPhone: (data) => {
//            return dispatch(send_otp_phone(data));
//         },
//         sendOtpEmail: (data) => {
//             return  dispatch(send_otp_email(data));
//         },
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddEmailorPhone)


import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { send_otp_phone } from '../../Slices/SendPhoneOtpSlice'
import { send_otp_email } from '../../Slices/SendEmailOtpSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, Screens } from '../../helpers/Screens';
import { unwrapResult } from '@reduxjs/toolkit'

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const AddEmailorPhone = (props) => {

  const [Number, setNumber] = useState('');
  const [errorNumber, setErrorNumber] = useState(null);
  const [Email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);

  const _emailValidate = email => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
      /^[0]?[6789]\d{9}$/;
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

  const { navigation } = props
  
  const OTPphone = async () => {
      const data = {
          query: {},
          body: {
              phone: Number,
              country_code: 91
          }
      }
      PhoneData(Number)
      const resp = await props?.sendOtpPhone(data)
      const rawData = await unwrapResult(resp)
      if(rawData){
          navigation.push(Screens.VerifyOtp)
      }
  }

  const OTPemail = async () => {
      const data = {
          query: {},
          body: {
              email: Email
          }
      }
      EmailData(Email)
      const resp = await props?.sendOtpEmail(data)
      const rawData = await unwrapResult(resp)
      console.log(rawData, "Email Otp Response")
      if(rawData){
          navigation.push(Screens.VerifyOtp)
      }
  }

  const PhoneData = async (value) => {
      try {
          await AsyncStorage.setItem('phone', value)
      } catch (e) {
          console.log(e, 'storage error')
      }
  }

  const EmailData = async (value) => {
      try {
          await AsyncStorage.setItem('Email', value)
      } catch (e) {
          console.log(e, 'storage error')
      }
  }



  return (
    <View style={styles.mainContinter}>
      <ScrollView>
        <ImageBackground source={image.image} style={styles.MainDiv}>
          <View style={styles.titleCon}>
            <Text style={styles.titTxt}>Add your e-mail
              or phone</Text>
          </View>
          <View style={styles.dtailCon}>
            <Text style={styles.detTxt}>
              Adding an e-mail address or phone
              number helps us recover your account in
              case you forget your password or user id.
              We don’t use your email or phone to
              identfy you or sell this information to
              anyone. You can choose to skip this.</Text>
          </View>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.usercon}>
              <TextInput
                style={styles.useText}
                placeholder='enter email'
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
                  placeholder='enter phone number'
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
                if (Number && Email) {
                    OTPphone()
                    OTPemail()
                } 
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
      </ScrollView>
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
    height: height / 2.66,
    width: width / 1.35,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    // alignItems: 'center',    
    alignSelf: 'center',
  },
  useText: {
    height: height / 16,
    width: width / 1.35,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    fontSize: height / 55,
    borderWidth: 0.5
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

const mapStateToProps = (state) => ({
    phoenotp: state.send_otp_phone,
    emailotp: state.send_otp_email
})

const mapDispatchToProps = (dispatch) => {
    return {
        sendOtpPhone: (data) => {
           return dispatch(send_otp_phone(data));
        },
        sendOtpEmail: (data) => {
            return  dispatch(send_otp_email(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailorPhone)