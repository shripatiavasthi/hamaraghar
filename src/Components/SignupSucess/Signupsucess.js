import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'

const { height, width } = Dimensions.get('screen')

function Signupsucess() {
    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Sucess</Text> 
                        <Text style={styles.subheading}>you are verified</Text>
                    </View>
                    <View style={styles.subview}>
                        <TouchableOpacity style={styles.submit}>
                            <Text>Done</Text>
                        </TouchableOpacity>
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
        padding: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subheading:{
        paddingTop: 10,
        fontSize: 15
    },
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    forget:{
        display : 'flex',
        flexDirection : 'row-reverse',
        paddingTop: 10
    },
    submit:{
        backgroundColor: 'yellow',
        height:height/15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height/4
    },
    haveaccount:{
        paddingTop: 10,
        justifyContent:'center',
        alignItems: 'center',
    }
})

export default Signupsucess

