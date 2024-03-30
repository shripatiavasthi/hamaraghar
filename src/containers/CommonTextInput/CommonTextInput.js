// CommonTextInput.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CommonTextInput = ({headingtext, value, onChangeText, placeholder}) => {
  return (
    <View style={styles.customfeildview}>
      <Text style={styles.textinputheader}>{headingtext}</Text>
      <View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customfeildview: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headingtext: {
    color: '#7D8592',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {},
});

export default CommonTextInput;
