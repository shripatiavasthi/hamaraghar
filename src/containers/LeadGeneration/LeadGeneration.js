import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import Svg, {Circle, Line, Path} from 'react-native-svg';

export const LeadGeneration = props => {
  const curveHeight = (100 * 50) / 100;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      {/* <View style={styles.subcontainer}>

        </View> */}
      <View style={{alignItems: 'center' , backgroundColor:'yellow'}}>
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <Path
            d={`M 0 100 Q 50 ${100 - curveHeight} 100 100`}
            fill="transparent"
            stroke="#007bff"
            strokeWidth="3"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F4F9FD',
  },
  subcontainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeadGeneration);
