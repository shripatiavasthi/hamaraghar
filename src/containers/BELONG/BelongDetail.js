// import React, { useState } from 'react'
// import { connect } from 'react-redux'
// import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
// import styles from '../../css/Maincss'
// import belongstyles from '../../css/Belong'

// const image = { image: require("../../staticdata/images/BackgroundImage.png") }

// export const BelongDetails = (props) => {

//     return (
//         <SafeAreaView>
//             <View style={belongstyles.container}>
//                 <View style={styles.FirstView}>
//                     <View style={styles.PageView}>
//                         <View style={belongstyles.Headingdiv}>
//                             <View style={belongstyles.headingcontainer}>
//                                 <Text style={belongstyles.headingtext}>Belong</Text>
//                             </View>
//                             <View style={belongstyles.headingcontainer}>
//                                 <Text >Select from existing communities or</Text>
//                                 <Text >create your own</Text>
//                             </View>
//                         </View>
//                         <View style={belongstyles.DetailContainer}>
//                             <ScrollView>
//                                 <View style={belongstyles.CradHeading}>
//                                     <Text>Pregnant women in HSR </Text>
//                                     <Text>Layout</Text>
//                                 </View>
//                                 <View style={belongstyles.descreption}>
//                                     <Text>description</Text>
//                                 </View>
//                                 <View style={belongstyles.subpoints}>
//                                     <Text>1000+ Members</Text>
//                                     <TouchableOpacity>
//                                         <Text>Ask to Join</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View style={belongstyles.subpoints}>
//                                     <Text>Private Group</Text>
//                                 </View>
//                                 <View style={belongstyles.subpoints}>
//                                     <Text>Verified experts in the group</Text>
//                                 </View>
//                                 <View style={belongstyles.subpoints}>
//                                     <Text>Discussion in the group</Text>
//                                 </View>
//                                 <View style={belongstyles.qna}>
//                                     <Text>Discussion in the group</Text>
//                                 </View>
//                                 <View style={belongstyles.qna}>
//                                     <Text>Discussion in the group</Text>
//                                 </View>
//                             </ScrollView>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(BelongDetails)



import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
const { height, width } = Dimensions.get('screen')

const BelongDetails = () => {
  return (
    <View style={styles.mainContiner}>
      <SafeAreaView style={styles.safeCon}>
        <View style={styles.headCon}>
          <TouchableOpacity style={styles.backCon}>
            <Text style={styles.arrTxt}>←</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={styles.belongCon}>
          <Text style={styles.blgTxt}>Belong</Text>
        </View>
        <View style={styles.ownCon}>
          <Text style={styles.ownTxt}>Select form existing communications or</Text>
          <Text style={styles.ownTxt}>create your own.</Text>
        </View>
        <View style={styles.hsrCon}>
          <Text style={styles.hsrTxt}>Pregnent women in HSR</Text>
          <View style={styles.imgCon}>
            {/* <Image style={styles.imgstyle} source={require('../../Mashu/Images/Icon/green.png')} /> */}
          </View>
          <View style={styles.imgContainer}>
            {/* <Image style={styles.imgstyle} source={require('../../Mashu/Images/Icon/green.png')} /> */}
          </View>
        </View>
        <View style={styles.hsrCons}>
          <Text style={styles.hsrTxt}>Layout</Text>
          <View style={styles.dateCon}>
            <Text style={styles.ownTxt}>created on 21/02/2022 by</Text>
          </View>
          <View style={styles.lopCon}>
            <Text style={styles.lopTxt}>lopamudra</Text>
          </View>
        </View>
        <View style={styles.txtCon}>
          <Text style={styles.detailTxt}>Lorem Ipsum booking sent to the Admin user for the approval. Once Approved, Booking details will be shared with you. Booking ID: 330984</Text>
        </View>
        <View style={styles.hsrCon}>
          <View style={styles.memCon}>
            <Text style={styles.hsrTxt}>1000+ Members</Text>
          </View>
          <TouchableOpacity style={styles.askCon}>
            <Text style={styles.askTst}>Ask to Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hsrCon}>
          <Text style={styles.hsrTxt}>Private Group</Text>
        </View>
        <View style={styles.hsrCon}>
          <Text style={styles.hsrTxt}>Verified expert in the group</Text>
        </View>
        <View style={styles.hsrCon}>
          <Text style={styles.hsrTxt}>Discussion in the group</Text>
        </View>
        <View style={styles.msgCon}>
          <View style={styles.msgCons}>
            <Text style={styles.msgTxt}>Lorem Ipsum booking sent to the Admin user for the approval. Once Approved, Booking details will be shared with you. Booking ID: 330984</Text>
            <Text style={{fontSize: 18}}>✉</Text>
          </View>
        </View>
        <View style={styles.msgCon}>
          <View style={styles.msgCons}>
            <Text style={styles.msgTxt}>Lorem Ipsum booking sent to the Admin user for the approval. Once Approved, Booking details will be shared with you. Booking ID: 330984</Text>
            <Text style={{fontSize: 18}}>✉</Text>
          </View>
        </View>
        <View style={styles.msgCon}>
          <View style={styles.msgCons}>
            <Text style={styles.msgTxt}>Lorem Ipsum booking sent to the Admin user for the approval. Once Approved, Booking details will be shared with you. Booking ID: 330984</Text>
            <Text style={{fontSize: 18}}>✉</Text>
          </View>
        </View>
        <View style={styles.msgCon}>
          <View style={styles.msgCons}>
            <Text style={styles.msgTxt}>Lorem Ipsum booking sent to the Admin user for the approval. Once Approved, Booking details will be shared with you. Booking ID: 330984</Text>
            <Text style={{fontSize: 18}}>✉</Text>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default BelongDetails

const styles = StyleSheet.create({
  mainContiner: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'rgba(234,230,229,255)'
  },
  headCon: {
    height: height / 20,
    width: width / 1,
    // backgroundColor: 'cyan'
  },
  safeCon:{
    paddingBottom :30,
  },
  arrTxt: {
    fontSize: 25,
    color: '#000',
  },
  backCon: {
    height: height / 20,
    width: width / 1.1,
    // backgroundColor: 'blue',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  belongCon: {
    height: height / 18,
    width: width / 1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    // justifyContent: 'center'
  },
  blgTxt: {
    color: '#000',
    fontSize: height / 25,
    fontWeight: '400'
  },
  ownCon: {
    height: height / 20,
    width: width / 1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    // justifyContent: 'center'
  },
  ownTxt: {
    color: '#000000',
    fontSize: 12,
    color: '#000000'
  },
  hsrCon: {
    height: height / 22,
    width: width / 1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  hsrTxt: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000000'
  },
  imgCon: {
    height: height / 30,
    width: width / 10,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  imgstyle: {
    height: 12,
    width: 12
  },
  imgContainer: {
    height: height / 30,
    width: width / 14,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hsrCons: {
    height: height / 20,
    width: width / 1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    // justifyContent: 'flex-end'
    flexDirection: 'row'
  },
  dateCon: {
    height: height / 30,
    width: width / 2.3,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lopCon: {
    height: height / 30,
    width: width / 4.5,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  lopTxt: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500'
  },
  txtCon: {
    // height: height / 5,
    width: width / 1.1,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    paddingBottom: 10
  },
  detailTxt: {
    fontSize: height / 60,
    color: '#000000',
    fontWeight: '500',
    width: width / 1.5,
    lineHeight: 22
  },
  memCon: {
    height: height / 30,
    width: width / 2,
    // backgroundColor: 'pink',
    justifyContent: 'center'
  },
  askCon: {
    height: height / 30,
    width: width / 4,
    backgroundColor: 'rgba(62,195,142,255)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  askTst: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  msgCon: {
    marginTop: 10,

    // height: height / 10,
    width: width / 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  msgCons: {
    paddingTop: 10,
    paddingBottom: 10,
    // height: height / 8,
    width: width / 1.1,
    // backgroundColor: 'blue',
  },
  msgTxt: {
    fontSize: height / 60,
    color: '#000000',
    fontWeight: '500',
    width: width / 1.5,

  }
})