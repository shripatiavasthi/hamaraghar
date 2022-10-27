import React, { useEffect, useState } from 'react'
import {
  Dimensions, StyleSheet, Text, View, KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  PermissionsAndroid
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

const { height, width } = Dimensions.get('screen')
const Newpage = (props) => {

  const { navigation } = props

  const [Deviceid, setdeviceid] = useState()
  const [content, setcontent] = useState("")
  const [groupsList, setGroupsList] = useState([])
  const [GroupId, setgroupId] = useState([])

  const dispatch = useDispatch()

  const Invitepeople = async () => {
    // const data = {
    //   token: props?.token,
    //   query: {
    //     post_text: content,
    //     location: "location",
    //     device_id: Deviceid,
    //     group_id: GroupId
    //   },
    //   body: {}
    // }
    // const resp = await dispatch(createpostslice(data))
    // const rawData = await unwrapResult(resp)
    // console.log(rawData?.data?.message, "create post response data")
    // if (rawData?.data?.message === 'success') {
    //   alert(rawData?.data?.result)
    //   navigation.push(Screens.Tabs)
    // }

    // setData(rawData?.data?.result ?? [])
    // console.log(rawData?.data?.result,"MMMM")

    var bodyFormData = new FormData();
    bodyFormData.append('post_text', content);
    bodyFormData.append('location', "Delhi");
    bodyFormData.append('device_id', Deviceid);
    // bodyFormData.append('group_id', GroupId);
    {GroupId.map((item)=>{
      bodyFormData.append('group_id', item);
    })
    }
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
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response, "postdirect method is not working");
      });

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
  }

  useEffect(() => {
    deviceid()
    getGroupList()
  }, [])

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

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
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
      images.push(response.uri)
    });
  };

  const [singleFile, setSingleFile] = useState('');

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
      images.push(res)
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };



  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeCon}>

        <View style={styles.hederTxt}>
          <TouchableOpacity style={styles.backCon}>
            <Text style={styles.arrTxt}>←</Text>
          </TouchableOpacity>
          <View style={styles.backCons}>
            <Text style={{ fontSize: 30 }}>😍</Text>
            {/* <Image style={styles.imgStyle} source={require('../../Image/Profile.png')} /> */}
          </View>
          <View style={styles.headCon}>
            <Text style={styles.bookTxt}>lopamudra</Text>
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
                        <TouchableOpacity
                          onPress={() => {
                            // setgroupId(item.id)
                            GroupId.push(item.id)
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.txtCon}>
                              <Text style={styles.lstTxt}>{item?.name}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>)
                    })}
                  </View>
                </ScrollView>
                {/* </ScrollView> */}
                <TouchableOpacity style={styles.serchCon}>
                  <Feather name="search" size={35} color="black" />
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
                    selectOneFile()
                    // chooseFile('photo')
                  }>
                    {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                    <Entypo name="images" size={35} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                  Invitepeople()
                }} style={styles.btnContainer} >
                  <Text style={styles.btnTxt}>Next</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
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
    height: height / 28,
    width: width / 3,
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

  }

})