import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const { height, width } = Dimensions.get('screen')

const image = { uri: "https://reactjs.org/logo-og.png" };

const Gender = (props, navigation) => {

    const [gender, setgender] = useState()
    const [genderindex, setgenderindex] = useState()

    const allgender = ['Female', 'Male', 'Non-binary', 'Tansgender', 'Prefer not to say']

    console.log(props.login, "signup screen")

    return (
        <SafeAreaView >
            <ImageBackground ource={image} resizeMode="cover" style={styles.image}>
                <View style={styles.signup}>
                    <View style={styles.mainview}>
                        <View style={styles.subview}>
                            <Text style={styles.heading}>You are</Text>
                            <View style={styles.secondview}>
                                {allgender.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.button}
                                            key={index}
                                            onPress={() => {
                                                setgender(item)
                                                setgenderindex(index)
                                            }}>
                                            <View style={styles.options}>
                                                <View style={styles.boxview} >
                                                    {genderindex === index ?
                                                        <Image
                                                            style={styles.tinyLogo}
                                                            source={{
                                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                                            }}
                                                        /> : null}
                                                </View >
                                                <View style={styles.optionname}>
                                                <Text>{item}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={styles.submitView}>
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
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
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
        height: height / 1.5,
        margin: 10,
        // backgroundColor: 'red',
        padding: 10
    },
    secondview: {
        marginTop:50,
        height: height / 2,
        width: width / 1.3,
        // backgroundColor: 'green',
    },
    heading: {
        fontSize: 24
    },
    submit: {
        backgroundColor: 'red' , 
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    mage: {
        flex: 1,
        justifyContent: "center"
    },
    boxview: {
        height: height / 22,
        width: width / 11,
        borderColor: 'black',
        borderWidth: 1
    },
    tinyLogo: {
        width: 35,
        height: 37,
    },
    options: {
        width: width / 2,
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        flexDirection: 'row',
        // backgroundColor: "#DDDDDD",
        padding: 10,
    },
    optionname:{
        // backgroundColor: 'blue' , 
        width: '90%' ,
        marginLeft:10,
        justifyContent: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(Gender)
