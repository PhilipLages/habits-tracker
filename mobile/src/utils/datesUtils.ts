import { generateRangeDatesFromYearStart } from "./generate-range-between-dates";

export const datesFromYearBeginning = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 18 * 5;
export const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearBeginning.length;