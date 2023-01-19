import { TouchableOpacityProps } from "react-native";

export default interface CheckboxProps extends TouchableOpacityProps{
  checked?: boolean;
  title: string
};