import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'

export function EmptyHabits() {
  const { navigate } = useNavigation()
  
  return (
    <Text
      className='text-zinc-400 text-base'
    >
      Você ainda não está monitorando seus hábitos. { ' ' }
      <Text
        className='text-violet-400 text-base underline active:text-violet-500'
        onPress={() => navigate('new')}
      >
        Comece cadastrando um.
      </Text>
    </Text>
  )
}
