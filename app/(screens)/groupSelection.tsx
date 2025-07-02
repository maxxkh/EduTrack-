import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const groupSelection = () => {
    const navigation = useNavigation<any>();
  return (
    <View>
      <Text>groupSelection</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('(screens)/Dashboard')}>
        <Text>Go to Login</Text>
        </TouchableOpacity>
    </View>
  )
}

export default groupSelection

const styles = StyleSheet.create({})