import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { store, connectToStore, saveData, loadData, receiveData } from "./db";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppState } from "react-native";

import { CONTACTS_ROUTE, GIFTS_ROUTE, SETTINGS_ROUTE, SYNC_ROUTE, SELECT_ROUTE, CONTACT_ROUTE, GIFT_ROUTE } from "./routes.js";

import ContactsPage from "./pages/contacts.jsx";
import GiftsPage from "./pages/gifts.jsx";
import ContactPage from "./pages/contact.jsx";
import { GiftPage } from "./pages/gift.jsx";
import SettingsPage from "./pages/settings.jsx";
import SyncPage from "./pages/sync.jsx";
import SelectPage from "./pages/select.jsx";

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import { syncInBackground } from "./vendor-permissions";

const MainTabs = connectToStore(({ settings: { DarkMode } }) => (
    <Tab.Navigator
      screenOptions={({ route: { name } }) => ({
        tabBarIcon: (props) => {
          const { color, size } = props
          const icon = MainPageIcons[name];
          return <Ionicons name={typeof icon == "function" ? icon(props) : icon} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: DarkMode ? "#212121" : "white",
        inactiveBackgroundColor: DarkMode ? "#212121" : "white",
        activeTintColor: DarkMode ? "#B00020" : 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      {Object.keys(MainRoutes).map(key => (
        <Tab.Screen key={key} name={key} component={MainRoutes[key]} />
        ))}
    </Tab.Navigator>
  )
)
const AppNavigator = connectToStore(({ settings: { DarkMode } }) => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerStyle: { 
              backgroundColor: DarkMode ? "#212121" : "white", 
            },
            headerTintColor: DarkMode ? '#fff' : "#121212",          
        }}
      >
        <Stack.Screen name="Home" 
          component={MainTabs} 
          options={({ route, navigation }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route) ?? 'Home',
            headerLeftContainerStyle: { marginLeft: 15 },
            headerLeft: props => (
              <Ionicons
                style={{ fontSize: 30 }}
                color={DarkMode ? "white" : "black"}
                onPress={() => navigation.navigate('Settings')}
                name="ios-settings"
              />
            )
            })} 
        />
        {Object.keys(RegRoutes).map(key => (
          <Stack.Screen 
            key={key} name={key} 
            component={RegRoutes[key]}
            options={({ route: { params } }) => ({ title: key == CONTACT_ROUTE ? params["contact"].name : key })}
          />
        ))}
      </Stack.Navigator>
      <StatusBar style="default" />
    </NavigationContainer>
)) 

// TODO February 29th lolol!
export default class App extends React.Component {
  constructor(props) {
    super(props);
    loadData().then(_ => syncInBackground())
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    switch(nextAppState) {
      case "inactive":
        // TODO make sure this is the best solution;
        saveData();
        break;
      case "active":
        // TODO make sure this is the best solution;
        loadData().then(_ => syncInBackground());
        break;
      default:
        console.log("app state:", nextAppState);
    } 
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

const MainPageIcons = {
  [CONTACTS_ROUTE]: 'ios-contacts',
  [GIFTS_ROUTE]: 'ios-gift',
}
const MainRoutes = {
  [CONTACTS_ROUTE]: ContactsPage,
  [GIFTS_ROUTE]: GiftsPage,
}
const RegRoutes = {
  [SELECT_ROUTE]: SelectPage,
  [SETTINGS_ROUTE]: SettingsPage,
  [SYNC_ROUTE]: SyncPage,
  [CONTACT_ROUTE]: ContactPage,
  [GIFT_ROUTE]: GiftPage,
}