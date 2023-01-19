import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

export function BackButton() {
  return (
    <TouchableOpacity>
      <Feather
        name='arrow-left'
        size={32}
        color={colors.zinc[400]}         
      />
    </TouchableOpacity>
  )
}
