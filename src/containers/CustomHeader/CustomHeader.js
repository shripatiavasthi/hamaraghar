import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Svg, {Circle, Line, Path} from 'react-native-svg';

export const CustomHeader = props => {
  return (
    <View style={styles.constainer}>
      <View style={styles.firstconatiner}>
        <Image
          source={require('../../staticdata/images/Brandlogo.png')}
          style={{height: 60, width: 151}}
        />
      </View>
      <View style={styles.secondconatiner}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => {
            props.navigation.navigate("ChangePassword")
          }}>
          <Image
            source={require('../../staticdata/images/Avatar5.jpeg')}
            style={{height: 30, width: 30, borderRadius: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: '#fff',
    height: '9%',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 25,
  },
  firstconatiner: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondconatiner: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile: {
    backgroundColor: 'pink',
    borderRadius: 50,
  },
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
