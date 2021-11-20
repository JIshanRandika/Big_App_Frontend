import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import type {Node} from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';


import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';
import { Icon } from 'react-native-elements';
import { StepBackwardOutlined } from '@ant-design/icons';

import CreatOrderView from './views/creatOrder.view'
import TrackOrderView from './views/trackOrder.view'
import HomeView from './views/home.view'


const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
function MyNavigation() {
  return (

      // <Tab.Navigator initialRouteName="Home">
      <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                      iconName = focused
                          ? 'rowing'
                          : 'rowing';
                  } else if (route.name === 'Order Creator') {
                      iconName = focused ? 'rowing' : 'rowing';

                  } else if (route.name === 'Order Tracker') {
                      iconName = focused ? 'rowing' : 'rowing';
                  }
// ==========color
                  if (route.name === 'Home') {
                      color = focused
                          ? '#2892D7'
                          : 'gray';
                  } else if (route.name === 'Order Creator') {
                      color = focused ? '#2892D7' : 'gray';

                  } else if (route.name === 'Order Tracker') {
                      color = focused ? '#2892D7' : 'gray';
                  }

                  // You can return any component that you like here!
                  return <Icon name={iconName} color={color}/>;
              },
              tabBarActiveTintColor: '#2892D7',
              tabBarInactiveTintColor: 'gray',
          })}
      >
          <Tab.Screen name="Order Tracker" component={TrackOrderView} />
          <Tab.Screen name="Home" component={HomeView} />
          <Tab.Screen name="Order Creator" component={CreatOrderView} />

      </Tab.Navigator>
      // <Drawer.Navigator>
      //
      //
      //     <Drawer.Screen name="Home" component={HomeView} />
      //     <Drawer.Screen name="Order Creator" component={CreatOrderView} />
      //     <Drawer.Screen name="Order Tracker" component={TrackOrderView} />
      //   {/*<Drawer.Screen name="Article" component={Article} />*/}
      // </Drawer.Navigator>
  );
}


export default function App() {
  return (
      <NavigationContainer>
        <MyNavigation/>
      </NavigationContainer>
  );
}


