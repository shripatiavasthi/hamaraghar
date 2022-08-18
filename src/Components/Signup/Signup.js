import React from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { useGetPokemonByNameQuery } from '../../Slices/apislices'


const { height, width } = Dimensions.get('screen')

export const Signup = (props) => {

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

    console.log(data , "data from api")
    console.log(error , "error from api")
    console.log(isLoading , "data is loadind from api")

    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Sign up</Text>
                    </View>
                    <View style={styles.subview}>
                        <View>
                            <TextInput placeholder='username' style={styles.input}>
                            </TextInput>
                            <TextInput placeholder='password' style={styles.input}>
                            </TextInput>
                        </View>
                        <View style={styles.forget}>
                            <TouchableOpacity>
                                <Text>Forget password</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.submit}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.haveaccount}>
                            <Text>Have an account login</Text>
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
        fontSize: 24
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
        backgroundColor: 'FF473A',
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    haveaccount: {
        paddingTop: 10
    }
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)