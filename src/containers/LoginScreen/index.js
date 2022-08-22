import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'

const { height, width } = Dimensions.get('screen')


const LoginScreen = (props) => {
    const [username, setusername] = useState()
    const [password, setpassword] = useState()

    console.log(props.login, "signup screen")

    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Login </Text>
                        <View>
                            <TextInput placeholder='phone number' style={styles.input}
                                onChangeText={(value) => {
                                    setpassword(value)
                                }}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.submit}
                            onPress={() => {
                                const data = {
                                    query: {},
                                    body: {
                                        "alias": "gfgfghfhj",
                                        "password": "hghghjgh"
                                    }
                                }
                                props?.doLogin(data)
                            }}
                        >
                            <Text>Login with otp</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subview}>
                        <View>
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
                        </View>
                        <View style={styles.forget}>
                            <TouchableOpacity>
                                <Text>Forget password</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.submit}
                            onPress={() => {
                                const data = {
                                    query: {},
                                    body: {
                                        "alias": "gfgfghfhj",
                                        "password": "hghghjgh"
                                    }
                                }
                                props?.doLogin(data)
                            }}
                        >
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.haveaccount}>
                            <Text>Have an account login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    signup: {
        height: height / 1,
        padding: 10,
        // backgroundColor: 'green'
    },
    mainview: {
        // backgroundColor: 'pink',
        height: height / 1,
        padding: 10
    },
    subview: {
        height: height / 2.6,
        margin: 10,
        // backgroundColor: 'red',
        padding: 10
    },
    heading: {
        fontSize: 24
    },
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    forget: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 10
    },
    submit: {
        backgroundColor: 'FF473A',
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    haveaccount: {
        paddingTop: 10
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
