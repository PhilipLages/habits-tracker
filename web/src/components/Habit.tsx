import HabitProps from "./interfaces/HabitProps";

export default function Habit({ completed }: HabitProps) {
  return (
    <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 flex items-center justify-center">
      {completed}
    </div>
  )
}
