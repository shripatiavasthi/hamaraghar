import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../css/Maincss'
import {createUser} from '../../Slices/CreateUserSlice'
import axios from 'axios';

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const dummyimage = {  image: require("../../staticdata/images/Avatar1.jpeg")}

const Avatar = (props) => {

    const { navigation } = props

    const [avatar, setavatar] = useState()
    const [avatarindex, setavatarindex] = useState()
    const [chouseimage, setchouseimage] = useState()

    const [ name , setname] = useState()
    const [lastname , setlastname ] = useState()
    const [gender, setgender] = useState()
    const [birthday, setbirthday] = useState()
    const [email, setemail] = useState()
    const [phone , setphone] = useState()



    Details = [
        {
            type: "Party",
            image: require("../../staticdata/images/Avatar1.jpeg")
        },
        {
            type: "Wedding",
            image: require("../../staticdata/images/Avatar2.jpeg")
        },
        {
            type: "Architecture",
            image: require("../../staticdata/images/Avatar3.jpeg")
        },
        {
            type: "Christening",
            image: require("../../staticdata/images/Avatar4.jpeg")
        },
        {
            type: "Christening",
            image: require("../../staticdata/images/Avatar4.jpeg")
        }
    ];

    useEffect(() => {
        Firstname()
        Lastname()
        Gender()
        Email()
        Phone()
    }, [])


    const Firstname = async () => {
        try {
            const value = await AsyncStorage.getItem('firstname')
            if (value !== null) {
                // value previously stored
                setname(value)
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }

    const Lastname = async () => {
        try {
            const value = await AsyncStorage.getItem('lastname')
            if (value !== null) {
                // value previously stored
                setlastname(value)
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }

    const Gender = async () => {
        try {
            const value = await AsyncStorage.getItem('Gender')
            if (value !== null) {
                // value previously stored
                setgender(value)
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }

    const DateOfBirth = async () => {
        try {
            const value = await AsyncStorage.getItem('firstname')
            if (value !== null) {
                // value previously stored
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }

    const Email = async () => {
        try {
            const value = await AsyncStorage.getItem('Email')
            if (value !== null) {
                // value previously stored
                setemail(value)
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }

    const Phone = async () => {
        try {
            const value = await AsyncStorage.getItem('phone')
            if (value !== null) {
                // value previously stored
                setphone(value)
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }


    const createuser = ( ) => {
        axios({
            method: 'post',
            url: `http://54.214.196.237:3000/user/create`,
            data:{
                "user_alias": "Shubham4455",
                "first_name": name,
                "last_name": lastname,
                "gender": gender,
                "date_of_birth": "2005-12-17",
                "email": email,
                "phone": phone,
                "bio": "asdfghjkl",
                "country": 5,
            }
          }).then((response) => {
            navigation.push(Screens.Belongone)
            console.log(response.data , "create user response");
          }).catch((e)=>{
            console.log(e , "create user response error" )
          })
    }

    return (
        <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Choose Avatar</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.subheadingtext}>You can choose from the readymade avatars, create your own or upload a selfie to be your profile picture.</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <View style={styles.chousenimage}>
                                    <Image
                                        style={styles.ChousenAvatar}
                                        source={chouseimage ? chouseimage : dummyimage.image}
                                    />
                                </View>
                                <View style={styles.imageoptions}>
                                 {Details.map((item, index) => {
                                    console.log(item?.image, "image array ")
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setavatar(item)
                                                setavatarindex(index)
                                                setchouseimage(item.image)
                                            }}>
                                            <View >
                                                <View  >
                                                    <Image
                                                        style={styles.AvatarOptions}
                                                        source={item.image}
                                                    />
                                                </View >
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                                </View>
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <View style={styles.inputfeild}>
                                    
                                </View>
                                <View style={styles.subInput}>
                                    
                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    disabled={chouseimage ? false : true}
                                    style={styles.button}
                                    onPress={() => {
                                        createuser()
                                    }}
                                >
                                    <Text style={styles.buttonText}>Done</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
