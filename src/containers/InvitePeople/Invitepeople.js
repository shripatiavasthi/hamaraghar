import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { navigate, Screens } from '../../helpers/Screens';
import { followers } from '../../Slices/FollowersSlice'
import { followed } from '../../Slices/FollowedSlice'
import DeviceInfo from 'react-native-device-info';
import { unwrapResult } from '@reduxjs/toolkit';

export const InvitePeople = (props) => {

    const { navigation } = props

    const [caseone, setcaseone] = useState(true)
    const [casetwo, setcasetwo] = useState(false)
    const [casethree, setcasethree] = useState(false)

    const [option, setoption] = useState()
    const [optionindex, setoptionindex] = useState()

    const allgender = ['Female', 'Male', 'Non-binary', 'Tansgender', 'Prefer not to say', 'Male', 'Non-binary', 'Tansgender', 'Prefer not to say']


    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        getfollowers()
        deviceid()
        getfollowed()
    },[])

    console.log(props?.token ,"token")

    const deviceid = () => {
        DeviceInfo.getAndroidId().then((androidId) => {
            // androidId here
            console.log(androidId , "android id")
          });
    }

    const getfollowers = async () => {
        const data = {
            token: props?.token,
            query: {},
            body : {}
        }
        const resp = await dispatch(followers(data))
        const rawData = await unwrapResult(resp)
        console.log(rawData , "followers data")
        // setData(rawData?.data?.result ?? [])
        // console.log(rawData?.data?.result,"MMMM")
    }

    const getfollowed = async () => {
        const data = {
            token: props?.token,
            query: {},
            body : {}
        }
        const resp = await dispatch(followed(data))
        const rawData = await unwrapResult(resp)
        console.log(rawData , "followers data")
        // setData(rawData?.data?.result ?? [])
        // console.log(rawData?.data?.result,"MMMM")
    }


    const Followers = () => {
        return (
            <View style={belongstyles.followers}>
                {allgender.map((item, index) => {
                    return (
                        <TouchableOpacity
                            style={belongstyles.options}
                            key={index}
                            onPress={() => {
                                setoption(item)
                                setoptionindex(index)
                                if (option === item) {
                                    setoption()
                                    setoptionindex()
                                }
                            }}>
                            <View style={belongstyles.option}>
                                <View style={belongstyles.optionname}>
                                    <View style={belongstyles.user}>
                                        <EvilIcons name="user" size={30} color="black" />
                                    </View>
                                    <View>
                                        <Text style={belongstyles.GenderText}>{item}</Text>
                                        <Text style={{ fontSize: 12 }}>Shared groups heavens</Text>
                                    </View>
                                </View>
                                <View style={styles.checkbox} >
                                    {optionindex === index ?
                                        // <Image
                                        //     style={styles.tinyLogo}
                                        //     source={{
                                        //         uri: 'https://reactnative.dev/img/tiny_logo.png',
                                        //     }}
                                        // />
                                        <IconAntDesign name="check" size={30} color="#900" />
                                        : null}
                                </View >
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const Following = () => {
        return (
            <View style={belongstyles.followers}>
                {allgender.map((item, index) => {
                    return (
                        <TouchableOpacity
                            style={belongstyles.options}
                            key={index}
                            onPress={() => {
                                setoption(item)
                                setoptionindex(index)
                                if (option === item) {
                                    setoption()
                                    setoptionindex()
                                }
                            }}>
                            <View style={belongstyles.option}>
                                <View style={belongstyles.optionname}>
                                    <View style={belongstyles.user}>
                                        <EvilIcons name="user" size={45} color="black" />
                                    </View>
                                    <View>
                                        <Text style={belongstyles.GenderText}>{item}</Text>
                                        <Text>Shared groups heavens</Text>
                                    </View>
                                </View>
                                <View style={styles.checkbox} >
                                    {optionindex === index ?
                                        // <Image
                                        //     style={styles.tinyLogo}
                                        //     source={{
                                        //         uri: 'https://reactnative.dev/img/tiny_logo.png',
                                        //     }}
                                        // />
                                        <IconAntDesign name="check" size={30} color="#900" />
                                        : null}
                                </View >
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const Contact = () => {
        return (
            <View style={belongstyles.followers}>
                {allgender.map((item, index) => {
                    return (
                        <TouchableOpacity
                            style={belongstyles.options}
                            key={index}
                            onPress={() => {
                                setoption(item)
                                setoptionindex(index)
                                if (option === item) {
                                    setoption()
                                    setoptionindex()
                                }
                            }}>
                            <View style={belongstyles.option}>
                                <View style={belongstyles.optionname}>
                                    <View style={belongstyles.user}>
                                        <EvilIcons name="user" size={45} color="black" />
                                    </View>
                                    <View>
                                        <Text style={belongstyles.GenderText}>{item}</Text>
                                        <Text>Shared groups heavens</Text>
                                    </View>
                                </View>
                                <View style={styles.checkbox} >
                                    {optionindex === index ?
                                        // <Image
                                        //     style={styles.tinyLogo}
                                        //     source={{
                                        //         uri: 'https://reactnative.dev/img/tiny_logo.png',
                                        //     }}
                                        // />
                                        <IconAntDesign name="check" size={30} color="#900" />
                                        : null}
                                </View >
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }


    return (
        <SafeAreaView>
            <View style={belongstyles.container}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={belongstyles.Headingdiv}>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.headingtext}>Invite people</Text>
                            </View>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.detTxt}>Grow your community , invite people to join </Text>
                            </View>
                        </View>
                        <View style={belongstyles.InviteView}>
                            <View style={belongstyles.OPTIONS}>
                                <TouchableOpacity
                                    style={caseone ? belongstyles.ChouseSection : belongstyles.UnSelectChouseSection}
                                    onPress={() => {
                                        setcaseone(true)
                                        setcasetwo(false)
                                        setcasethree(false)
                                    }}>
                                    <Text style={caseone ? belongstyles.selectoptiontext : belongstyles.unselectoptiontext}>Followers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={casetwo ? belongstyles.ChouseSection : belongstyles.UnSelectChouseSection}
                                    onPress={() => {
                                        setcaseone(false)
                                        setcasetwo(true)
                                        setcasethree(false)
                                    }}>
                                    <Text style={casetwo ? belongstyles.selectoptiontext : belongstyles.unselectoptiontext}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={casethree ? belongstyles.ChouseSection : belongstyles.UnSelectChouseSection}
                                    onPress={() => {
                                        setcaseone(false)
                                        setcasetwo(false)
                                        setcasethree(true)
                                    }}>
                                    <Text style={casethree ? belongstyles.selectoptiontext : belongstyles.unselectoptiontext}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                <View>
                                    {caseone ? <Followers /> : null}
                                    {casetwo ? <Following /> : null}
                                    {casethree ? <Contact /> : null}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={belongstyles.browseAll}>
                            <TouchableOpacity style={belongstyles.SubmitButton}>
                                <Text style={belongstyles.SubmitButtonText}>Invite </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            // onPress={navigation.push(Screens.Home)}
                            >
                                <Text >Later </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    token : state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InvitePeople)