import React,{ useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput , SafeAreaView , Dimensions , TouchableOpacity , ImageBackground } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../Slices/LoginSlice'
import { navigate, Screens } from '../../helpers/Screens';

const { height, width } = Dimensions.get('screen')

const image = { uri: "https://reactjs.org/logo-og.png" };

const AddName = (props , navigation) => {

  const [Firstname,setFirstname] = useState()
  const [Lastname,setLastname] = useState()

  console.log(props.login , "signup screen")

  return (
    <SafeAreaView >
        <ImageBackground ource={image} resizeMode="cover" style={styles.image}>
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Add name</Text>
                        <Text>You can add a name or skip. In case you skip your username will be your name.</Text>
                    </View>
                    <View style={styles.subview}>
                        <View>
                            <TextInput placeholder='First Name' style={styles.input}
                                 onChangeText={(value) => {
                                    setFirstname(value)
                                }}
                            >
                            </TextInput>
                            <TextInput placeholder='Last Name' style={styles.input}
                                 onChangeText={(value) => {
                                    setLastname(value)
                                }}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.submit} 
                            onPress={() => {
                              const data = {
                                query : {},
                                body : {
                                  "alias":"gfgfghfhj",
                                  "password": "hghghjgh"
                                }
                              }
                              props?.doLogin(data)
                            }}
                        >
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
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
  },
  mage: {
    flex: 1,
    justifyContent: "center"
  },
})

const mapStateToProps = (state) => ({
    login : state.LoginSlice
})

const mapDispatchToProps = (dispatch) => {
  return {
      doLogin: (data) => {
          dispatch(postLogin(data));
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddName)
