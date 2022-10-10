import React, { useEffect, useState } from 'react'
import {
  Dimensions, StyleSheet, Text, View, KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createpostslice } from '../../Slices/CreateUserSlice'
import { connect, useDispatch } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo'
// import VideoRecorder from 'react-native-beautiful-video-recorder';
import ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('screen')
const Newpage = () => {

  const [Deviceid, setdeviceid] = useState()
  const [content, setcontent] = useState("")

  const dispatch = useDispatch()

  const Invitepeople = async () => {
    const data = {
      token: props?.token,
      query: {
        post_text: content,
        location: "Delhi",
        device_id: Deviceid,
        group_id: "1"
      },
      body: {}
    }
    const resp = await dispatch(createpostslice(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData, "create response data")

    // setData(rawData?.data?.result ?? [])
    // console.log(rawData?.data?.result,"MMMM")
  }

  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
      }
    });
  };



  useEffect(() => {
    deviceid()
  }, [])

  const deviceid = () => {
    DeviceInfo.getAndroidId().then((androidId) => {
      // androidId here
      setdeviceid(androidId)
      console.log(androidId, "android id")
    });
  }


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
        <TextInput placeholder='Name' onChangeText={(txt) => {
          setcontent(txt)
        }} />
        <View>
          <KeyboardAwareScrollView extraScrollHeight={10} enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'>
            <ScrollView>
              <View style={styles.downCon}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.txtCon}>
                    <Text style={styles.lstTxt}>junglecats</Text>
                  </View>
                  <View style={styles.txtCon}>
                    <Text style={styles.lstTxt}>streetcats</Text>
                  </View>
                  <View style={styles.txtCon}>
                    <Text style={styles.lstTxt}>desire</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.serchCon}>
                  {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                </TouchableOpacity>
              </View>
              <View style={styles.downContainer}>
                <View style={styles.imgCons}>
                  <TouchableOpacity style={styles.imgCon} >
                    {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                    <Feather name="camera" size={35} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imgCon} onPress={() => { chooseFile() }}>
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
    height: height / 1.1,
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
    width: width / 5.1,
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
    backgroundColor: '#FFA500',
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