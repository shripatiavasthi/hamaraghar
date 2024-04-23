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
import {unwrapResult} from '@reduxjs/toolkit';
import {TextInput} from 'react-native-gesture-handler';
import CommonTextInput from '../CommonTextInput/CommonTextInput';

export const ChangePassword = props => {

const [oldpassword , setoldpassword] = useState('')
const [newpassword , setnewpassword] = useState('')
const [confirmpassword , setconfirmpassword] = useState('')


  useEffect(() => {
    // console.log(props.route.params.item.id, 'all>>>>>>>>>>>>>>>');
    // props.navigation.addListener('focus', async () => {
    //   const data = {
    //     query: {id: props.route.params.item.id},
    //     token: props?.token,
    //   };

    //   const res = await props.allLead(data);
    //   const result = await unwrapResult(res);
    //   setdata(result);
    //   console.log(result, 'all product response response');
    //   const userres = await props.alluser(data);
    //   const userresult = await unwrapResult(userres);
    //   setuserlistdata(userresult.list);
    //   console.log(userresult, 'all user list');
    //   const filterres = await props.filterdata(data);
    //   const filterresult = await unwrapResult(filterres);
    //   setfilterstatedata(filterresult.filter_hash);
    //   console.log(filterresult.filter_hash, 'all filter response');
    // });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <Text
        style={[
          {fontSize: 36, color: '#0A1629', marginTop: 36, fontWeight: '600'},
        ]}>
        Change password
      </Text>
      <View>
        <CommonTextInput
          headingtext={'Old password'}
          value={oldpassword}
          onChangeText={setoldpassword}
          placeholder="Enter your email here"
          password={false}
          rightIconShow={false}
        />
        <CommonTextInput
          headingtext={'New password'}
          value={newpassword}
          onChangeText={setnewpassword}
          placeholder="Enter your email here"
          password={false}
          rightIconShow={false}
        />
        <CommonTextInput
          headingtext={'Confirm password'}
          value={confirmpassword}
          onChangeText={setconfirmpassword}
          placeholder="Enter your email here"
          password={false}
          rightIconShow={false}
        />
         <View
          style={{
            height: 73,
            paddingHorizontal: 10,
            marginBottom: 10,
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity style={styles.SIgnInButton} >
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Submit
            </Text>
          </TouchableOpacity>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
