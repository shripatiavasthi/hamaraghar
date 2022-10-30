import React, { useEffect, useState } from 'react'
import { connect,useDispatch } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { get_post_replies } from '../../Slices/TimelineSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const { height, width } = Dimensions.get('screen')

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//   },
// ];



const Item = ({ title }) => (

  <View style={styles.item}>
    <View style={styles.commentbox}>
      <View>
        <EvilIcons name="user" size={25} color="black" />
      </View>
      <View style={styles.commenttextbox}>
        <Text style={styles.title}>{title?.reply_text}</Text>
      </View>
      <View>
      </View>
    </View>
    <View style={styles.replysection}>
      <View style={styles.options}>
        <Text style={styles.optiontxt}>1 day Ago </Text>
        <TouchableOpacity><Text style={styles.optiontxt}>Reply</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.optiontxt}>Comments</Text></TouchableOpacity>
      </View>
      <View style={styles.more}>
        <Feather name="more-horizontal" size={15} color="black" />
      </View>
    </View>
  </View>
);

export const Conversation = (props) => {

  const [DATA , setDATA ] = useState()

  const dispatch = useDispatch()

  const get_post_reply = async (id) => {
    const data = {
      query: {
        post_id: id
      },
      token: props?.token,
    }
    const resp = await dispatch(get_post_replies(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData?.data?.result  , "here")
    if(rawData?.data?.result){
      setDATA(rawData?.data?.result)
    }
  }

  useEffect(() => {
    get_post_reply(props?.route?.params?.id)
  }, [])

  const renderItem = ({ item }) => (
    <Item title={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <View style={styles.profileimage}>
          <AntDesign name="left" size={35} color="black" />
        </View>
        <View style={styles.profileimage}>
          <Text style={styles.headertext}>Conversation</Text>
          <Text style={styles.subheadertext}>You, lopamudra, 50 others</Text>
        </View>
        <View style={styles.brandlogo}>
          <EvilIcons name="search" size={35} color="black" />
        </View>
      </View>
      <View style={styles.conversationbox}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  Header: {
    height: height / 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  profileimage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600'
  },
  subheadertext: {
    color: 'black',
    fontSize: 10,
    // fontWeight: '400'
  },
  conversationbox: {
    flex: 1,
    marginTop: 2,
    backgroundColor: 'white'
  },
  item: {
    height: height / 7,
    // backgroundColor: 'pink',
    marginBottom: 10,
    padding: 5,
  },
  commentbox: {
    borderColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    height: height / 9,
    // backgroundColor: 'green',
    justifyContent: 'space-between',
  },
  commenttextbox: {
    width: width / 1.2,
    height: height / 10,
    // backgroundColor : 'blue',
  },
  title: {
    fontSize: 12,
    color: 'black',
  },
  replysection: {
    height: height / 35,
    width: width / 1.2,
    marginLeft: width * 0.1,

    // backgroundColor : 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    width: width / 2.7,
    flexDirection: 'row',
    borderColor: 'black',
    // borderWidth : 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    // borderWidth : 1,
  },
  optiontxt: {
    fontSize: 10,
  }
})

const mapStateToProps = (state) => ({
  token: state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)