// React
import React, { useEffect } from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Firebase
import { firebase } from '@react-native-firebase/database';

// Screens
import Home from './screens/Home';

// Miscellaneous
import { generateCredentials } from './helpers/utils';
import { BASE_URL }  from '@env';

/*
  TODO:
    - Add basic screens
    - Add minimal chat interaction
    - Add styles
    - Refactor firebase initialization
    - Add loading / splash screen?
*/

const credentials = generateCredentials()

/* Message example:
  {
    text: string,
    date: new Date().toJSON(),
    sender: uuid
  }
*/

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    let firebaseApp;
    const refURL = `${BASE_URL}/test`

    if (!firebase?.apps?.length) {
      firebase.initializeApp(credentials).then(chatApp => {
        firebaseApp = chatApp
          .database()
          .ref(refURL)
          .limitToFirst(25)
          .once('value', snapshot => {
            console.log('Data: ', snapshot.val());
          });
      })
    } else {
      firebaseApp = firebase
        .database()
        .ref(refURL)
        .limitToFirst(25)
        .once('value', snapshot => {
          console.log('Data: ', snapshot.val());
        });
    }
    
    return () => firebaseApp?.database()?.ref(refURL)?.off('value', firebaseApp);
  }, [])

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    );

}
