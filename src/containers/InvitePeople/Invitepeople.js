import React, { useState ,  } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'

export const InvitePeople = (props) => {

    const [caseone, setcaseone] = useState(true)
    const [casetwo, setcasetwo] = useState(false)
    const [casethree, setcasethree] = useState(false)

    const [option, setoption] = useState()
    const [optionindex, setoptionindex] = useState()

    const allgender = ['Female', 'Male', 'Non-binary', 'Tansgender', 'Prefer not to say', 'Male', 'Non-binary', 'Tansgender', 'Prefer not to say']

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
                                    <Text style={belongstyles.GenderText}>{item}</Text>
                                </View>
                                <View style={styles.checkbox} >
                                    {optionindex === index ?
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                        /> : null}
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
                                    <Text style={belongstyles.GenderText}>{item}</Text>
                                </View>
                                <View style={styles.checkbox} >
                                    {optionindex === index ?
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                        /> : null}
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
                                    <Text style={belongstyles.GenderText}>{item}</Text>
                                </View>
                                <View style={styles.checkbox} >
                                    {optionindex === index ?
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                        /> : null}
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
                                <Text >Grow your community , invite people to join </Text>
                            </View>
                        </View>
                        <View style={belongstyles.form}>
                            <View style={belongstyles.OPTIONS}>
                                <TouchableOpacity
                                    style={caseone ? belongstyles.ChouseSection : belongstyles.UnSelectChouseSection}
                                    onPress={() => {
                                        setcaseone(true)
                                        setcasetwo(false)
                                        setcasethree(false)
                                    }}>
                                    <Text>Followers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={casetwo ? belongstyles.ChouseSection : belongstyles.UnSelectChouseSection}
                                    onPress={() => {
                                        setcaseone(false)
                                        setcasetwo(true)
                                        setcasethree(false)
                                    }}>
                                    <Text>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={casethree ? belongstyles.ChouseSection : belongstyles.UnSelectChouseSection}
                                    onPress={() => {
                                        setcaseone(false)
                                        setcasetwo(false)
                                        setcasethree(true)
                                    }}>
                                    <Text>Contact</Text>
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
                                <Text style={belongstyles.SubmitButtonText}>Create your own community </Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text >Later </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InvitePeople)