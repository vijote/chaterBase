import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '@react-native-firebase/database';
import { generateCredentials } from './src/helpers/utils';
import { BASE_URL }  from '@env';

const credentials = generateCredentials()

/* Message example:
  {
    text: string,
    date: new Date().toJSON(),
    sender: uuid
  }
*/

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    let firebaseApp;
    const refURL = `${BASE_URL}/test`

    if (!firebase?.apps?.length) {
      firebase.initializeApp(credentials).then(chatApp => {
        setAppLoaded(true);
      })
    } else {
      setAppLoaded(true)
    }
    
    firebaseApp = firebase
      .database()
      .ref(refURL)
      .limitToFirst(25)
      .once('value', snapshot => {
        console.log('Data: ', snapshot.val());
      });
    
    return () => firebaseApp?.database()?.ref(refURL)?.off('value', firebaseApp);
  }, [])

    return (
      <View>
        <Text>{appLoaded ? 'Cargado 👍' : 'Cargando ⌛'}</Text>
      </View>
    );

}
