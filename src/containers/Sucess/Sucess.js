import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert , ImageBackground } from 'react-native'
import { send_otp_phone } from '../../Slices/SendPhoneOtpSlice'
import { send_otp_email } from '../../Slices/SendEmailOtpSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, Screens } from '../../helpers/Screens';
import styles from '../../css/Maincss'

const { height, width } = Dimensions.get('screen')

export const Sucess = ({ props, navigation }) => {

    const image = { image: require("../../staticdata/images/BackgroundImage.png") }

    return (
        <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Sucess</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.subheadingtext}> You are verified</Text>
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <View style={styles.inputfeild}>
                                    {/* <TextInput placeholder='enter email OTP' style={styles.input}
                                        onChangeText={(value) => {
                                            setemailotp(value)
                                        }}
                                    >
                                    </TextInput>
                                    <TextInput placeholder='enter phone OTP' style={styles.input}
                                        onChangeText={(value) => {
                                            setsmsotp(value)
                                        }}
                                    >
                                    </TextInput> */}
                                </View>
                                <View style={styles.subInput}>

                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    style={ styles.button}
                                    onPress={() => {
                                        navigation.navigate(Screens.Avatar)
                                    }}
                                >
                                    <Text style={styles.buttonText}>Done</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={styles.skipbutton}
                                    onPress={() => {
                                        navigation.navigate(Screens.Sucess)
                                    }}
                                >
                                    <Text>Skip</Text>
                                </TouchableOpacity> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Sucess)