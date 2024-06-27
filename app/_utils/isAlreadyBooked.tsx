"use client";
import { isWithinInterval } from "date-fns";

export function isAlreadyBooked(
  range: { from: Date; to: Date },
  datesArr: Date[]
) {
  return datesArr.some((date: Date) =>
    isWithinInterval(date, { start: range.from, end: range.to })
  );
}
