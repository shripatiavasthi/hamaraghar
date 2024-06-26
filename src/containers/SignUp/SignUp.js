import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground , BackHandler, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect, useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { postLogin } from '../../Slices/LoginSlice'
import { alies_exist } from '../../Slices/AliesCheckSlice'
import { navigate, Screens } from '../../helpers/Screens';
import Geolocation from '@react-native-community/geolocation';
import { validateName } from '../../helpers/CommonValidator'
import axios from 'axios'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../../containers/LoginScreen/loginSlice'

const { height, width } = Dimensions.get('screen')


const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const SignUp = (props) => {


    const { navigation } = props

    const [Password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);
    const [Name, setName] = useState('');
    const [errorName, setErrorName] = useState(null);
    const [alies_exist_state, setalies_exist] = useState(false);

    const dispatch = useDispatch()

    console.log(alies_exist_state, "alies true or false")

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
    const getAliasName = async () => {
        if (Name.length > 0) {
            const data = {
                query: {},
                body: {
                    "alias": Name,
                }
            }
            const resp = await props?.aliesexist(data)
            const rawData = await unwrapResult(resp)
            console.log(rawData.data.is_exist, "alies response")
            if (rawData.data.is_exist == true) {
                setalies_exist(true)
                alert("this alies alreay exist")
            } else if (rawData.data.is_exist == false) {
                setalies_exist(false)
            }
        }
    }

    useEffect(() => { getlocation() }, [lat && lon])
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAliasName()
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [Name])

    const getlocation = () => {
        axios({
            method: 'post',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=country&key=AIzaSyBFB_A5HYqjbBxCd5eLF7oUD7_movLicUk`,
        }).then((response) => {
            console.log(response, "direct method");
        }).catch((e) => {
            console.log(e.response, "direct method")
        })
    }

    const alies = async (value) => {
        navigation.navigate(Screens.SignUp)
        try {
            await AsyncStorage.setItem('alies', value)
        } catch (e) {
            console.log(e, "dob error")
        }
    }

    return (
        <View style={styles.mainContinter}>
            {/* <ScrollView> */}
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
                                onChangeText={async txt => {
                                    setName(txt),
                                        _nameValidate(txt);

                                }}
                            />
                            {/* {errorName != null ? (
                                <View
                                    style={styles.redCon}>
                                    <Text
                                        style={styles.redTxt}>
                                        {errorName}
                                    </Text>
                                </View>
                            ) : null} */}
                            <View style={styles.passcon}>
                                <TextInput
                                    style={styles.useText}
                                    placeholder='password'
                                    placeholderTextColor={'#000000'}
                                    onChangeText={txt => {
                                        setPassword(txt), _passwordvalidate(txt);
                                    }}
                                />
                                {/* {errorPassword != null ? (
                                    <View
                                        style={styles.redCon}>
                                        <Text
                                            style={styles.redTxt}>
                                            {errorPassword}
                                        </Text>
                                    </View>
                                ) : null} */}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.forgotCon}>
                        {/* <TouchableOpacity onPress={() => { alert('Hello') }}>
                            <Text style={styles.frgTxt}>Forgot your password?</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.titleCons}>
                        <TouchableOpacity
                            style={styles.btnCon}
                            disabled={alies_exist_state ? true : false}
                            onPress={async () => {
                                // if (errorName && errorPassword) {
                                //     alert('Please Enter correct User id and password')
                                // } else {
                                    const data = {
                                        query: {},
                                        body: {
                                            "alias": Name,
                                            "password": Password
                                        }
                                    }
                                    const resp = await props?.doLogin(data)
                                    const rawData = await unwrapResult(resp)
                                    console.log(rawData?.data
                                        , "sign up api data")
                                    if (rawData?.message == 'Success' || rawData?.message == 'success') {
                                        alies(Name)
                                        dispatch(setToken(rawData?.result))
                                        // navigation.push(Screens.AddName)
                                        navigation.navigate(Screens.AddName)
                                    } else if (rawData?.data?.message == 'failed' || rawData?.data?.message == 'Failed'  ) {
                                        console.log(rawData?.data?.error , "checking ")
                                        // alies(rawData?.data?.Error[0] )
                                        alert(`${rawData?.data?.error
                                        }`)
                                    }
                                // }
                            }}
                        >
                            <Text style={styles.btnTxt}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forCon}>
                        <TouchableOpacity onPress={() => {
                            navigation.push(Screens.Login)
                        }}>
                            <Text style={styles.anTxt}>Have an account, log in!</Text>
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
        justifyContent: 'center',
        // alignItems: 'center',    
        alignSelf: 'center',
    },
    useText: {
        height: height / 16,
        width: width / 1.4,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        fontSize: height / 55,
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 30
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