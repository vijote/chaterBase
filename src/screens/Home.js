import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Chat screen"
        onPress={() => navigation.navigate('Chat', {
          senderId: '787af0ca-1e72-48b4-80f4-8641036700b1',
          receiverId: 'b2382e92-d33c-459b-a965-4ccee075e160'
        })}
      />
    </View>
  )
}