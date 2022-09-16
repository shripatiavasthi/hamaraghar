// import React, { useEffect } from 'react';
// import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AppLevelSpinner from './AppLevelSpinner';
// import { navigationRef, Screens, navigate, resetScreen } from '../helpers/Screens';
// import { StatusBar, Easing } from 'react-native';
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import LoginScreen from '../containers/loginScreen/LoginScreen';
// import FirebaseActions from './FirebaseActions';
// import { connect } from 'react-redux';
// import linking from '../linking'
// import NetInfo from "@react-native-community/netinfo";


// const Stack = createStackNavigator();

// // const BottomTabs = createBottomTabNavigator();


// // const Tabs = props => {
// //   return (
// //     <BottomTabs.Navigator
// //       screenOptions={{
// //         showIcon: true,
// //         tabBarShowLabel: true,
// //         tabBarActiveTintColor: PrimarySettings.primaryColor,
// //         tabBarInactiveTintColor: PrimarySettings.grayColors._700,
// //         style: {
// //           borderRadius: 5,
// //           height: 50,
// //         },
// //       }}
// //     >
// //       <BottomTabs.Screen
// //         name={Screens.MAINSCREEN}
// //         component={MainScreen}
// //         options={({ navigation }) => {
// //           return {
// //             tabBarIcon: ({ focused }) => (
// //               <View>
// //                 {focused ? (
// //                   <View>
// //                     <BlueHome />
// //                   </View>
// //                 ) : (
// //                   <View>
// //                     <GrayHome />
// //                   </View>
// //                 )}
// //               </View>
// //             ),
// //             tabBarLabel: 'Home',
// //             headerShown: false,
// //           };
// //         }}
// //       />

// //       <BottomTabs.Screen
// //         name={Screens.ALLPACKAGE}
// //         component={Allpackage}
// //         listeners={{
// //           tabPress: e => {
// //             navigate(Screens.ALLPACKAGE, {
// //               search: '',
// //               from: 'notmainpage',
// //               best: false,
// //             });
// //           },
// //         }}
// //         options={({ navigation }) => {
// //           return {
// //             tabBarIcon: ({ focused }) => (
// //               <View>
// //                 {focused ? (
// //                   <View>
// //                     <BlueHeart />
// //                   </View>
// //                 ) : (
// //                   <View>
// //                     <GrayHeart />
// //                   </View>
// //                 )}
// //               </View>
// //             ),
// //             tabBarLabel: 'All Packages',
// //             headerShown: false,
// //           };
// //         }}
// //       />

// //       <BottomTabs.Screen
// //         name={Screens.PROFILESCREEN}
// //         component={ProfileScreen}
// //         options={({ navigation }) => {
// //           return {
// //             tabBarIcon: ({ focused }) => (
// //               <View>
// //                 {focused ? (
// //                   <View>
// //                     <BlueUser />
// //                   </View>
// //                 ) : (
// //                   <View>
// //                     <GreyUser />
// //                   </View>
// //                 )}
// //               </View>
// //             ),
// //             tabBarLabel: 'My Profile',
// //             headerShown: false,
// //           };
// //         }}
// //       />
// //     </BottomTabs.Navigator>
// //   );
// // };


// const timingConfig = {
//     animation: 'timing',
//     config: {
//         duration: 200,
//         easing: Easing.linear,
//     },
// };

// const Customoptions = {
//     headerMode: 'none',
//     headerShown: false,
//     gestureEnabled: true,
//     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//     transitionSpec: {
//         open: timingConfig,
//         close: timingConfig,
//     },
// };

// const RedCliffeStack = ({ token }) => (
//     <Stack.Navigator
//         screenOptions={{
//             gestureEnabled: false,
//             headerBackTitleVisible: false,
//         }}
//         initialRouteName={Screens.LOGIN_SCREEN}
//     >
//         <Stack.Screen
//             name={Screens.LOGIN_SCREEN}
//             component={LoginScreen}
//             options={{ headerMode: 'none', headerShown: false }}
//         />
//     </Stack.Navigator>
// );

// const RedcliffeNavigator = props => {
//     var InternetConnected = false
//     const unsubscribe = NetInfo.addEventListener(state => {
//         console.log("Connection type", state.type);
//         console.log("Is connected?", state.isConnected);
//     });


//     unsubscribe();
//     return (
//         <>
//             <StatusBar
//                 backgroundColor="#FFFFFF"
//                 barStyle="dark-content"
//                 translucent={true}
//             />
//             <NavigationContainer
//                 linking={linking}
//                 onStateChange={() =>
//                     FirebaseActions.trackScreenView(
//                         navigationRef.current.getCurrentRoute().name,
//                     )
//                 }
//                 ref={navigationRef}>
//                 <RedCliffeStack token={props.token} />
//             </NavigationContainer>
//             <AppLevelSpinner />
//         </>
//     );
// };

// const mapStateToProps = (state, ownProps) => ({

// });

// export default connect(mapStateToProps)(RedcliffeNavigator);


import React from 'react'
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
import { Screens } from '../helpers/Screens'
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
            // tabBarIcon: ({ focused }) => (
            // <View>
            //   {focused ? (
            //     <View>
            //       <BlueHome />
            //     </View>
            //   ) : (
            //     <View>
            //       <GrayHome />
            //     </View>
            //   )}
            // </View>
            // ),
            // tabBarLabel: 'Home',
            headerShown: false,
          };
        }}
      />

      {/* <BottomTabs.Screen
        name={Screens.Home}
        component={Home}
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
            // tabBarIcon: ({ focused }) => (
              // <View>
              //   {focused ? (
              //     <View>
              //       <BlueHeart />
              //     </View>
              //   ) : (
              //     <View>
              //       <GrayHeart />
              //     </View>
              //   )}
              // </View>
            // ),
            tabBarLabel: 'All Packages',
            headerShown: false,
          };
        }}
      /> */}

      {/* <BottomTabs.Screen
        name={Screens.Home}
        component={Home}
        options={({ navigation }) => {
          return {
            // tabBarIcon: ({ focused }) => (
            //   <View>
            //     {focused ? (
            //       <View>
            //         <BlueUser />
            //       </View>
            //     ) : (
            //       <View>
            //         <GreyUser />
            //       </View>
            //     )}
            //   </View>
            // ),
            tabBarLabel: 'My Profile',
            headerShown: false,
          };
        }}
      /> */}
    </BottomTabs.Navigator>
  );
};


export const MainNaviagtor = (props) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name={Screens.Login} component={Login} options={{ headerShown: false }} />


        <Stack.Screen name={Screens.SingleGroup} component={SingleGroup} options={{ headerShown: false }} />


          <Stack.Screen name={Screens.ConversationGroups} component={ConversationGroups} options={{ headerShown: false }} />


          <Stack.Screen name={Screens.Conversation} component={Conversation} options={{ headerShown: false }} />


          <Stack.Screen name={Screens.SignUp} component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Tabs} component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.InviteSucess} component={InviteSucess} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.InvitePeople} component={InvitePeople} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.CreateBelong} component={CreateBelong} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Home} component={Home} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Belongone} component={Belongone} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.SubCategories} component={SubCategories} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Gender} component={Gender} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.AddName} component={AddName} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.VerifyOtp} component={VerifyEmailorPhone} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.AddEmailorPhon} component={AddEmailorPhon} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.BelongDetails} component={BelongDetails} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.BelongThree} component={BelongThree} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Avatar} component={Avatar} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Birthday} component={Birthday} options={{ headerShown: false }} />
          <Stack.Screen name="CreateUser" component={CreateUser} options={{ headerShown: false }} />
          <Stack.Screen name={Screens.Sucess} component={Sucess} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainNaviagtor)