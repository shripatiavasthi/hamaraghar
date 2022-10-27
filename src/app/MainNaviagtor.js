import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from '../app/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Login from '../containers/LoginScreen'
import AddEmailorPhon from '../containers/AddEmailorPhone/AddEmailorPhone'
import VerifyEmailorPhone from '../containers/VerifyEmailorPhone/VerifyEmailorPhone'
import CreateUser from '../containers/CreateUser/CreateUser'
import SignUp from '../containers/SignUp/SignUp'
import Home from '../containers/Home/Home'
import { navigate, Screens } from '../helpers/Screens'
import Gender from '../containers/Gender/Gender'
import Birthday from '../containers/Birthday/Birthday'
import AddName from '../containers/AddName/AddName'
import Avatar from '../containers/Avatar/Avatar'
import Sucess from '../containers/Sucess/Sucess'
import Belongone from '../containers/BELONG/Belongone'
import BelongThree from '../containers/BELONG/BelongThree'
import BelongDetails from '../containers/BELONG/BelongDetail'
import CreateBelong from '../containers/CreateBelong/CreateBelong'
import InvitePeople from '../containers/InvitePeople/Invitepeople'
import SubCategories from '../containers/BELONG/SubCategories'
import InviteSucess from '../containers/InviteSucess/InviteSucess'
import Conversation from '../containers/Conversation/Conversation'
import ConversationGroups from '../containers/Groupbelong/Groupbelong'
import SingleGroup from '../containers/SingleGroup/SingleGroup'
import Post from '../containers/Post/Post'
import Real from '../containers/Reals/Real'
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../containers/LoginScreen/loginSlice';
import { navigationRef } from '../helpers/Screens'

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = createBottomTabNavigator();


const Tabs = props => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        showIcon: true,
        tabBarShowLabel: true,
        // tabBarActiveTintColor: PrimarySettings.primaryColor,
        // tabBarInactiveTintColor: PrimarySettings.grayColors._700,
        style: {
          borderRadius: 5,
          height: 50,
        },
      }}
    >
      <BottomTabs.Screen
        name={Screens.Home}
        component={Home}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? (
                  <View>
                    <Octicons name="home" size={28} color="black" />
                  </View>
                ) : (
                  <View>
                    <Octicons name="home" size={28} color="black" />
                  </View>
                )}
              </View>
            ),
            tabBarLabel: '',
            headerShown: false,
          };
        }}
      />

      <BottomTabs.Screen
        name={Screens.Post}
        component={Post}
        listeners={{
          tabPress: e => {
            navigate(Screens.ALLPACKAGE, {
              search: '',
              from: 'notmainpage',
              best: false,
            });
          },
        }}
        options={({ navigation }) => {
          return {

            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? (
                  <View>
                    <AntDesign name="pluscircleo" size={28} color="black" />
                  </View>
                ) : (
                  <View>
                    <AntDesign name="pluscircleo" size={28} color="black" />
                  </View>
                )}
              </View>
            ),
            tabBarLabel: '',
            headerShown: false,
          };
        }}
      />

      <BottomTabs.Screen
        name={Screens.ConversationGroups}
        component={ConversationGroups}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? (
                  <View>
                    <Feather name="message-square" size={28} color="black" />
                  </View>
                ) : (
                  <View>
                    <Feather name="message-square" size={28} color="black" />
                  </View>
                )}
              </View>
            ),
            tabBarLabel: '',
            headerShown: false,
          };
        }}
      />
    </BottomTabs.Navigator>
  );
};


export const MainNaviagtor = (props) => {

  const [token, settoken] = useState(null)
  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        return value
      }
    } catch (e) {
      // error reading value
      return e
    }
  }

  useEffect(() => {
    getTokenData().then((resp) => {
      settoken(resp)
      setToken(resp)
    })
  }, [])

  return (
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer
        ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={token ? Screens.Gender : Screens.Tabs}
        >
          <Stack.Screen name={Screens.Gender} component={Gender} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Avatar} component={Avatar} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Post} component={Post} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.InvitePeople} component={InvitePeople} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Login} component={Login} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.SignUp} component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.CreateBelong} component={CreateBelong} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.BelongThree} component={BelongThree} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Home} component={Home} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Birthday} component={Birthday} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.BelongDetails} component={BelongDetails} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Real} component={Real} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Belongone} component={Belongone} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.SingleGroup} component={SingleGroup} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.ConversationGroups} component={ConversationGroups} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Conversation} component={Conversation} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Tabs} component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.AddEmailorPhon} component={AddEmailorPhon} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.InviteSucess} component={InviteSucess} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.SubCategories} component={SubCategories} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.AddName} component={AddName} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.VerifyOtp} component={VerifyEmailorPhone} options={{ headerShown: false }} />
          <Stack.Screen name="CreateUser" component={CreateUser} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Sucess} component={Sucess} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  )
}



const mapStateToProps = (state) => ({
  token: state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainNaviagtor)