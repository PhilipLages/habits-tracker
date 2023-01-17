import HabitProps from "./interfaces/HabitProps";

export default function Habit({ completed }: HabitProps) {
  return (
    <div>{completed}</div>
  )
}
