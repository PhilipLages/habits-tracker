import { generateDatesFromYearBeginning } from "./generate-dates";

export const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
export const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;