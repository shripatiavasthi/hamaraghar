import React, {useEffect, useState , useCallback} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  BackHandler,
  Alert,
} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {navigate, Screens} from '../../helpers/Screens';
import Svg, {Circle, Line, Path} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getAllLead} from './leadGenerationSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import {TextInput} from 'react-native-gesture-handler';
import {getfilterlist} from './getfilteractionSlice';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export const LeadGeneration = props => {
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterstatedata, setfilterstatedata] = useState([]);
  const [selectedfilterstatuses, setselectedfilterstatuses] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalpages , settotalpages] = useState(0)

  // useEffect(() => {
  //   props.navigation.addListener('focus', async () => {
  //     const data = {
  //       query: {},
  //       token: props?.token,
  //     };

  //     const res = await props.allLead(data);
  //     const result = await unwrapResult(res);
  //     setdata(result);
  //     console.log(result, 'all lead response');
  // const filterres = await props.filterdata(data);
  // const filterresult = await unwrapResult(filterres);
  // setfilterstatedata(filterresult.filter_hash);
  //     console.log(filterresult.filter_hash, 'all filter response');
  //   });
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       { text: 'YES', onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    filter();
    NotificationService.requestUserPermission();
    NotificationService.listenForNotifications();
  }, []);

  const NotificationService = {
    // navigationRef: null,
    // setNavigation(navigationRef) {
    //   this.navigationRef = navigationRef;
    // },

    async requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        this.getFcmToken();
      }
    },

    async getFcmToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log('FcmToken old token:', fcmToken);
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
          console.log('New FCM Token:', fcmToken);
          setfcmToken(fcmToken);
        }
      } else {
        console.log('Existing FCM Token:', fcmToken);
      }
    },

    listenForNotifications() {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        if (remoteMessage.data.type === 'lead') {
          props.navigation.navigate('Productdetails', {
            item: remoteMessage.data.id,
          });
        } else if (remoteMessage.data.type === 'review') {
          props.navigation.navigate('Review', {item: remoteMessage.data.id});
        }
      });

      messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        if (remoteMessage.data.type === 'lead') {
          props.navigation.navigate('Productdetails', {
            item: remoteMessage.data.id,
          });
        }
      });

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            if (remoteMessage.data.type === 'lead') {
              props.navigation.navigate('Productdetails', {
                item: remoteMessage.data.id,
              });
            }
          }
        });
    },
  };

  const filter = async () => {
    setdata([])
    const data = {
      query: {
        status: selectedfilterstatuses,
        page: 1,
        query: '',
      },
      token: props?.token,
    };

    const res = await props.allLead(data);
    const result = await unwrapResult(res);
    setdata(result.leads);
    settotalpages(result.total_pages)
    const filterres = await props.filterdata(data);
    const filterresult = await unwrapResult(filterres);
    setfilterstatedata(filterresult.filter_hash);
    console.log(result.total_pages, 'all lead response');
  };

  const infinitescroll = async () => {
   
    if (loading) return;
    
    try {
      const data = {
        query: {
          status: selectedfilterstatuses,
          page: page,
          query: searchQuery,
        },
        token: props?.token,
      };
      const res = await props.allLead(data);
      const result = await unwrapResult(res);
      console.log("newresponse",result)
      if( page <= result.total_pages ){
      setLoading(true);
      setdata(prevData => [...prevData, ...result.leads]);
      setPage(prevPage => prevPage + 1);
      }else {
        setLoading(false);
        return
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return 
    } finally {
    setLoading(false);
    }
  
  };

  const handleEndReached = () => {
    if (!loading ) {
      infinitescroll();
    }
}

const handleSearch = async () => {
  // Implement your search logic here
  setdata([]);
  console.log('Search Query:', searchQuery);
  const data = {
    query: {
      status: selectedfilterstatuses,
      page: 1,
      query: searchQuery,
    },
    token: props?.token,
  };

  const res = await props.allLead(data);
  const result = await unwrapResult(res);
  setdata(result.leads);
};

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setIsRefreshing(false);
    filter();
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
    <>
      {selectedfilterstatuses == '' || selectedfilterstatuses == item.status ? (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            props.navigation.navigate('Productdetails', {item: item.id});
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 80,
              alignItems: 'center',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
            }}>
            {/* <Image
          source={require('../../staticdata/images/Avatar5.jpeg')}
          style={{height: 40, width: 40, borderRadius: 50}}
        /> */}
            <View style={{}}>
              <Text>
                {item.client_name} Status : {item.status}
              </Text>
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
              <Text>Contact no. : {item.contact_number}</Text>
              {/* <Text></Text> */}
            </View>
            <View style={styles.gender}>
              <Text>Quotation : {item.quotation}</Text>
              {/* <Text></Text> */}
            </View>
            {/*  <View style={styles.gender}>
          <Text>Status</Text>
          <Text>{item.status}</Text>
        </View> */}
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );

  const renderFooter = () => {
    // if (!loading) return null;
    // return <ActivityIndicator style={styles.loader} />;
    return loading ? (
      <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" />
      </View>
  ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader navigation={props.navigation} />
      <View style={styles.headercontainer}>
        <Text
          style={[
            {fontSize: 26, color: '#0A1629', fontWeight: '600', marginLeft: 10},
          ]}>
          Lead Generation
        </Text>
      </View>
      <View style={[styles.headercontainer,{marginVertical:5}]}>
        <View style={{flexDirection:"row",backgroundColor:"#fff" }}>
      <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <TouchableOpacity style={styles.searchIcon} 
            onPress={()=>{
              handleSearch()
            }}
            >
                <Icon name="search" size={24} color="#000" />
            </TouchableOpacity>
            </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.filterbutton, {width: 90}]}
          onPress={() => setModalVisible(true)}>
          <Text>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterbutton,
            {backgroundColor: 'red', width: 90, marginLeft: 30},
          ]}
          onPress={() => filter()}>
          <Text style={{color: '#fff'}}>Clear filter</Text>
        </TouchableOpacity>
      </View>
      {data.length <= 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <Text>No lead present</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      )}
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
  row: {
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
    width: '50%',
    height: '70%',
    justifyContent: 'center',
  },
  card: {
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
},
searchIcon: {
    padding: 10,
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
