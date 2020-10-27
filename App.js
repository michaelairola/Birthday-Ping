import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from "react-redux";
import { store } from "./db";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import { CONTACTS_ROUTE, GIFTS_ROUTE, SETTINGS_ROUTE, CONTACT_ROUTE, GIFT_ROUTE } from "./routes.js";
import ContactsPage from "./pages/contacts.jsx";
import { ContactPage } from "./pages/contact.jsx";
import { GiftsPage } from "./pages/gifts.jsx";
import { GiftPage } from "./pages/gift.jsx";
import { SettingsPage } from "./pages/settings.jsx";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route: { name } }) => ({
        tabBarIcon: (props) => {
          const { color, size } = props
          const icon = MainPageIcons[name];
          return <Ionicons name={typeof icon == "function" ? icon(props) : icon} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      {Object.keys(MainRoutes).map(key => (
        <Tab.Screen key={key} name={key} component={MainRoutes[key]} />
        ))}
    </Tab.Navigator>
  );
}
// TODO February 29th lolol!
export default function App() {
  return (
    <Provider store={store}><NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" 
          component={MainTabs} 
          options={({ route, navigation }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route) ?? 'Home',
            headerLeftContainerStyle: { marginLeft: 15 },
            headerLeft: props => (
              <Ionicons
                {...props}
                style={{ fontSize: 30 }}
                onPress={() => navigation.navigate('Settings')}
                name="ios-settings"
              />
            )
            })} 
        />
        {Object.keys(RegRoutes).map(key => (
          <Stack.Screen key={key} name={key} component={RegRoutes[key]} />
        ))}
      </Stack.Navigator>
      <StatusBar style="default" />
    </NavigationContainer></Provider>
  );
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
  [SETTINGS_ROUTE]: SettingsPage,
  [CONTACT_ROUTE]: ContactPage,
  [GIFT_ROUTE]: GiftPage,
}