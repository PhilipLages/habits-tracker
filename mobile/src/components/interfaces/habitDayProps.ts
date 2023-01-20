import { TouchableOpacityProps } from "react-native";

export default interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
};