// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
// import { connect, useDispatch } from "react-redux";
// import { postLogin } from '../../Slices/LoginSlice'
// import { navigate, Screens } from '../../helpers/Screens';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from '../../css/Maincss'

// const { height, width } = Dimensions.get('screen')

// const image = { image: require("../../staticdata/images/BackgroundImage.png") }

// const AddName = ({ props, navigation }) => {

//     const [Firstname, setFirstname] = useState()
//     const [Lastname, setLastname] = useState()

// const FirstNameData = async (value) => {
//     try {
//         await AsyncStorage.setItem('firstname', Firstname)
//         navigation.navigate(Screens.AddEmailorPhon)
//     } catch (e) {
//         console.log(e, "error in gender storage")
//     }
// }

// const LastNameData = async (value) => {
//     try {
//         await AsyncStorage.setItem('lastname', Lastname)

//     } catch (e) {
//         console.log(e, "error in gender storage")
//     }
// }


//     return (
//         <SafeAreaView >
//             <ImageBackground source={image.image} style={styles.maindiv}>
//                 <View style={styles.FirstView}>
//                     <View style={styles.PageView}>
//                         <View style={styles.Headingdiv}>
//                             <View style={styles.headingcontainer}>
//                                 <Text style={styles.headingtext}>Add name</Text>
//                             </View>
//                             <View style={styles.headingcontainer}>
//                                 <Text style={styles.subheadingtext}>You can add a name or skip. In case you skip your username will be your name.</Text>
//                             </View>
//                         </View>
//                         <View style={styles.Contentbox}>
//                             <View style={styles.Input}>
//                                 <View style={styles.inputfeild}>
//                                     <TextInput placeholder='First Name' style={styles.input}
//                                         onChangeText={(value) => {
//                                             setFirstname(value)
//                                         }}
//                                     >
//                                     </TextInput>
//                                     <TextInput placeholder='Last Name' style={styles.input}
//                                         onChangeText={(value) => {
//                                             setLastname(value)
//                                         }}
//                                     >
//                                     </TextInput>
//                                 </View>
//                                 <View style={styles.subInput}>

//                                 </View>
//                             </View>
//                             <View style={styles.SubmitButton}>
//                                 <TouchableOpacity
//                                     disabled={Firstname && Lastname ? false : true}
//                                     style={Firstname && Lastname ? styles.button : styles.buttondisable}
// onPress={() => {
//     FirstNameData()
//     LastNameData()
// }}
//                                 >
//                                     <Text style={styles.buttonText}>Verify</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.skipbutton}
                                    // onPress={() => {
                                    //     navigation.navigate(Screens.AddEmailorPhon)
                                    // }}
//                                 >
//                                     <Text style={styles.content}>Skip</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     )
// }

// const mapStateToProps = (state) => ({
//     login: state.LoginSlice
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         doLogin: (data) => {
//             dispatch(postLogin(data));
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddName)



import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { navigate, Screens } from '../../helpers/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const { height, width } = Dimensions.get('screen')


const AddName = (props) => {

    const { navigation } = props

    const [Number, setNumber] = useState('');
    const [errorNumber, setErrorNumber] = useState(null);
    const [Email, setEmail] = useState('');

    const [errorEmail, setErrorEmail] = useState(null);
    const [Password, setPassword] = useState('');

    const _emailValidate = email => {
        var emailRegex =
        /^[a-z ,.'-]+$/i
        if (email === '') {
            setErrorEmail('*Please enter email.');
        } else if (!emailRegex.test(email)) {
            setErrorEmail('*Please enter valid email.');
        } else {
            setErrorEmail(null);
        }
    }
    const _numbervalidate = number => {
        var numberRegex =
        /^[a-z ,.'-]+$/i
        if (number === '') {
            setErrorNumber('*Please enter number.');
        } else if (!numberRegex.test(number)) {
            setErrorNumber('*Please enter valid number.');
        } else {
            setErrorNumber(null);
        }
    };

    const FirstNameData = async (value) => {
        try {
            await AsyncStorage.setItem('firstname', Email)
            navigation.navigate(Screens.AddEmailorPhon)
        } catch (e) {
            console.log(e, "error in gender storage")
        }
    }

    const LastNameData = async (value) => {
        try {
            await AsyncStorage.setItem('lastname', Number)

        } catch (e) {
            console.log(e, "error in gender storage")
        }
    }


    return (
        <View style={styles.mainContinter}>
            <ScrollView>
                <ImageBackground source={image.image} style={styles.MainDiv}>
                    <View style={styles.titleCon}>
                        <Text style={styles.titTxt}>Add name</Text>
                    </View>
                    <View style={styles.dtailCon}>
                        <Text style={styles.detTxt}>
                            You can add a name or skip. In case you skip your username will be your name.</Text>
                    </View>
                    <KeyboardAvoidingView behavior='position'>
                        <View style={styles.usercon}>
                            <TextInput
                                style={styles.useText}
                                placeholder='First Name'
                                placeholderTextColor={'#000000'}
                                onChangeText={txt => {
                                    setEmail(txt), _emailValidate(txt);
                                }}
                            />
                            {errorEmail != null ? (
                                <View
                                    style={styles.redCon}>
                                    <Text
                                        style={styles.redTxt}>
                                        {errorEmail}
                                    </Text>
                                </View>
                            ) : null}
                            <View style={styles.passcon}>
                                <TextInput
                                    style={styles.useText}
                                    placeholder='Last Name'
                                    placeholderTextColor={'#000000'}
                                    maxLength={10}
                                    onChangeText={txt => {
                                        setNumber(txt), _numbervalidate(txt);
                                    }}
                                />
                                {errorNumber != null ? (
                                    <View
                                        style={styles.redCon}>
                                        <Text
                                            style={styles.redTxt}>
                                            {errorNumber}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.forgotCon}>
                    </View>
                    <View style={styles.titleCons}>
                        <TouchableOpacity style={styles.btnCon}
                            onPress={() => {
                                FirstNameData()
                                LastNameData()
                            }}
                        >
                            <Text style={styles.btnTxt}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forCon}>
                        <TouchableOpacity onPress={() => {
                                        navigation.navigate(Screens.AddEmailorPhon)
                                    }}>
                            <Text style={styles.anTxt}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}

export default AddName

const styles = StyleSheet.create({
    mainContinter: {
        flex: 1,
        // backgroundColor: 'cyan',
    },
    MainDiv: {
        height: height * 0.92,
        width: width / 1,
        // backgroundColor: 'lightblue',
    },
    titleCon: {
        height: height / 9, 
        width: width / 1.35,
        // backgroundColor: 'cyan',
        // justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center',

    },

    dtailCon: {
        // height: height / 7,
        width: width / 1.35,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center',

    },

    titTxt: {
        paddingTop: 20,
        fontSize: height / 21,
        // fontFamily: Montserrat,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    usercon: {
        height: height / 2,
        width: width / 1.35,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center',
    },
    useText: {
        height: height / 16,
        width: width / 1.35,
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
        width: width / 1.35,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 20
    },
    titleCons: {
        height: height / 10,
        width: width / 1.35,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        // alignItems: 'center',    
        alignSelf: 'center'
    },
    forCon: {
        height: height / 27,
        width: width / 1.35,
        // backgroundColor: 'cyan',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    anTxt: {
        color: '#707070',
        fontSize: 13,
        color: '#FFFFFF'
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
    },
    detTxt: {
        color: '#FFFFFF',
        fontSize: 15,

    }
})