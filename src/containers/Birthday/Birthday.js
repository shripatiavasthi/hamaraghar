import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity, ImageBackground, Button } from 'react-native'
import { createUser } from '../../Slices/CreateUserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, Screens } from '../../helpers/Screens';
import styles from '../../css/Maincss'
import DatePicker from 'react-native-date-picker'
import IconAntDesign from 'react-native-vector-icons/AntDesign';


const { height, width } = Dimensions.get('screen')

export const Birthday = ({ props, navigation }) => {

    const image = { image: require("../../staticdata/images/BackgroundImage.png") }

    const [check, setcheck] = useState(false)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    console.log(date.toString(), "selected date")

    const BirthdayData = async (value) => {
        navigation.navigate(Screens.SignUp)
        try {
            await AsyncStorage.setItem('Dob', dob)
        } catch (e) {
            console.log(e, "dob error")
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
                                    <Text style={{ margin: 10, fontSize: 16, fontWeight: 'bold' }}> September 29 , 1997</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode="date"
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
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
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        setcheck(true)
                                        if (check === true) {
                                            setcheck(false)
                                        }
                                    }}
                                    >
                                        <View style={styles.checkbox} >
                                            {check ? 
                                            <IconAntDesign name="check" size={30} color="#900" />
                                            : null }
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.content}>I am 18 or older</Text>
                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    style={date && check ? styles.button : styles.buttondisable}
                                    disabled={ check ? false : true}
                                    onPress={() => {
                                        BirthdayData()
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