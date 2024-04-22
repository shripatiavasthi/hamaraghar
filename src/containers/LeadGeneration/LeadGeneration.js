import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {navigate, Screens} from '../../helpers/Screens';
import Svg, {Circle, Line, Path} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getAllLead} from './leadGenerationSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import {TextInput} from 'react-native-gesture-handler';

const statuses = [
  {id: '1', name: 'Status 1'},
  {id: '2', name: 'Status 2'},
  {id: '3', name: 'Status 3'},
  {id: '4', name: 'Status 4'},
  {id: '5', name: 'Status 5'},
  {id: '6', name: 'Status 6'},
  {id: '7', name: 'Status 7'},
];

export const LeadGeneration = props => {
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionshown, setOptionshown] = useState(false);
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      const data = {
        query: {},
        token: props?.token,
      };

      const res = await props.allLead(data);
      const result = await unwrapResult(res);
      setdata(result);
      console.log(result, 'all lead response');
    });
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={()=>{
        props.navigation.navigate("Productdetails")
      }}
      >
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          alignItems: 'center',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}>
        <Image
          source={require('../../staticdata/images/Avatar5.jpeg')}
          style={{height: 40, width: 40, borderRadius: 50}}
        />
        <View style={{marginLeft: 20}}>
          <Text>Name : {item.client_name}</Text>
          <Text>Email : {item.client_email}</Text>
        </View>
      </View>
      <View
        style={styles.carddetailrow}>
        <View style={styles.gender}>
          <Text>Gender</Text>
          <Text>Male</Text>
        </View>
        <View style={styles.gender}>
          <Text>Birthday</Text>
          <Text>April 12</Text>
        </View>
        <View style={styles.gender}>
          <Text>Full age</Text>
          <Text>25</Text>
        </View>
      </View>
      <View
        style={styles.carddetailrow}>
        <View style={styles.gender}>
          <Text>Contact no.</Text>
          <Text>{item.contact_number}</Text>
        </View>
        <View style={styles.gender}>
          <Text>Mail</Text>
          <Text>{item.client_email}</Text>
        </View>
        <View style={styles.gender}>
          <Text>Status</Text>
          <Text>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStatus = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => setOptionshown(false)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <Text
        style={[
          {fontSize: 36, color: '#0A1629', marginTop: 36, fontWeight: '600'},
        ]}>
        Lead Generation
      </Text>
      <TouchableOpacity
        style={styles.filterbutton}
        onPress={() => setModalVisible(true)}>
        <Text>filter</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Please select status</Text>
            <TouchableOpacity
              style={styles.selectedoption}
              onPress={() => setOptionshown(true)}>
              <Text>Status</Text>
            </TouchableOpacity>
            {optionshown ? (
              <View style={styles.optionsbox}>
                <FlatList
                  data={statuses}
                  renderItem={renderStatus}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : null}
            <Text>Please select status</Text>
            <TextInput
              style={[styles.selectedoption, {height: 40}]}
              placeholder="Please enter range"
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[
                styles.selectedoption,
                {
                  alignItems: 'center',
                  backgroundColor: 'lightblue',
                  height: 40,
                },
              ]}
              >
              <Text style={{fontSize: 14, fontWeight: '700', color: '#fff'}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <View
        style={[
          {
            height: 200,
            backgroundColor: '#fff',
            alignItems: 'center',
            borderRadius: 25,
            marginTop: 12,
          },
        ]}>
        <View style={{marginTop: 25}}>
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
      </View> */}
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
  filterbutton: {
    backgroundColor: 'lightblue',
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  optionsbox: {
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.8,
    width: 200,
    justifyContent: 'center',
    padding: 10,
  },
  item: {
    width: '100%',
    height: 30,
  },
  selectedoption: {
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.8,
    width: 200,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginVertical: 5,
    height: 30,
  },
  carddetailrow:{
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent:"space-between"
  },
  gender:{
    width:"33%",
    height:"100%",
  },
  card:{
    height: 230,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});

const mapStateToProps = state => ({
  token: state.loginSliceNew.token,
  lead: state.leadGenerationSlice.leadData,
});

const mapDispatchToProps = dispatch => {
  return {
    allLead: data => {
      return dispatch(getAllLead(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadGeneration);
