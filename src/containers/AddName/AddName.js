import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../css/Maincss'

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const AddName = ({ props, navigation }) => {

    const [Firstname, setFirstname] = useState()
    const [Lastname, setLastname] = useState()

    const FirstNameData = async (value) => {
        try {
            await AsyncStorage.setItem('firstname', Firstname)
            navigation.navigate(Screens.AddEmailorPhon)
        } catch (e) {
            console.log(e, "error in gender storage")
        }
    }

    const LastNameData = async (value) => {
        try {
            await AsyncStorage.setItem('lastname', Lastname)

        } catch (e) {
            console.log(e, "error in gender storage")
        }
    }


    return (
        <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Add name</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.subheadingtext}>You can add a name or skip. In case you skip your username will be your name.</Text>
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <View style={styles.inputfeild}>
                                    <TextInput placeholder='First Name' style={styles.input}
                                        onChangeText={(value) => {
                                            setFirstname(value)
                                        }}
                                    >
                                    </TextInput>
                                    <TextInput placeholder='Last Name' style={styles.input}
                                        onChangeText={(value) => {
                                            setLastname(value)
                                        }}
                                    >
                                    </TextInput>
                                </View>
                                <View style={styles.subInput}>

                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    disabled={Firstname && Lastname ? false : true}
                                    style={Firstname && Lastname ? styles.button : styles.buttondisable}
                                    onPress={() => {
                                        FirstNameData()
                                        LastNameData()
                                    }}
                                >
                                    <Text style={styles.buttonText}>Verify</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.skipbutton}
                                    onPress={() => {
                                        navigation.navigate(Screens.AddEmailorPhon)
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
    login: state.LoginSlice
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (data) => {
            dispatch(postLogin(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddName)
