import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {navigate, Screens} from '../../helpers/Screens';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getAllLead } from './leadGenerationSlice';
import { unwrapResult } from '@reduxjs/toolkit'

export const LeadGeneration = props => {

  useEffect(() => {
    props.navigation.addListener('focus',async ()=>{

      const data = {
        query : {},
        token : props?.token,
      }

      const res = await props.allLead(data)
      const result = await unwrapResult(res)

      console.log(result)
    })
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <Text style={[{ fontSize: 36, color: '#0A1629', marginTop: 36, fontWeight : '600' }]}>Lead Generation</Text>

      <View style={[{height : 200,backgroundColor: 'white', alignItems : 'center', borderRadius : 25, marginTop :12 }]}>
        <View style={{ marginTop : 25}}>
          <AnimatedCircularProgress
            size={280}
            width={20}
            fill={50}
            tintColor="#006AFF"
            backgroundColor="#F1F1F4"
            rotation={-90}
            lineCap="round"
            arcSweepAngle={180} >
            {fill => <Text style={[{fontSize : 24,fontWeight : '400',marginBottom : 100, color : 'black'}]}>{"500000"}</Text>}
          </AnimatedCircularProgress>
        </View>
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

const mapStateToProps = state => ({
  token : state.loginSliceNew.token,
  lead : state.leadGenerationSlice.leadData
});

const mapDispatchToProps = dispatch => {
  return {
    allLead: data => {
      return dispatch(getAllLead(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadGeneration);
