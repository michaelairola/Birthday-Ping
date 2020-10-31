import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from "react-redux";
import { store, connectToStore } from "./db";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppState } from "react-native";

import { CONTACTS_ROUTE, GIFTS_ROUTE, SETTINGS_ROUTE, SYNC_ROUTE, SELECT_ROUTE, CONTACT_ROUTE, GIFT_ROUTE } from "./routes.js";

import ContactsPage from "./pages/contacts.jsx";
import { ContactPage } from "./pages/contact.jsx";
import { GiftsPage } from "./pages/gifts.jsx";
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
          />
        ))}
      </Stack.Navigator>
      <StatusBar style="default" />
    </NavigationContainer>
)) 

// TODO February 29th lolol!
export default class App extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    switch(nextAppState) {
      case "inactive":
        console.log('app has closed TODO: save app data into persistant storage.')
        break;
      case "active":
        console.log("app has been opened. load things");        
        syncInBackground()
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