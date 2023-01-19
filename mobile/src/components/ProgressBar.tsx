import { View } from 'react-native'
import ProgressBarProps from './interfaces/progressBarProps'

export function ProgressBar({ progress = 0 }:  ProgressBarProps) {
  return (
    <View className='2-full h-3 rounded-xl bg-zinc-700 mt-4'>
      <View 
        className='h-3 rounded-xl bg-violet-600'
        style={{width: `${progress}%`}}
      />
    </View>
  )
}
