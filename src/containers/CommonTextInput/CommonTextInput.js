// CommonTextInput.js
import React from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import {IMAGES} from '../Allassets/Allassets';

const CommonTextInput = ({
  password,
  headingtext,
  value,
  onChangeText,
  placeholder,
  rightIconShow
}) => {
  return (
    <View style={styles.customfeildview}>
      <Text style={styles.textinputheader}>{headingtext}</Text>
      <View style={styles.Inputtextfeildconatiner}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={password}
        />
        {rightIconShow ? 
        <Image
          source={require('../../staticdata/images/viewpassword.png')}
          style={{height: 24, width: 24}}
        /> : null }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customfeildview: {
    height: 90,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 7,
  },
  textinputheader: {
    color: '#7D8592',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
  },
  Inputtextfeildconatiner: {
    height: 45,
    borderColor: '##7D8592',
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  input: {},
});

export default CommonTextInput;
