import React from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen')

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export const Home = (props) => {

  const { navigation } = props

  const image = { image: require("../../staticdata/images/logo.jpeg") }

  const Item = ({ title }) => (
    <View style={styles.Post}>
      <View>
        <Image
          style={styles.postimage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
      <View style={styles.PostContent}>
        <View style={styles.content}>
          <View style={styles.Userdetails}>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name="user" size={45} color="black" />
              <View>
                <Text>User NAme</Text>
                <Text>/lajycat</Text>
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
              <TouchableOpacity>
                <FontAwesome name="comment" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="bookmark" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="send" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <Text>100+ Comments</Text>
            </View>
          </View>
          <View style={styles.Description}>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
          </View>
          <View style={styles.noofdays}>
            <Text>1 day ago</Text>
          </View>
          <View style={styles.CommentSection}>
            <View style={styles.ComenterDetails}>
              <EvilIcons name="user" size={45} color="black" />
              <Text>Kali_bili</Text>
            </View>
            <ScrollView>
            <View style={styles.CommentInput}>
              <KeyboardAvoidingView behavior='position'>
                <TextInput placeholder='Add your comment here'></TextInput>
              </KeyboardAvoidingView>
            </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    
    <Item title={item.title} />

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
            <EvilIcons name="user" size={35} color="black" />
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
    padding : 5,
    // backgroundColor: 'lightblue',
    borderColor: 'black',
    // borderWidth: 1,
  },
  Description: {
    height: height / 9,
    backgroundColor: 'white',
  },
  noofdays: {
    height: height / 30,
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
    width: width / 2.5
  },
  CommentInput: {
    height: height / 22,
    borderColor: 'black',
    // borderWidth: 1,
    width: width / 1.9,
    flexDirection: 'row',
    alignItems: 'center',
  }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)