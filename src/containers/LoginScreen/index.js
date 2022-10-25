import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect, useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { postLogin } from '../../Slices/LoginSlice'
import { postUserLogin } from './loginSlice';
import { alies_exist } from '../../Slices/AliesCheckSlice'
import { navigate, Screens } from '../../helpers/Screens';
import Geolocation from '@react-native-community/geolocation';
import { validateName, _nameValidate, _passwordvalidate } from '../../helpers/CommonValidator'
import axios from 'axios'
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const LoginScreen = (props) => {

    const { navigation } = props

    const [Password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);
    const [Name, setName] = useState('');
    const [errorName, setErrorName] = useState(null);
    const [email, setemail] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);


    const [lat, setlat] = useState('')
    const [lon, setlon] = useState('')

    Geolocation.getCurrentPosition(info => {
        setlat(info?.coords?.latitude)
        setlon(info?.coords?.longitude)
        console.log(info?.coords?.latitude, "location data ")
    }
    );

    useEffect(() => { getlocation() }, [lat && lon])

    const getlocation = () => {
        axios({
            method: 'post',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBFB_A5HYqjbBxCd5eLF7oUD7_movLicUk`,
        }).then((response) => {
            console.log(response, "direct method");
        }).catch((e) => {
            console.log(e.response, "direct method")
        })
    }

    useEffect(() => {
        testing()
      }, [])
    
      const testing = () => {
        axios.get("https://apidev.redcliffelabs.com/api/v1/package/redo-package-list/").then((response) => {
          console.log(response.data[0].name, "red testing response")
          if(response.data){
            alert(`${response.data[0].name}`)
          }
        }).catch((error) => {
          console.log(error, "testing error")
          alert("not working")
        })
      }

    return (
        <View style={styles.mainContinter}>
            <ScrollView>
                <ImageBackground source={image.image} style={styles.MainDiv}>
                    <View style={styles.titleCon}>
                        <Text style={styles.titTxt}>Log In</Text>
                    </View>
                    <KeyboardAvoidingView behavior='position'>
                        <View style={styles.usercon}>
                            {/* <TextInput
                                style={styles.useText}
                                placeholder='email '
                                placeholderTextColor={'#000000'}
                                onChangeText={async txt => {
                                    setName(txt),
                                        setErrorName(_nameValidate(txt))
                                    const data = {
                                        query: {},
                                        body: {
                                            "alias": txt,
                                        }
                                    }
                                    const resp = await props?.aliesexist(data)
                                    const rawData = await unwrapResult(resp)
                                    console.log(rawData, "alies response")
                                }}
                            />
                            {errorName != null ? (
                                <View
                                    style={styles.redCon}>
                                    <Text
                                        style={styles.redTxt}>
                                        {errorName}
                                    </Text>
                                </View>
                            ) : null} */}
                            <TextInput
                                style={styles.useText}
                                placeholder='user name'
                                placeholderTextColor={'#000000'}
                                onChangeText={async txt => {
                                    setName(txt),
                                        setErrorName(_nameValidate(txt))
                                    // const data = {
                                    //     query: {},
                                    //     body: {
                                    //         "alias": txt,
                                    //     }
                                    // }
                                    // const resp = await props?.aliesexist(data)
                                    // const rawData = await unwrapResult(resp)
                                }}
                            />
                            {errorName != null ? (
                                <View
                                    style={styles.redCon}>
                                    <Text
                                        style={styles.redTxt}>
                                        {errorName}
                                    </Text>
                                </View>
                            ) : null}
                            <View style={styles.passcon}>
                                <TextInput
                                    style={styles.useText}
                                    placeholder='password'
                                    placeholderTextColor={'#000000'}
                                    onChangeText={txt => {
                                        setPassword(txt),
                                            setErrorPassword(_passwordvalidate(txt))
                                    }}
                                />
                                {errorPassword != null ? (
                                    <View
                                        style={styles.redCon}>
                                        <Text
                                            style={styles.redTxt}>
                                            {errorPassword}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.forgotCon}>
                        <TouchableOpacity onPress={() => { alert('Hello') }}>
                            {/* <Text style={styles.frgTxt}>Forgot your password?</Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleCons}>
                        <TouchableOpacity
                            style={styles.btnCon}
                            disabled={errorName && errorPassword ? true : false}
                            onPress={async () => {
                                const data = {
                                    query: {},
                                    body: {
                                        "alias": Name,
                                        "password": Password,
                                    }
                                }
                                const resp = await props.doLogin(data)
                                const rawData = await unwrapResult(resp)
                                if (rawData?.message == 'Success') {
                                    navigation.push(Screens.Tabs)
                                } else {
                                    alert(rawData?.result)
                                }
                            }}
                        >
                            <Text style={styles.btnTxt}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forCon}>
                        <TouchableOpacity >
                            {/* <Text style={styles.anTxt}>Have an account, log in!</Text> */}
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
        height: height,
        width: width / 1,
        // backgroundColor: 'lightblue',
    },
    titleCon: {
        height: height / 7,
        width: width / 1.4,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center'

    },
    titTxt: {
        fontSize: height / 20,
        // fontFamily: Montserrat,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    usercon: {
        height: height / 1.8,
        width: width / 1.4,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center',
    },
    useText: {
        height: height / 16,
        width: width / 1.4,
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
        width: width / 1.4,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 20
    },
    titleCons: {
        height: height / 10,
        width: width / 1.4,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center'
    },
    forCon: {
        height: height / 27,
        width: width / 1.4,
        // backgroundColor: 'cyan',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    },
    anTxt: {
        color: '#707070',
        fontSize: 14
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
    }
})

const mapStateToProps = (state) => ({
    login: state.LoginSlice
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (data) => {
            return dispatch(postUserLogin(data));
        },
        aliesexist: (data) => {
            return dispatch(alies_exist(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)