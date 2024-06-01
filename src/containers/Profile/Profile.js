import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export const Profile = props => {
  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={()=>{
         props.navigation.goBack()
        }}>
          <Image
            source={require('../../staticdata/images/backarrow.png')}
            style={{height: 30, width: 30, borderRadius: 50}}
          />
        </TouchableOpacity>
        <Text
          style={[
            {fontSize: 26, color: '#0A1629', fontWeight: '600', marginLeft: 10},
          ]}>
          Profile
        </Text>
      </View>
      <View style={styles.maincontainer}>
        {/* <View style={styles.profileview}>
          <Image
            source={require('../../staticdata/images/Avatar5.jpeg')}
            style={{height: 30, width: 30, borderRadius: 50}}
          />
          <View style={{marginLeft:20}}>
            <Text>Name</Text>
            <Text>Email</Text>
          </View>
        </View> */}
        <TouchableOpacity
          style={[
            styles.SIgnInButton,
          ]}
          onPress={() => {
            props.navigation.navigate("ChangePassword")
          }}
         >
          <Text style={{fontSize: 16, color: 'green', fontWeight: '600'}}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.SIgnInButton,
          ]}
          onPress={()=>{
            props.navigation.replace("Login")
          }}
         >
          <Text style={{fontSize: 16, color: 'green', fontWeight: '600'}}>
         logout
          </Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headercontainer: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  maincontainer: {
    flex: 1,
    padding: 10,
  },
  profileview: {
    height: 60,
    width: '100%',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom:15,
    padding:10
  },
  SIgnInButton: {
    height: 53,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
   
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor:"lightblue",
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
