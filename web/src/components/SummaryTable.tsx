import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { amountOfDaysToFill, summaryDates } from "../utils/datesUtils";
import { weekDaysFirstLetter } from "../utils/weekDays";
import { HabitDay } from "./HabitDay";
import { SummaryTypes } from "./interfaces/SummaryTypes";

export function SummaryTable() {
  const [summary, setSummary] = useState<SummaryTypes>([]);

  useEffect(() => {
    api.get('summary').then(({ data }) => {
      setSummary(data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDaysFirstLetter.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 && summaryDates.map((date) => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day');
          });

          return (
            <HabitDay 
              key={date.toString()} 
              date={ date }
              amount={ dayInSummary?.amount } 
              defaultCompleted={dayInSummary?.completed} 
            />
          )
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
          <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />          
        ))}
      </div>
    </div>
  );
}
