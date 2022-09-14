// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
// import { connect, useDispatch } from "react-redux";
// import { unwrapResult } from '@reduxjs/toolkit'
// import { postLogin } from '../../Slices/LoginSlice'
// import { navigate, Screens } from '../../helpers/Screens';
// import Geolocation from '@react-native-community/geolocation';
// import styles from '../../css/Maincss'
// import { validateName } from '../../helpers/CommonValidator'
// import axios from 'axios'

// const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


// const { height, width } = Dimensions.get('screen')

// const image = { image: require("../../staticdata/images/BackgroundImage.png") }

// const SignUp = (props) => {

//     const { navigation } = props
//     const [username, setusername] = useState('')
//     const [nameError, setNameError] = useState(null)
//     const [password, setpassword] = useState('')
// const [lat, setlat] = useState('')
// const [lon, setlon] = useState('')

// Geolocation.getCurrentPosition(info => {
//     setlat(info?.coords?.latitude)
//     setlon(info?.coords?.longitude)
//     console.log(info?.coords?.latitude, "location data ")
// }
// );

// useEffect(() => { getlocation() }, [lat && lon])

// const getlocation = () => {
//     axios({
//         method: 'post',
//         url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBFB_A5HYqjbBxCd5eLF7oUD7_movLicUk`,
//     }).then((response) => {
//         console.log(response, "direct method");
//     }).catch((e) => {
//         console.log(e.response, "direct method")
//     })
// }

//     return (
//             <SafeAreaView >
//                   <KeyboardAvoidingView behavior="padding" style={styles.Contentbox}> 
//                  <ImageBackground source={image.image} style={styles.maindiv}>
//                     <View style={styles.FirstView}>
//                         <View style={styles.PageView}>
//                             <View style={styles.Headingdiv}>
//                                 <View style={styles.headingcontainer}>
//                                     <Text style={styles.headingtext}>Sign up</Text>
//                                 </View>
//                             </View>
//                             <View style={styles.Input}>
//                                 <TextInput value={username} placeholder='username' style={styles.input}
//                                     onChangeText={(value) => {
//                                         setNameError(validateName(value))
//                                         setusername(value)
//                                     }}
//                                 >
//                                 </TextInput>
//                                 <TextInput
//                                     value={password}
//                                     placeholder='password'
//                                     style={styles.input}
//                                     textContentType='password'
//                                     autoComplete='password'
//                                     onChangeText={(value) => {
//                                         setpassword(value)
//                                     }}

//                                 >
//                                 </TextInput>

//                                 <View style={styles.subInput}>
//                                     <TouchableOpacity>
//                                         <Text style={styles.content}>Forget password?</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                             </View>
//                             <View style={styles.SubmitButton}>
//                                 <TouchableOpacity
//                                     disabled={username && password ? false : true}
//                                     style={username && password ? styles.button : styles.buttondisable}
//                                     onPress={async () => {
//                                         if (nameError) {
//                                             alert(`${nameError}`)
//                                         } else {
//                                             const data = {
//                                                 query: {},
//                                                 body: {
//                                                     "alias": username,
//                                                     "password": password
//                                                 }
//                                             }
//                                             const resp = await props?.doLogin(data)
//                                             const rawData = await unwrapResult(resp)
//                                             console.log(rawData?.data?.message, "here is data")
//                                             if (rawData?.data?.message === 'Success') {
//                                                 navigation.push(Screens.AddName)
//                                             }
//                                         }
//                                     }}
//                                 >
//                                     <Text style={styles.buttonText}>Sign up</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.haveaccount}
//                                     onPress={() => {
//                                         navigation.push(Screens.Gender)
//                                     }}
//                                 >
//                                     <Text style={styles.content}>Have an account login</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                  </ImageBackground> 
//                 </KeyboardAvoidingView>
//             </SafeAreaView>


//     )
// }



// const mapStateToProps = (state) => ({
//     login: state.LoginSlice
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         doLogin: (data) => {
//             return dispatch(postLogin(data));
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp)


import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect, useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { postLogin } from '../../Slices/LoginSlice'
import {alies_exist } from '../../Slices/AliesCheckSlice'
import { navigate, Screens } from '../../helpers/Screens';
import Geolocation from '@react-native-community/geolocation';
import { validateName } from '../../helpers/CommonValidator'
import axios from 'axios'
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const { height, width } = Dimensions.get('screen')


const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const SignUp = (props) => {

    const { navigation } = props

    const [Password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);
    const [Name, setName] = useState('');
    const [errorName, setErrorName] = useState(null);



    const _passwordvalidate = pass => {
        var passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (pass === '') {
            setErrorPassword('*Please enter password.');
        } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
            setErrorPassword(
                '*Please enter a special character and length must be 8 digit.',
            );
        } else if (!passwordRegex.test(pass)) {
            setErrorPassword('*Please enter valid password.');
        } else {
            setErrorPassword(null);
        }
    };

    const _nameValidate = name => {
        var nameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (name === '') {
            setErrorName('*Please enter name.');
        } else if (!nameRegex.test(name)) {
            setErrorName('*Please enter valid name.');
        } else {
            setErrorName(null);
        }
    };

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

    return (
        <View style={styles.mainContinter}>
            <ScrollView>
                <ImageBackground source={image.image} style={styles.MainDiv}>
                    <View style={styles.titleCon}>
                        <Text style={styles.titTxt}>Sign up</Text>
                    </View>
                    <KeyboardAvoidingView behavior='position'>
                        <View style={styles.usercon}>
                            <TextInput
                                style={styles.useText}
                                placeholder='user name'
                                placeholderTextColor={'#000000'}
                                onChangeText={ async txt => {
                                    setName(txt), 
                                    _nameValidate(txt);
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
                            ) : null}
                            <View style={styles.passcon}>
                                <TextInput
                                    style={styles.useText}
                                    placeholder='password'
                                    placeholderTextColor={'#000000'}
                                    onChangeText={txt => {
                                        setPassword(txt), _passwordvalidate(txt);
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
                            <Text style={styles.frgTxt}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleCons}>
                        <TouchableOpacity
                            style={styles.btnCon}
                            disabled={errorName && errorPassword ? true : false}
                            onPress={async () => {
                                if (errorName && errorPassword) {
                                    alert('Please Enter correct User id and password')
                                } else {
                                    const data = {
                                        query: {},
                                        body: {
                                            "alias": Name,
                                            "password": Password
                                        }
                                    }
                                    const resp = await props?.doLogin(data)
                                    const rawData = await unwrapResult(resp)
                                    console.log(rawData?.data, "here is data")
                                    if (rawData?.data?.message === 'Success') {
                                        navigation.push(Screens.AddName)
                                    }else if (rawData?.data?.message === 'Failed'){
                                        alert(`${rawData?.data?.Error}`)
                                    }
                                }
                            }}
                        >
                            <Text style={styles.btnTxt}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forCon}>
                        <TouchableOpacity onPress={()=>{
                            navigation.push(Screens.Login)
                        }}>
                            <Text style={styles.anTxt}>Have an account, log in!</Text>
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
        height: height ,
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
            return dispatch(postLogin(data));
        },
        aliesexist: (data) => {
            return dispatch(alies_exist(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)