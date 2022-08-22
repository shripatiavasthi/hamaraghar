import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'

const { height, width } = Dimensions.get('screen')

export const CreateUser = (props) => {

    const [user, setUser] = useState(null)
    const [firstName, setfirstName] = useState()
    const [lastName, setlastName] = useState()
    const [gender, setgender] = useState()
    const [dob, setdob] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [bio, setbio] = useState()
    const [country, setcountry] = useState()

    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>CreateUser</Text>
                        <View>
                            <TextInput placeholder='Unique User Name' style={styles.input}
                                onChangeText={(value) => {
                                    setUser(value)
                                }}>
                            </TextInput>
                            <TextInput placeholder='first name' style={styles.input}
                                onChangeText={(value) => {
                                    setfirstName(value)
                                }}>
                            </TextInput>
                            <TextInput placeholder='last name' style={styles.input}
                                onChangeText={(value) => {
                                    setlastName(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='gender' style={styles.input}
                                onChangeText={(value) => {
                                    setgender(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='date of birth' style={styles.input}
                                onChangeText={(value) => {
                                    setdob(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='email' style={styles.input}
                                onChangeText={(value) => {
                                    setemail(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='phone' style={styles.input}
                                onChangeText={(value) => {
                                    setphone(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='bio' style={styles.input}
                                onChangeText={(value) => {
                                    setbio(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='country' style={styles.input}
                                onChangeText={(value) => {
                                    setcountry(value)
                                }}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.submit}
                            onPress={() => {
                                const data = {
                                    query: {},
                                    body: {

                                    }
                                }
                                props?.doLogin(data)
                            }}
                        >
                            <Text>Create User</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subview}>

                    </View>
                </View>
            </View>
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
        height: height / 2.6,
        margin: 10,
        // backgroundColor: 'red',
        padding: 10
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subheading: {
        paddingTop: 10,
        fontSize: 15
    },
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    forget: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 10
    },
    submit: {
        backgroundColor: 'yellow',
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    haveaccount: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)