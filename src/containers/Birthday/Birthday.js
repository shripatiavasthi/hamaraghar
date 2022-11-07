import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity, ImageBackground, Button } from 'react-native'
import { createUser } from '../../Slices/CreateUserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, Screens } from '../../helpers/Screens';
import styles from '../../css/Maincss'
import DatePicker from 'react-native-date-picker'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const { height, width } = Dimensions.get('screen')

export const Birthday = ({ props, navigation }) => {

    const image = { image: require("../../staticdata/images/BackgroundImage.png") }
    const [check, setcheck] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [ChousenDate, setChousenDate] = useState(false)
    const [lessthen, setlessthen] = useState(false)
    const [eighteenage , seteighteenage] = useState(false)
    const [age , setage] = useState()

    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    // console.log(date.toLocaleDateString("en-US",options), "selected date")

    const BirthdayData = async (value) => {
        navigation.navigate(Screens.SignUp)
        try {
            await AsyncStorage.setItem('Dob', value)
        } catch (e) {
            console.log(e, "dob error")
        }
    }

    function calculate_age(dob) { 
        console.log(dob , "dob inside a function")
        setDate(dob)
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
        console.log( Math.abs(age_dt.getUTCFullYear() - 1970) , "date difference")
        if (Math.abs(age_dt.getUTCFullYear() - 1970) > 18){
            setlessthen(true)
            seteighteenage(true)
            setage((age_dt.getUTCFullYear() - 1970))
        }else if (Math.abs(age_dt.getUTCFullYear() - 1970) < 18 && Math.abs(age_dt.getUTCFullYear() - 1970) > 13 ) {
            setlessthen(true)
            setage((age_dt.getUTCFullYear() - 1970))
        }else if(Math.abs(age_dt.getUTCFullYear() - 1970) < 13){
            alert(" You are Less then 13 years ")
        }
    }
    

    return (
        <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Add Birthday</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.subheadingtext}>You must be 18 years of age to use this app. Adding your age helps us in providing you with better recommendations that enhances your experience while using this app. You can choose not to add the birthday and just certify that you are 18 or older.</Text>
                            </View>
                            <View style={styles.Birthday}>
                                <TouchableOpacity onPress={() => setOpen(true)} style={styles.datebutton}>
                                    <Text style={{ margin: 10, fontSize: 16, fontWeight: 'bold'  }}> {date ? moment(date).format('MMMM Do YYYY') : "September 29 , 1997"}  </Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode="date"
                                    color="black"
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        calculate_age(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <View style={styles.inputfeild}>

                                </View>
                                <View style={styles.agebox}>
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            setcheck(true)
                                            if (eighteenage === true) {
                                                seteighteenage(false)
                                            } else {
                                                alert(" You are Less then 18 years ")
                                            }
                                        }}
                                    >
                                        <View style={styles.checkbox} >
                                            {eighteenage ?
                                                <IconAntDesign name="check" size={30} color="#900" />
                                                : null}
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.content}>I am 18 or older</Text> */}
                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    style={date && lessthen ? styles.button : styles.buttondisable}
                                    disabled={lessthen && age ? false : true}
                                    onPress={() => {
                                        BirthdayData(moment(date).format('MMMM Do YYYY'))
                                    }}
                                >
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <View style={styles.skipbutton}>
                                    <Text >Once added the gender cannot be changed.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.createUser
})

const mapDispatchToProps = (dispatch) => {
    return {
        createuser: (data) => {
            dispatch(createUser(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Birthday)