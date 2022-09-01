import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Alert , ScrollView } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import Geolocation from '@react-native-community/geolocation';
import styles from '../../css/Maincss'
import axios from 'axios';

Geolocation.getCurrentPosition(info => console.log(info, "location data "));

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const SignUp = ({ props, navigation }) => {

    const [username, setusername] = useState()
    const [password, setpassword] = useState()

    // useEffect(() => {
    //     if (props?.login?.otpResp?.data?.message == "success") {
    //         navigation.navigate(Screens.Home)
    //     } else if (props?.login?.otpResp?.data?.message == "Failed") {
    //         Alert.alert("something")
    //     }
    // }, [props?.login?.otpResp?.data?.result])
    console.log(props?.login?.otpResp?.data, "signup screen")

    const sign = ( ) => {
        axios({
            method: 'post',
            url: `http://54.214.196.237:3000/user/signup`,
            data:{
                "alias": username,
                "password": password
            }
          }).then((response) => {
            console.log(response.data , "direct method");
            navigation.navigate(Screens.AddName)
          }).catch((e)=>{
            console.log(e.response.data.result , "direct method" )
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
                                <ScrollView style={{flex: 1}}>
                                {/* <View style={styles.inputfeild}> */}
                                    <TextInput placeholder='username' style={styles.input}
                                        onChangeText={(value) => {
                                            setusername(value)
                                        }}
                                    >
                                    </TextInput>
                                    <TextInput placeholder='password' style={styles.input}
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
                                    disabled = {username && password ? false : true}
                                    style={username && password ? styles.button : styles.buttondisable}
                                    onPress={() => {
                                        // const data = {
                                        //     query: {},
                                        //     body: {
                                        //         "alias": username,
                                        //         "password": password
                                        //     }
                                        // }
                                        // props?.doLogin(data)
                                        sign()
                                    }}
                                >
                                    <Text style={styles.buttonText}>Sign up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.haveaccount}
                                    onPress={() => {
                                        navigation.navigate(Screens.Gender)
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
            dispatch(postLogin(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
