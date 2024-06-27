"use client";
import { differenceInBusinessDays, isDate, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import settingsProps from "../_interfaces/settings";
import { cabinProps } from "../_interfaces/Cabin";
import { useCallback, useEffect, useState } from "react";
import { useContextReservation } from "../context/ReservationContext";
import toast from "react-hot-toast";
import { isAlreadyBooked } from "../_utils/isAlreadyBooked";

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: settingsProps;
  bookedDates: Date[];
  cabin: cabinProps;
}) {
  const { regularPrice, discount } = cabin;
  const { range, setRange } = useContextReservation();
  const [numNights, setNumNights] = useState(0);
  const [cabinPrice, setCabinPrice] = useState(0);
  const [isSelect, setIsSelect] = useState(false);

  const resetRange = useCallback(() => {
    setNumNights(0);
    setCabinPrice(0);
    setRange({
      from: undefined,
      to: undefined,
    });
    setIsSelect(false);
  }, [setRange]);

  useEffect(() => {
    if (isDate(range.from) && isDate(range.to)) {
      if (isAlreadyBooked({ from: range.from, to: range.to }, bookedDates)) {
        return resetRange();
      }
      const newRange = differenceInBusinessDays(range.to, range.from);
      setNumNights(newRange);
      setCabinPrice(newRange * (regularPrice - discount));
      setIsSelect(true);
    }
  }, [range, regularPrice, bookedDates, resetRange, discount]);

  // SETTINGS
  const minBookingLength = settings.minBookingLength;
  const maxBookingLength = settings.maxBookingLength;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(range) => {
          if (!isSelect) {
            setRange(
              isDate(range?.from) &&
                isDate(range?.to) &&
                isAlreadyBooked({ from: range.from, to: range.to }, bookedDates)
                ? { from: undefined, to: undefined }
                : { from: range?.from, to: range?.to }
            );
          }
        }}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-4 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-4">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
