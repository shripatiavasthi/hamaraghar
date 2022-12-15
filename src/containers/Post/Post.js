import React, { useEffect, useState } from 'react'
import {
  Dimensions, StyleSheet, Text, View, KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
  Pressable
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createpostslice, getGroupListApi } from '../../Slices/CreatePostSlice'
import { connect, useDispatch } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { unwrapResult } from '@reduxjs/toolkit'
// import VideoRecorder from 'react-native-beautiful-video-recorder';
// import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import { navigate, Screens } from '../../helpers/Screens';
import axios from 'axios'
import DocumentPicker from 'react-native-document-picker'
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { get_curated_timeline, get_post_replies, post_comment_reply, get_search_timeline,get_profile_details } from '../../Slices/TimelineSlice';

const { height, width } = Dimensions.get('screen')



const Newpage = (props) => {

  const { navigation } = props

  const [Deviceid, setdeviceid] = useState()
  const [content, setcontent] = useState("")
  const [groupsList, setGroupsList] = useState([])
  const [filteredGroupsList, setfilteredGroupsList] = useState([])
  const [GroupId, setGroupId] = useState([])
  const [groupid, setgroupid] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState()
  const [oneclick, setOneclick] = useState(false)

  console.log(GroupId,  "group ids" , groupid )

  const dispatch = useDispatch()

  useEffect(() => {
    deviceid()
    getGroupList()
  }, [])

  const Invitepeople = async () => {
   
    // if(content.trim() == ""){
    //   alert("Please input some content to be posted")
    // }else if(images.length == 0){
    //   alert("Select any image to be updated")
    // }else 
    if(content.trim() !== "" || images.length !== 0){
        var bodyFormData = new FormData();
        bodyFormData.append('post_text', content);
        bodyFormData.append('location', "Delhi");
        bodyFormData.append('device_id', Deviceid);
        bodyFormData.append('group_ids', GroupId.join());
        GroupId.map(items=>{
          return items.id
        })
        GroupId.join()
        {
          images.map((item) => {
            bodyFormData.append('media', item);
          })
        }
        console.log(images, "images")
        console.log(bodyFormData, "bodyform data")
        axios({
          method: "post",
          url: "http://54.214.196.237:3000/post/create",
          data: bodyFormData,
          headers: {
            Authorization: `${props.token}`,
            "Content-Type": "multipart/form-data"
          },
        })
          .then(function (response) {
            //handle success
            console.log(response?.data?.data?.message
              , "post direct method work");
            if (response?.data?.data?.message == 'success') {
              navigation.push(Screens.Tabs)
              setOneclick(false)
            }
          })
          .catch(function (response) {
            //handle error
            console.log(response?.response?.status 

              , "postdirect method is not working");
              setOneclick(false)
              
          });
      }else{
        alert("Please write post or select image")
        setOneclick(false)
      }
  }


  const getGroupList = async () => {
    const data = {
      query: {},
      token: props?.token,
    }
    const resp = await dispatch(getGroupListApi(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData?.data?.result)
    setGroupsList(rawData?.data?.result)
    setfilteredGroupsList(rawData?.data?.result)
  }

  const deviceid = () => {
    DeviceInfo.getAndroidId().then((androidId) => {
      // androidId here
      setdeviceid(androidId)
      console.log(androidId, "android id")
    });
  }

  const [filePath, setFilePath] = useState({});
  const [images, setimages] = useState([])

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const SingleCheckboxView = ({ item }) => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
      GroupId.forEach((x) => {
        if (x.id == item.id) {
          setChecked(true)
        }
      })
    }, [GroupId])

    return (
      <TouchableOpacity
        onPress={() => {
          if (checked) {
            setGroupId(GroupId.filter((x) => { return x.id != item.id }))
          } else {
            setGroupId([...GroupId, item])
          }
        }}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 15, height: height / 25 }}
      >
        {/* <View style={{}}> */}
        {/* <TouchableOpacity style={{ flexDirection: 'row' }}> */}
        <Text style={styles.lstTxt}>{item.name}</Text>
        <View style={{ borderColor: 'black', borderWidth: 1, width: '7%', height: '80%' , borderRadius:5 }}>
        {checked ? <IconAntDesign name="check" size={30} color="#900" /> : null }
        </View>
        {/* </TouchableOpacity> */}
        {/* </View> */}
      </TouchableOpacity>
    )
  }

  const GrpSingleItem = ({ item }) => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
      GroupId.forEach((x) => {
        if (x.id == item.id) {
          setChecked(true)
        }
      })
    }, [GroupId])

    return (
      <TouchableOpacity
        onPress={() => {
          if (checked) {
            setGroupId(GroupId.filter((x) => { return x.id != item.id }))
          } else {
            setGroupId([...GroupId, item])
          }
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.txtCon}>
            <Text style={checked ? styles.activelstTxt : styles.lstTxt}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const [singleFile, setSingleFile] = useState('');

  const selectOneFile = async () => {
    // setimages([])
    //Opening Document Picker for selection of one file
    // try {
    //   const res = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.allFiles],
    //     allowMultiSelection: true,
    //     //There can me more options as well
    //     // DocumentPicker.types.allFiles
    //     // DocumentPicker.types.images
    //     // DocumentPicker.types.plainText
    //     // DocumentPicker.types.audio
    //     // DocumentPicker.types.pdf
    //   });
    //   //Printing the log realted to the file
    //   console.log('res : ' + JSON.stringify(res));
    //   console.log('URI : ' + res.uri);
    //   console.log('Type : ' + res.type);
    //   console.log('File Name : ' + res.name);
    //   console.log('File Size : ' + res.size);
    //   //Setting the state to show single file attributes
    //   setSingleFile(res);
    //   images.push(res)
    // } catch (err) {
    //   //Handling any exception (If any)
    //   if (DocumentPicker.isCancel(err)) {
    //     //If user canceled the document selection
    //     alert('Canceled from single doc picker');
    //   } else {
    //     //For Unknown Error
    //     alert('Unknown Error: ' + JSON.stringify(err));
    //     throw err;
    //   }
    // }
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        images.push(res)
      }
      //Setting the state to show multiple file attributes
      // this.setState({ multipleFile: results });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  const done = () => {
    setModalVisible(!modalVisible)
    {
      GroupId.map((item) => {
        groupid.push(item.id)
      })
    }
  }

  const searchFromLocal = (text) => {
    let res = groupsList.filter(el => new RegExp(text, "ig").test(el.name)).sort((a, b) => {
      let re = new RegExp("^" + text, "i")
      return re.test(a.name) ? re.test(b.name) ? a.name.localeCompare(b.name) : -1 : 1
    })
    return res
  }

  useEffect(() => {
    const data ={
      token: props?.token,
    }
    getuserDetailprofile(data)
    // getSearchTimeline()
    // get_post_reply()

  }, [])

  const getuserDetailprofile = async (data) => {
    const resp = await dispatch(get_profile_details(data))
    const respRaw = await unwrapResult(resp)
    setName(`${respRaw?.data?.result?.first_name} ${respRaw?.data?.result?.last_name}`)
    console.log(respRaw?.data?.result,"kkkkllll")
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeCon}>

        <View style={styles.hederTxt}>
          <TouchableOpacity style={styles.backCon}>
            {/* <Text style={styles.arrTxt}>←</Text> */}
            <AntDesign name="left" size={35} color="black" />
          </TouchableOpacity>
          <View style={styles.backCons}>
            <EvilIcons name="user" size={35} color="black" />
          </View>
          <View style={styles.headCon}>
            <Text style={styles.bookTxt}>{name}</Text>
            <Text style={styles.bookTxt}>Write Post</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput placeholder='Name' multiline={true} onChangeText={(txt) => {
            setcontent(txt)
          }} />
        </View>
        <View>
          <KeyboardAwareScrollView extraScrollHeight={10} enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'>
            <ScrollView nestedScrollEnabled={true}>
              <View style={styles.downCon}>
                {/* <ScrollView> */}
                <ScrollView nestedScrollEnabled={true}>
                  <View style={{ width: '70%', flexDirection: 'row' }}>
                    {groupsList?.map((item) => {
                      return (
                        <GrpSingleItem item={item} />
                      )
                    })}
                  </View>
                </ScrollView>
                {/* </ScrollView> */}
                <TouchableOpacity style={styles.serchCon} onPress={() => setModalVisible(true)}>
                  <Feather name="search" size={25} color="black" />
                  {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                </TouchableOpacity>
              </View>
              <View style={styles.downContainer}>
                <View style={styles.imgCons}>
                  <TouchableOpacity style={styles.imgCon} onPress={() => captureImage('video')} >
                    {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                    <Feather name="camera" size={35} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imgCon} onPress={() =>
                  {
                  // if(images.length > 0){
                  //   setimages([])
                    selectOneFile()
                  // }else {
                  //   selectOneFile()
                  // }
                }
                    // chooseFile('photo')
                  }>
                    {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                    <Entypo name="images" size={35} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                disabled={oneclick}
                onPress={() => {
                  Invitepeople()
                }}
                style={styles.btnContainer} 
                >
                  <Text style={styles.btnTxt}>Next</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible)
                    setGroupId([])
                    setgroupid([])
                  }
                  }>
                    <AntDesign name="close" size={25} color="red" />
                  </TouchableOpacity>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      done()
                    }}
                  >
                    <Text style={styles.textStyle}>   Done   </Text>
                  </Pressable>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <TextInput style={{ borderColor: 'black', borderWidth: 0.5, padding: 5 }} placeholder='Search group' onChangeText={(txt) => {
                    setfilteredGroupsList(searchFromLocal(txt))
                  }} />
                </View>
                <ScrollView nestedScrollEnabled={true}>
                  <View style={{ width: '100%' }}>
                    {filteredGroupsList?.map((item) => {
                      return (
                        <SingleCheckboxView item={item} />
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  )
}

// export default Newpage

const mapStateToProps = (state) => ({
  token: state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Newpage)

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#FFFFFF',

  },
  hederTxt: {
    height: height / 16,
    width: width / 1,
    backgroundColor: '#C5C5C5',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrTxt: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold'

  },
  backCon: {
    height: height / 18,
    width: width / 8,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backCons: {
    height: height / 20,
    width: width / 9,
    // backgroundColor: 'red',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  bookTxt: {
    fontSize: 17,
    color: '#000',
  },

  safeCon: {
    height: height / 1.2,
    justifyContent: 'space-between',
  },
  imgStyle: {
    height: 35,
    width: 35
  },
  headCon: {
    height: height / 20,
    width: width / 1.4,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  downCon: {
    height: height / 15,
    width: width / 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#C5C5C5',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  txtCon: {
    height: height / 20,
    width: width / 7.1,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',

  },
  lstTxt: {
    color: '#000',
    fontWeight: '500',
    fontSize: 12
  },
  activelstTxt: {
    color: 'lightgray',
    fontWeight: '500',
    fontSize: 12
  },
  serchCon: {
    height: height / 20,
    width: width / 8,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  serchStyle: {
    height: 35,
    width: 35,
  },
  downContainer: {
    height: height / 10,
    width: width / 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: '#C5C5C5',
    paddingHorizontal: 10,
    padding: 8
  },
  imgCon: {
    height: height / 16,
    width: width / 7,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  imgCons: {
    height: height / 19,
    width: width / 2.5,
    // backgroundColor: 'blue',
    flexDirection: 'row',

  },
  btnContainer: {
    height: height / 20,
    width: width / 2.5,
    // backgroundColor: '#FFA500',
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600'
  },
  keyBd: {

  },

  // modal

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "100%",
    height: "100%",
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: '#FF4500',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})