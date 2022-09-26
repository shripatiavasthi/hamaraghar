// import React from 'react'
// import { connect } from 'react-redux'
// import {View , Text , TouchableOpacity} from 'react-native'

// export const Post = (props) => {
//   return (
//     <View>
//         <Text>Post</Text>
//         <TouchableOpacity>
//             <Text>Camera</Text>
//         </TouchableOpacity>
//     </View>
//   )
// }

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(Post)


import React from 'react'
import {
  Dimensions, StyleSheet, Text, View, KeyboardAvoidingView,
  Image,
  Platform
} from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'


const { height, width } = Dimensions.get('screen')
const Newpage = () => {
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
        <TextInput placeholder='Name' />
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
                  <View style={styles.imgCon}>
                    {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                  </View>
                  <View style={styles.imgCon}>
                    {/* <Image style={styles.serchStyle} resizeMode='contain' source={require('../../Mashu/Images/Icon/search.png')} /> */}
                  </View>
                </View>
                <TouchableOpacity style={styles.btnContainer}>
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

export default Newpage

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
    padding:8
  },
  imgCon: {
    height: height / 16,
    width: width / 7,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  imgCons: {
    height: height / 16,
    width: width / 2.5,
    // backgroundColor: 'blue',
    flexDirection: 'row',

  },
  btnContainer: {
    height: height / 25,
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