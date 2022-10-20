import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Share, } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { get_curated_timeline, get_post_replies, post_comment_reply } from '../../Slices/TimelineSlice';
import { navigate, Screens } from '../../helpers/Screens';
import { unwrapResult } from '@reduxjs/toolkit';
import { externalshareslice } from '../../Slices/ExternalshareSlice';
import { bookmarksave } from '../../Slices/BookmarkSaveSlice';
import { bookmarkdelete } from '../../Slices/DeleteBookmarkSlice';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

const { height, width } = Dimensions.get('screen')

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

export const Home = (props) => {

  const { navigation } = props

  const dispatch = useDispatch()

  const [DATA, setDATA] = useState()
  const [inviteemail , setinviteemail] = useState()
  const [bookmarksaved , setbookmarksaved] = useState(false)
  const [commentReply, setCommentReply] = useState('')
  const [save, setsave] = useState(false)

  const getCuratedTimeline = async () => {
    const data = {
      token: props?.token,
    }
    const resp = await dispatch(get_curated_timeline(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData?.data?.result, "kkkkk")
    setDATA(rawData?.data?.result)
  }

  const get_post_reply = async () => {
    const data = {
      query: {
        post_id: 27
      },
      token: props?.token,
    }
    const resp = await dispatch(get_post_replies(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData, "kkkkk")

  }


  useEffect(() => {

    getCuratedTimeline()
    get_post_reply()

  }, [])

  const image = { image: require("../../staticdata/images/logo.jpeg") }

  const bookmark = async (post_id, group_id) => {
    const data = {
      token: props?.token,
      query: {},
      body: {
        post_id: post_id,
        group_id: group_id,
      }
    }
    const resp = await dispatch(bookmarksave(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData, "share bookmark response")
  }

  const deletebookmark = async (post_id, group_id) => {
    const data = {
      token: props?.token,
      query: {
        post_id: post_id,
        group_id: group_id,
      },
      body: {}
    }
    const resp = await dispatch(bookmarkdelete(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData, "share bookmark response")
  }

  const sharepost = async (post_id, group_id) => {
    console.log(post_id, group_id, "post and group")
    const data = {
      token: props?.token,
      query: {},
      body: {
        post_id: post_id,
        group_id: group_id,
      }
    }
    const resp = await dispatch(externalshareslice(data))
    const rawData = await unwrapResult(resp)
    console.log(rawData?.data, "share post response")
    if(rawData?.data?.message == "success"){
      onShare(rawData?.data?.result)
    }
  }

  const onShare = async (link) => {
    try {
      const result = await Share.share({
        message:
          `${link}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

  console.log(DATA, "all timelines")


  const Item = ({ title }) =>
  (
    <View style={styles.Post}>
      <View>
        {/* <Image
          style={styles.postimage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        /> */}
        <SwiperFlatList
          // autoplay
          // autoplayDelay={2}
          // autoplayLoop
          // index={2}
          showPagination
          data={title?.post_media}
          renderItem={({ item }) => (
            <View style={[styles.postimage, { backgroundColor: item }]}>
              {item.media_type == "image" ?
                <Image
                  style={styles.postimage}
                  source={{
                    uri: `${item.url}`,
                  }}
                />
                :
                // <Video source={{ uri: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4` }}   // Can be a URL or a local file.
                // ref={(ref) => {
                //   this.player = ref
                // }}                                      // Store reference
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                // onError={this.videoError}               // Callback when video cannot be loaded
                //  style={styles.backgroundVideo}
                //  />
                <VideoPlayer
                  video={{ uri: 
                    // `${item.url}`
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                   }}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                />
              }
            </View>
          )}
        />
      </View>
      <View style={styles.PostContent}>
        <View style={styles.content}>
          <View style={styles.Userdetails}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <EvilIcons name="user" size={25} color="black" />
              <View>
                <Text style={{ color: "black", fontSize: 12, fontWeight: '600' }}>{title?.user_alias}</Text>
                <Text style={{ color: "black", fontSize: 10, fontWeight: '400' }}>/junglecats </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Share}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: width / 4 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push(Screens.Conversation, { id: title?.post_id })
                }}
              >
                <FontAwesome name="comment" size={25} color="black" />
              </TouchableOpacity>
              {bookmarksaved ? 
                <TouchableOpacity onPress={() => {
                  deletebookmark(title?.post_id, title?.group_id)
                }}>
                  <FontAwesome name="bookmark" size={25} color="black" />
                </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => {
                bookmark(title?.post_id, title?.group_id)
              }}>
                <FontAwesome name="bookmark-o" size={25} color="black" />
              </TouchableOpacity>
             }
              <TouchableOpacity onPress={() => {
                sharepost(title?.post_id, title?.group_id)
              }}>
                <Feather name="send" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ color: "black", fontSize: 12, fontWeight: '600' }}>100+ Comments</Text>
            </View>
          </View>
          <View style={styles.Description}>
            <Text style={{ color: "black", fontSize: 13, fontWeight: '600' }}>{title?.post_text}</Text>
          </View>
          <View style={styles.noofdays}>
            <Text style={{ fontSize: 10 }}>1 day ago</Text>
          </View>
          <View style={styles.CommentSection}>
            <View style={styles.ComenterDetails}>
              <EvilIcons name="user" size={25} color="black" />
              <Text style={{ color: "black", fontSize: 12 }}>Kali_bili</Text>
            </View>
            <ScrollView>
              <View style={styles.CommentInput}>
                <KeyboardAvoidingView behavior='position'>
                  <TextInput
                    value={commentReply}
                    onChangeText={(value) => {
                      setCommentReply(value)
                    }}
                    placeholder='Add your comment here'></TextInput>
                 
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={async () => {
                    const data = {
                      body : {
                        post_id: title?.post_id,
                        reply_text: commentReply,
                        group_id: title?.group_id,
                        replying_to_user_id : title?.user_id
                      },
                      query : {},
                      token : props?.token
                    }
                    const resp = await dispatch(post_comment_reply(data))
                    const rawData = await unwrapResult(resp)
                    console.log(rawData,"kkkll")
                  }}>
                    <Feather name="send" size={25} color="black" />
                  </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (

    <Item title={item} />

  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.Header}>
          <View style={styles.profileimage}>
            <Image
              style={styles.tinyLogo}
              source={image.image}
            />
          </View>
          <View style={styles.brandlogo}>
            <EvilIcons name="search" size={35} color="black" />
            <TouchableOpacity onPress={() => {
              navigation.push(Screens.Login)
            }}>
              <EvilIcons name="user" size={35} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Posts} >
          <FlatList
            contentContainerStyle={{ paddingBottom: 190 }}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height / 1,
    backgroundColor: 'white',
  },
  Header: {
    height: height / 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  brandlogo: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tinyLogo: {
    padding: 10,
    height: 20,
    width: 100,
  },
  Posts: {
    maxHeight: '100%',
    // paddingBottom: height / 6,
    // backgroundColor: 'pink',
  },
  Post: {
    marginBottom: 10,
    height: height / 1.5,
    width: width / 1,
    // backgroundColor: 'white'
  },
  postimage: {
    height: height / 3,
    width: width,
  },
  PostContent: {
    height: height / 3,
    padding: 10,
    // backgroundColor: 'yellow',
    borderColor: 'black',
    // borderWidth: 1,
  },
  Userdetails: {
    height: height / 18,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Share: {
    height: height / 18,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: 5,
    // backgroundColor: 'lightblue',
    borderColor: 'black',
    // borderWidth: 1,
  },
  Description: {
    height: height / 10,
    backgroundColor: 'white',
  },
  noofdays: {
    height: height / 34,
    // backgroundColor: 'gray',
    justifyContent: 'center',
  },
  CommentSection: {
    height: height / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ComenterDetails: {
    height: height / 22,
    borderColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 4
  },
  CommentInput: {
    height: height / 22,
    borderColor: 'black',
    // borderWidth: 1,
    width: width / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

const mapStateToProps = (state) => ({
  token: state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)