import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import Geolocation from '@react-native-community/geolocation';
import styles from '../../css/Maincss'
import { validateName } from '../../helpers/CommonValidator'

Geolocation.getCurrentPosition(info => console.log(info, "location data "));

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const SignUp = (props) => {
    const { navigation } = props
    const [username, setusername] = useState('Shubham1234')
    const [nameError, setNameError] = useState(null)
    const [password, setpassword] = useState('homework12')


    const sign = () => {
        axios({
            method: 'post',
            url: `http://54.214.196.237:3000/user/signup`,
            data: {
                "alias": username,
                "password": password
            }
        }).then((response) => {
            console.log(response.data, "direct method");
            navigation.navigate(Screens.AddName)
        }).catch((e) => {
            console.log(e.response.data.result, "direct method")
        })
    }

    return (
        <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Sign up</Text>
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <ScrollView style={{ flex: 1 }}>
                                    {/* <View style={styles.inputfeild}> */}
                                    <TextInput value={username} placeholder='username' style={styles.input}
                                        onChangeText={(value) => {
                                            setNameError(validateName(value))
                                            setusername(value)
                                        }}
                                    >
                                    </TextInput>
                                    <TextInput value={password} placeholder='password' style={styles.input}
                                        onChangeText={(value) => {
                                            setpassword(value)
                                        }}
                                    >
                                    </TextInput>
                                    {/* </View> */}
                                </ScrollView>
                                <View style={styles.subInput}>
                                    <TouchableOpacity>
                                        <Text style={styles.content}>Forget password?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    disabled={username && password ? false : true}
                                    style={username && password ? styles.button : styles.buttondisable}
                                    onPress={async () => {
                                        if (nameError) {
                                            alert(`${nameError}`)
                                        } else {
                                            const data = {
                                                query: {},
                                                body: {
                                                    "alias": username,
                                                    "password": password
                                                }
                                            }
                                            const resp = await props?.doLogin(data)
                                            const rawData = await unwrapResult(resp)
                                            console.log(rawData, "here is data")
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>Sign up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.haveaccount}
                                    onPress={() => {
                                        navigation.push(Screens.Gender)
                                    }}
                                >
                                    <Text style={styles.content}>Have an account login</Text>
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
    login: state.LoginSlice
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (data) => {
           return dispatch(postLogin(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
