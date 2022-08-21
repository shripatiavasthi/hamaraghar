import React,{ useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { postLogin } from '../../slices/LoginSlice'


const LoginScreen = (props) => {
  const [Number,setNumber] = useState()
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.textstyle}>LoginScreen</Text>
      <TextInput
        value={Number}
        placeholder='Input Number'
        onChangeText={(value) => {
          setNumber(value)
        }}
      />
      <Button
        onPress={() => {
          const data = {
            query : {},
            body : {
              phone_number : Number
            }
          }
          props?.doLogin(data)
        }}
        title='Press Me'
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => {
  return {
      doLogin: (data) => {
          dispatch(postLogin(data));
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    width: '100%',
  },
  textstyle: {
    fontSize: 50,
    fontWeight: 'bold',
  }
})