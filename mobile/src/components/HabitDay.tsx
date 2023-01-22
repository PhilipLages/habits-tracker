import { TouchableOpacity, Dimensions } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";

import HabitDayProps from "./interfaces/habitDayProps";
import { generateProgressPercentage } from "../lib/generate-progress-percentage";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5);

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: HabitDayProps) {
  const completedPercentage = amountOfHabits > 0 
    ? generateProgressPercentage(amountOfHabits, amountCompleted) 
    : 0;

    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity 
      className={ clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800'] : completedPercentage === 0,
        ['bg-violet-900 border-violet-700'] : completedPercentage > 0 && completedPercentage < 20,
        ['bg-violet-800 border-violet-600'] : completedPercentage >= 20 && completedPercentage < 40,
        ['bg-violet-700 border-violet-500'] : completedPercentage >= 40 && completedPercentage < 60,
        ['bg-violet-600 border-violet-500'] : completedPercentage >= 60 && completedPercentage < 80,
        ['bg-violet-500 border-violet-400'] : completedPercentage >= 80,
        ['border-white border-4']: isCurrentDay
      }) }
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      { ...rest }
    />
  )
}
