import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLevelSpinner from './AppLevelSpinner';
import { navigationRef, Screens, navigate, resetScreen } from '../helpers/Screens';
import { StatusBar, Easing } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from '../containers/loginScreen/LoginScreen';
import FirebaseActions from './FirebaseActions';
import { connect } from 'react-redux';
import linking from '../linking'
import NetInfo from "@react-native-community/netinfo";


const Stack = createStackNavigator();

// const BottomTabs = createBottomTabNavigator();


// const Tabs = props => {
//   return (
//     <BottomTabs.Navigator
//       screenOptions={{
//         showIcon: true,
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: PrimarySettings.primaryColor,
//         tabBarInactiveTintColor: PrimarySettings.grayColors._700,
//         style: {
//           borderRadius: 5,
//           height: 50,
//         },
//       }}
//     >
//       <BottomTabs.Screen
//         name={Screens.MAINSCREEN}
//         component={MainScreen}
//         options={({ navigation }) => {
//           return {
//             tabBarIcon: ({ focused }) => (
//               <View>
//                 {focused ? (
//                   <View>
//                     <BlueHome />
//                   </View>
//                 ) : (
//                   <View>
//                     <GrayHome />
//                   </View>
//                 )}
//               </View>
//             ),
//             tabBarLabel: 'Home',
//             headerShown: false,
//           };
//         }}
//       />

//       <BottomTabs.Screen
//         name={Screens.ALLPACKAGE}
//         component={Allpackage}
//         listeners={{
//           tabPress: e => {
//             navigate(Screens.ALLPACKAGE, {
//               search: '',
//               from: 'notmainpage',
//               best: false,
//             });
//           },
//         }}
//         options={({ navigation }) => {
//           return {
//             tabBarIcon: ({ focused }) => (
//               <View>
//                 {focused ? (
//                   <View>
//                     <BlueHeart />
//                   </View>
//                 ) : (
//                   <View>
//                     <GrayHeart />
//                   </View>
//                 )}
//               </View>
//             ),
//             tabBarLabel: 'All Packages',
//             headerShown: false,
//           };
//         }}
//       />

//       <BottomTabs.Screen
//         name={Screens.PROFILESCREEN}
//         component={ProfileScreen}
//         options={({ navigation }) => {
//           return {
//             tabBarIcon: ({ focused }) => (
//               <View>
//                 {focused ? (
//                   <View>
//                     <BlueUser />
//                   </View>
//                 ) : (
//                   <View>
//                     <GreyUser />
//                   </View>
//                 )}
//               </View>
//             ),
//             tabBarLabel: 'My Profile',
//             headerShown: false,
//           };
//         }}
//       />
//     </BottomTabs.Navigator>
//   );
// };


const timingConfig = {
    animation: 'timing',
    config: {
        duration: 200,
        easing: Easing.linear,
    },
};

const Customoptions = {
    headerMode: 'none',
    headerShown: false,
    gestureEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: timingConfig,
        close: timingConfig,
    },
};

const RedCliffeStack = ({ token }) => (
    <Stack.Navigator
        screenOptions={{
            gestureEnabled: false,
            headerBackTitleVisible: false,
        }}
        initialRouteName={Screens.LOGIN_SCREEN}
    >
        <Stack.Screen
            name={Screens.LOGIN_SCREEN}
            component={LoginScreen}
            options={{ headerMode: 'none', headerShown: false }}
        />
    </Stack.Navigator>
);

const RedcliffeNavigator = props => {
    var InternetConnected = false
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
    });


    unsubscribe();
    return (
        <>
            <StatusBar
                backgroundColor="#FFFFFF"
                barStyle="dark-content"
                translucent={true}
            />
            <NavigationContainer
                linking={linking}
                onStateChange={() =>
                    FirebaseActions.trackScreenView(
                        navigationRef.current.getCurrentRoute().name,
                    )
                }
                ref={navigationRef}>
                <RedCliffeStack token={props.token} />
            </NavigationContainer>
            <AppLevelSpinner />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    token: state?.user?.userData?.token,
});

export default connect(mapStateToProps)(RedcliffeNavigator);
