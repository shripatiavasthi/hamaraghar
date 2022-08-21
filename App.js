import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Signup from './src/containers/LoginScreen'

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={({ navigation }) => {
        return {
          tabBarIcon: ({ focused }) => (
            <View>
              {/* {focused ? (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/bluehome.png')}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/blackhome.png')}
                  />
                </View>
              )} */}
            </View>
          ),
          tabBarLabel: 'Home',
          // headerShown: false,
        };
      }} />
      {/* <Tab.Screen name="Search" component={Search} options={({ navigation }) => {
        return {
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/blueaearch.png')}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/blacksearch.png')}
                  />
                </View>
              )}
            </View>
          ),
          tabBarLabel: 'Search',
          // headerShown: false,
        };
      }} />
      <Tab.Screen name="Profile" component={Profile} options={({ navigation }) => {
        return {
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/blueprofile.png')}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/blackprofile.jpeg')}
                  />
                </View>
              )}
            </View>
          ),
          tabBarLabel: 'Profile',
          // headerShown: false,
        };
      }} />
      <Tab.Screen name="Loan" component={LoanTab} options={({ navigation }) => {
        return {
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/blue.png')}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    style={styles.img}
                    source={require('./src/Staticdata/picture/black.png')}
                  />
                </View>
              )}
            </View>
          ),
          tabBarLabel: 'Loan',
          // headerShown: false,
        };
      }} /> */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 20
  }
})

export default App;