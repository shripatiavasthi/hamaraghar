import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import Svg, {Circle, Line, Path} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export const LeadGeneration = props => {
  const curveHeight = (100 * 50) / 100;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      {/* <View style={styles.subcontainer}>

        </View> */}
      <View style={{alignItems: 'center', backgroundColor: 'yellow'}}>
        <AnimatedCircularProgress
           size={200}
           width={10}
           fill={50} // Change this value dynamically to update the progress
           tintColor="#00e0ff"
           backgroundColor="#3d5875"
           rotation={-90} // Start from the top (12 o'clock position)
           lineCap="round"
           arcSweepAngle={180} >
          {fill => <Text>{"500000"}</Text>}
        </AnimatedCircularProgress>
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
