import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../css/Maincss'
import IconAntDesign from 'react-native-vector-icons/AntDesign';


const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const Gender = ({ props, navigation }) => {

    const [gender, setgender] = useState()
    const [genderindex, setgenderindex] = useState()

    const allgender = ['Female', 'Male', 'Non-binary', 'Tansgender', 'Prefer not to say']

    const GenderData = async (value) => {
        try {
            await AsyncStorage.setItem('Gender', value)

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
                                <Text style={styles.headingtext}>You are</Text>
                            </View>
                            <View style={styles.GenderView}>
                                {allgender.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.options}
                                            key={index}
                                            onPress={() => {
                                                setgender(item)
                                                setgenderindex(index)
                                                if (gender === item) {
                                                    setgender()
                                                    setgenderindex()
                                                }
                                            }}>
                                            <View style={styles.option}>
                                                <View style={styles.checkbox} >
                                                    {genderindex === index ?
                                                        <IconAntDesign name="check" size={30} color="#900" />
                                                        : null}
                                                </View >
                                                <View style={styles.optionname}>
                                                    <Text style={styles.GenderText}>{item}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
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
                                    style={gender ? styles.button : styles.buttondisable}
                                    disabled={gender ? false : true}
                                    onPress={() => {
                                        GenderData(gender)
                                        navigation.navigate(Screens.Birthday)
                                    }}
                                >
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <View style={styles.skipbutton}>
                                    <Text style={styles.content}>Once added the gender cannot be changed.</Text>
                                </View>
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
