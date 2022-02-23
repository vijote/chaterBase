// React
import React from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Firebase
import { firebase } from '@react-native-firebase/database';

// Screens
import Home from './screens/Home';
import Chat from './screens/Chat';

// Miscellaneous
import { generateCredentials } from './helpers/utils';

/*
  TODO:
    - Add minimal chat functionality (30%)
    - Add minimal home list with chats
    - Refactor DB schema
    - Add styles
    - Refactor firebase initialization
    - Add loading / splash screen?
    - Add firebase login?
    - Dark theme
*/

const credentials = generateCredentials();

const Stack = createNativeStackNavigator();

export default function App() {
  if (!firebase?.apps?.length) firebase.initializeApp(credentials)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Chat' component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}
