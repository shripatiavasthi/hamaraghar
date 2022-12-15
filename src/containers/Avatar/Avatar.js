import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../css/Maincss'
import {createUser} from '../../Slices/CreateUserSlice'
import axios from 'axios';
import { getPhotoForId } from 'react-native-contacts';

const { height, width } = Dimensions.get('screen')

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const dummyimage = {  image: require("../../staticdata/images/Avatar1.jpeg")}

const Avatar = (props) => {

    const { navigation } = props

    const [avatar, setavatar] = useState()
    const [avatarindex, setavatarindex] = useState()
    const [chouseimage, setchouseimage] = useState()
    

    const [ name , setname] = useState("")
    const [lastname , setlastname ] = useState("")
    const [gender, setgender] = useState()
    const [birthday, setbirthday] = useState()
    const [email, setemail] = useState("")
    const [phone , setphone] = useState("")
    const [alies , setalies] = useState()

    console.log(avatar , "image i select")

   

    Details = [
        {
            id: 1,
            type: "Party",
            image: "https://phnk-dev.s3.amazonaws.com/user/IMG-20221129-WA0001.jpg"
        },
        {
            id: 2,
            type: "Wedding",
            image: "https://phnk-dev.s3.amazonaws.com/user/IMG-20221129-WA0002.jpg"
        },
        {
            id: 3,
            type: "Architecture",
            image: "https://phnk-dev.s3.amazonaws.com/user/IMG-20221129-WA0003.jpg"
        },
        {
            id: 4,
            type: "testing",
            image: "https://phnk-dev.s3.amazonaws.com/user/IMG-20221129-WA0004.jpg"
        },
        {
            id: 5,
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
        aliesname()
        DateOfBirth()
    }, [])

    const aliesname = async () => {
        try {
            const value = await AsyncStorage.getItem('alies')
            if (value !== null) {
                // value previously stored
                setalies(value)
                console.log(value, "fetching data")
            }
        } catch (e) {
            // error reading value
        }
    }

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
            const value = await AsyncStorage.getItem('Dob')
            if (value !== null) {
                // value previously stored
                setbirthday(value)
                console.log(value, "fetching dateof birth data")
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


    const Setimagedata = async (value) => {
        try {
            await AsyncStorage.setItem('Image', chouseimage)
        } catch (e) {
            console.log(e, "error in gender storage")
        }
    }

    const createuser = ( ) => {
        console.log(alies , name , lastname , gender , birthday , email , phone )
        axios({
            method: 'post',
            url: `http://54.214.196.237:3000/user/create`,
            data:{
                "user_alias": alies,
                "first_name": name,
                "last_name": lastname,
                "gender": gender,
                "date_of_birth": `${birthday}`,
                "email": email,
                "phone": phone,
                "bio": "asdfghjkl",
                "country": 5,
                "profile_pic" : avatar?.image
            }
          }).then((response) => {
            navigation.push(Screens.Belongone)
            Setimagedata()
            console.log(response.data , "create user response");
          }).catch((e)=>{
            // alert(`${e.response.data.data.error}`)
            console.log(e.response
                , "create user response error" )
          })
    }

    // const createuser = async () => {
    //         var bodyFormData = new FormData();
    //         bodyFormData.append("user_alias", alies);
    //         bodyFormData.append("first_name", name);
    //         bodyFormData.append("last_name", lastname);
    //         bodyFormData.append("gender", gender);
    //         bodyFormData.append("date_of_birth", `${birthday}`);
    //         bodyFormData.append("email", email);
    //         bodyFormData.append("phone", phone);
    //         bodyFormData.append("bio", "asdfghjkl");
    //         bodyFormData.append("country", 5);
    //         bodyFormData.append("profile_pic" , avatar?.image)
    //         // {
    //         //     images.map((item) => {
    //             //   bodyFormData.append('profile_picture', chouseimage);
    //         //     })
    //         //   }
    //         console.log(bodyFormData, "bodyform data")
    //         axios({
    //           method: "post",
    //           url: "http://54.214.196.237:3000/user/create",
    //           data: bodyFormData,
    //           headers: {
    //             "Content-Type": "multipart/form-data"
    //           },
    //         })
    //           .then(function (response) {
    //             //handle success
    //             console.log(response?.data?.data?.message
    //               , "avatro form dtat sucess");
    //           })
    //           .catch(function (response) {
    //             //handle error
    //             console.log(response
    //               , "avatar fail");
                  
    //           });
    //   }



      const Imagedatasend = async (value) => {
        console.log(value , "inside the function ")
        if(value.type == "Party"){
            try {
                await AsyncStorage.setItem('Image', "../../staticdata/images/Avatar1.jpeg")
            } catch (e) {
                console.log(e, "error in image storage")
            }
        }else if (value.type == "Wedding") {
            try {
                await AsyncStorage.setItem('Image', "../../staticdata/images/Avatar2.jpeg")
            } catch (e) {
                console.log(e, "error in image storage")
            }
        }else if (value.type == "Architecture") {
            try {
                await AsyncStorage.setItem('Image', "../../staticdata/images/Avatar3.jpeg")
            } catch (e) {
                console.log(e, "error in image storage")
            }
        }else if (value.type == "testing") {
            try {
                await AsyncStorage.setItem('Image', "../../staticdata/images/Avatar4.jpeg")
            } catch (e) {
                console.log(e, "error in image storage")
            }
        }else if (value.type == "Christening") {
            try {
                await AsyncStorage.setItem('Image', "../../staticdata/images/Avatar4.jpeg")
            } catch (e) {
                console.log(e, "error in image storage")
            }
        }

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
                                                Imagedatasend(item)
                                            }}>
                                            <View >
                                                <View  >
                                                    <Image
                                                        style={styles.AvatarOptions}
                                                        // source={item.image}
                                                        source={{
                                                            uri: `${item.image}`,
                                                          }}
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
        Usercreate: (data) => {
            return dispatch(createUser(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
