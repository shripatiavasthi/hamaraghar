import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import { send_otp_phone } from '../../Slices/SendPhoneOtpSlice'
import { send_otp_email } from '../../Slices/SendEmailOtpSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, Screens } from '../../helpers/Screens';
import styles from '../../css/Maincss'
import axios from 'axios';

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

export const AddEmailorPhone = ({ props, navigation }) => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    console.log(props?.phoenotp , "phone otp response")

    const OTPphone = () => {
        const data = {
            query: {},
            body: {
                phone_number: phone,
                country_code: 5
            }
        }
        PhoneData(phone)
        props?.sendOtpPhone(data)
    }

    const OTPemail = () => {
        const data = {
            query: {},
            body: {
                email: email
            }
        }
        EmailData(email)
        props?.sendOtpEmail(data)
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

    const Phone = ( ) => {
        axios({
            method: 'post',
            url: `http://54.214.196.237:3000/user/send_otp/phone`,
            data:{
                phone_number: phone,
                country_code: 5
            }
          }).then((response) => {
            console.log(response.data , "otp phone response");
            navigation.navigate(Screens.VerifyOtp)
          }).catch((e)=>{
            console.log(e , "otp phone response error" )
          })
    }

    const Email = ( ) => {
        axios({
            method: 'post',
            url: `http://54.214.196.237:3000/user/send_otp/email`,
            data:{
                email: email
            }
          }).then((response) => {
            console.log(response.data , "otp email response");
            navigation.navigate(Screens.Home)
          }).catch((error)=>{
            console.log(error , "otp email response error" )
          })
    }

    return (
        <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Add your e-mail or phone</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.subheadingtext}> Adding an e-mail address or phone number helps us recover your account in case you forget your password or user id. We don’t use your email or phone to identfy you or sell this information to anyone. You can choose to skip this. enter email enter phone number Send OTP Skip</Text>
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <View style={styles.inputfeild}>
                                    <TextInput placeholder='enter email' style={styles.input}
                                        onChangeText={(value) => {
                                            setEmail(value)
                                        }}
                                    >
                                    </TextInput>
                                    <TextInput placeholder='enter phone number' style={styles.input}
                                        onChangeText={(value) => {
                                            setPhone(value)
                                        }}
                                    >
                                    </TextInput>
                                </View>
                                <View style={styles.subInput}>

                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    disabled={phone && email ? false : true}
                                    style={phone && email ? styles.button : styles.buttondisable}
                                    onPress={() => {
                                        if (phone && email) {
                                            Phone()
                                            Email()
                                        }
                                        // if (phone && email) {
                                        //     OTPphone()
                                        //     OTPemail()
                                        //     Email()
                                        //     Phone()
                                        // } else if (email) {
                                        //     OTPemail()
                                        //     Email()
                                        // } else if (phone) {
                                        //     OTPphone()
                                        //     Phone()
                                        // }
                                    }}
                                >
                                    <Text style={styles.buttonText}>Send OTP</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.skipbutton}
                                    onPress={() => {
                                        navigation.navigate(Screens.VerifyOtp)
                                    }}
                                >
                                    <Text style={styles.content}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}



const mapStateToProps = (state) => ({
    phoenotp: state.send_otp_phone,
    emailotp: state.send_otp_email
})

const mapDispatchToProps = (dispatch) => {
    return {
        sendOtpPhone: (data) => {
            dispatch(send_otp_phone(data));
        },
        sendOtpEmail: (data) => {
            dispatch(send_otp_email(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailorPhone)