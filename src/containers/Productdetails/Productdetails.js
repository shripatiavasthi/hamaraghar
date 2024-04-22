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
  ScrollView,
} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {navigate, Screens} from '../../helpers/Screens';
import Svg, {Circle, Line, Path} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getAllLead} from './leadGenerationSlice';
import {getuserlist} from './getuserlistactionSlice';
import {getfilterlist} from './getfilteractionSlice';
import {postUserLogin} from './updateactionSlice';
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

export const Productdetails = props => {
  const [data, setdata] = useState([]);
  const [filterstatedata, setfilterstatedata] = useState([]);
  const [userlistdata, setuserlistdata] = useState([]);
  const [selectedstatus , setselectedstatus] = useState("")
  const [userid, setuserid] = useState(0);
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
      console.log(result, 'all product response response');
      const userres = await props.alluser(data);
      const userresult = await unwrapResult(userres);
      setuserlistdata(userresult.list);
      console.log(userresult, 'all user list');
      const filterres = await props.filterdata(data);
      const filterresult = await unwrapResult(filterres);
      setfilterstatedata(filterresult.filter_hash);
      console.log(filterresult.filter_hash, 'all filter response');
    });
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setuserid(item.id);
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
      }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const newrenderItem = ({item}) => (
    <TouchableOpacity
    onPress={()=>{
        setselectedstatus(item.name)
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
      }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleLogin = async () => {
    let fromBody = new FormData();
    fromBody.append('status', selectedstatus);
    fromBody.append('user_id', userid);

    const data = {
      body: fromBody,
      query: {},
      formData: true,
    };

    const res = await props.doLogin(data);
    const result = await unwrapResult(res);

    console.log(result, 'update api response');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <Text
        style={[
          {fontSize: 36, color: '#0A1629', marginTop: 36, fontWeight: '600'},
        ]}>
        Product Details
      </Text>
      <ScrollView style={styles.card}>
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
            <Text>Name : {data.client_name}</Text>
            <Text>Email : {data.client_email}</Text>
          </View>
        </View>
        <View style={styles.carddetailrow}>
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
        <View style={styles.carddetailrow}>
          <View style={styles.gender}>
            <Text>Contact no.</Text>
            <Text>{data.contact_number}</Text>
          </View>
          <View style={styles.gender}>
            <Text>Mail</Text>
            <Text>{data.client_email}</Text>
          </View>
          <View style={styles.gender}>
            <Text>Status</Text>
            <Text>{data.status}</Text>
          </View>
        </View>
        <Text>All users</Text>
        <FlatList
          data={userlistdata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
        />
        <Text>All status</Text>
        <FlatList
          data={filterstatedata}
          renderItem={newrenderItem}
          keyExtractor={item => item}
          numColumns={3}
        />
        <TouchableOpacity style={styles.SIgnInButton} onPress={handleLogin}>
          <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  SIgnInButton: {
    height: 53,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#3F8CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
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
    alluser: data => {
      return dispatch(getuserlist(data));
    },
    filterdata: data => {
      return dispatch(getfilterlist(data));
    },
    doLogin: data => {
      return dispatch(postUserLogin(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Productdetails);
