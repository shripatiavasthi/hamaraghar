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
import {getfilterlist} from './getfilteractionSlice';


export const LeadGeneration = props => {
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterstatedata, setfilterstatedata] = useState([]);
  const [selectedfilterstatuses, setselectedfilterstatuses] = useState('');

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
      const filterres = await props.filterdata(data);
      const filterresult = await unwrapResult(filterres);
      setfilterstatedata(filterresult.filter_hash);
      console.log(filterresult.filter_hash, 'all filter response');
    });
  }, []);

  const filter = async () => {
    const data = {
      query: {status: selectedfilterstatuses},
      token: props?.token,
    };

    const res = await props.allLead(data);
    const result = await unwrapResult(res);
    setdata(result);
    console.log(result, 'all lead response');
  };

  const newrenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setselectedfilterstatuses(item.name);
      }}
      style={{
        borderColor: 'lightgray',
        borderWidth: 0.8,
        borderRadius: 10,
        height: 40,
        width: 85,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          selectedfilterstatuses == item.name ? 'lightblue' : 'white',
      }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        props.navigation.navigate('Productdetails', {item: item});
      }}>
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
          {/* <Text>Email : {item.client_email}</Text> */}
        </View>
      </View>
      {/* <View style={styles.carddetailrow}>
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
      </View> */}
      <View style={styles.carddetailrow}>
        <View style={styles.gender}>
          <Text>Contact no.</Text>
          <Text>{item.contact_number}</Text>
        </View>
        {/* <View style={styles.gender}>
          <Text>Mail</Text>
          <Text>{item.client_email}</Text>
        </View>
        <View style={styles.gender}>
          <Text>Status</Text>
          <Text>{item.status}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader navigation={props.navigation} />
      <View style={styles.headercontainer}>
        <Text
          style={[
            {fontSize: 36, color: '#0A1629', fontWeight: '600', marginLeft: 10},
          ]}>
          Lead Generation
        </Text>
      </View>
      <View style={styles.row}>
      <TouchableOpacity
        style={styles.filterbutton}
        onPress={() => setModalVisible(true)}>
        <Text>filter</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={[styles.filterbutton,{backgroundColor:"red",width:90, marginLeft:30}]}
        onPress={() => filter()}>
        <Text style={{color:"#fff"}}>Clear filter</Text>
      </TouchableOpacity>
      </View>
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
            <FlatList
              data={filterstatedata}
              renderItem={newrenderItem}
              keyExtractor={item => item}
              numColumns={3}
            />
            <TouchableOpacity
              onPress={() => {
                filter();
                setModalVisible(false);
                setselectedfilterstatuses('');
              }}
              style={[
                styles.selectedoption,
                {
                  alignItems: 'center',
                  backgroundColor:
                    selectedfilterstatuses != '' ? 'lightblue' : 'lightgray',
                  height: 40,
                },
              ]}>
              <Text style={{fontSize: 14, fontWeight: '700', color: '#fff'}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F4F9FD',
  },
  row:{
    flexDirection: 'row',
  },
  subcontainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  headercontainer: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
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
  carddetailrow: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gender: {
    width: '33%',
    height: '100%',
  },
  card: {
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
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
    filterdata: data => {
      return dispatch(getfilterlist(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadGeneration);
