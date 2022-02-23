// React
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'

// Firebase
import database from '@react-native-firebase/database';

// Miscellaneous
import { BASE_URL } from '@env'

const Item = ({ text }) => (
    <View>
      <Text>{text}</Text>
    </View>
  );

export default function Chat({ route }) {
    // Props destructuring
    const { senderId, receiverId } = route.params;
    
    // State declarations
    const [messages, setMessages] = useState([]);
    
    const renderItem = ({ item }) => {
        return (
        <Item text={item.text} />
    )};
    
    // useEffects declarations
    useEffect(() => {
        const refUrl = `${BASE_URL}/${senderId}/${receiverId}`;
        // Setup listener for new messages
        const onChildAdd = database()
            .ref(refUrl)
            .on('child_added', snapshot => {
                snapshot = JSON.parse(JSON.stringify(snapshot));
                if(!messages.some(item => item.id === snapshot.id))
                    setMessages([...messages, snapshot]);
            });
    
        // Stop listening for updates when no longer required
        return () => database().ref(refUrl).off('child_added', onChildAdd);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TextInput placeholder='Type something'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edeff8'
    }
})