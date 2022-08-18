import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'

const { height, width } = Dimensions.get('screen')

function AddEmailorPhone() {
    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Add your e-mail or phone</Text> 
                        <Text style={styles.subheading}>vcvfhjvxbv vhdfvhbdfxmnfvhv gfgdsvchdf gvchgdvcghd gvcghdvcghd vcgvfdcv vhcvdhc hgvhgdvch vchdvchgdfvch hvchgdfvhgdfv vhvdfhvd vhgvdfhgvdfhgv b hbvhdfbvhjdfbvjdf v jf vhfdvh nmbv  vdvhdf vb dh v d v</Text>
                    </View>
                    <View style={styles.subview}>
                        <View>
                            <TextInput placeholder='enter email' style={styles.input}>
                            </TextInput>
                            <TextInput placeholder='enter phonenumber' style={styles.input}>
                            </TextInput>
                        </View>
                        
                        <TouchableOpacity style={styles.submit}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.haveaccount}>
                            <Text>Skip</Text>
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
        padding: 10
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
        marginTop: 50
    },
    haveaccount:{
        paddingTop: 10,
        justifyContent:'center',
        alignItems: 'center',
    }
})

export default AddEmailorPhone

