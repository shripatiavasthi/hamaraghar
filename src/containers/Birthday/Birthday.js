import React from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { createUser } from '../../Slices/CreateUserSlice'

const { height, width } = Dimensions.get('screen')

export const Birthday = (props) => {


    console.log(props.user, "create user response")

    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Add your e-mail or phone</Text>
                        <Text style={styles.subheading}>vcvfhjvxbv vhdfvhbdfxmnfvhv gfgdsvchdf gvchgdvcghd gvcghdvcghd vcgvfdcv vhcvdhc hgvhgdvch vchdvchgdfvch hvchgdfvhgdfv vhvdfhvd vhgvdfhgvdfhgv b hbvhdfbvhjdfbvjdf v jf vhfdvh nmbv  vdvhdf vb dh v d v</Text>
                        <View>
                            <TextInput placeholder='Enter Birthday' style={styles.input}>
                            </TextInput>
                        </View>
                    </View>
                    <View  style={styles.submitView}>
                        <TouchableOpacity style={styles.submit}
                            onPress={() => {
                                const data = {
                                    query: {},
                                    body: {
                                        "user_alias": "Subhi2197",
                                        "first_name": "Subhi",
                                        "last_name": "Tandon",
                                        "gender": "male",
                                        "date_of_birth": 767676,
                                        "email": "subhi6565@gmail.com",
                                        "phone": 8989989887,
                                        "bio": "jhvjhvdjhv",
                                        "country": 5
                                    }
                                }
                                props?.createuser(data)
                            }}
                        >
                            <Text>Sign Up</Text>
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
        height: height / 2,
        margin: 10,
        // backgroundColor: 'red',
        padding: 10,
        justifyContent:'space-evenly'
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
    },
    submitView:{
        height: height/4,
        justifyContent: 'flex-end',
        // backgroundColor:'green'
    }
})

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