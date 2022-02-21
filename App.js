import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { firebase } from '@react-native-firebase/database';

export default function App() {
  const [state, setState] = useState('Cargando...');
  const firebaseApp = useRef(null);

  useEffect(() => {
    if (!firebase?.apps?.length) {
      firebase.initializeApp(credentials).then(chatApp => {
        setState('App inicializada!');
      })
    } else {
      setState('App previamente cargada')
    }
    
    firebaseApp.current = firebase
      .database()
      .ref('')
      .limitToFirst(25)
      .once('value', snapshot => {
        console.log('Data: ', snapshot.val());
      });
    
    return () => firebaseApp.current?.database().ref('').off('value', firebaseApp.current);
  }, [])

    return (
      <View>
        <Text>{state}</Text>
      </View>
    );

}
