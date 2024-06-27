"use client";
import { differenceInBusinessDays, isDate, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import settingsProps from "../_interfaces/settings";
import { cabinProps } from "../_interfaces/Cabin";
import { useCallback, useEffect, useState } from "react";
import { useContextReservation } from "../context/ReservationContext";
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
  const [isWidthSM, setISWidthSM] = useState(window.innerWidth < 768);

  useEffect(() => {
    function resizeWindow() {
      setISWidthSM(window.innerWidth < 768);
    }
    window.addEventListener("resize", resizeWindow);

    return () => window.removeEventListener("resize", resizeWindow);
  }, [window.innerWidth]);

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

  const minBookingLength = settings.minBookingLength;
  const maxBookingLength = settings.maxBookingLength;

  return (
    <div className="flex flex-col justify-between md:mb-0 mb-10 md:border-none border border-primary-800">
      <DayPicker
        className="pt-12 place-self-center pb-6"
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
        captionLayout="dropdown-buttons"
        numberOfMonths={isWidthSM ? 1 : 2}
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
                <span className="md:text-2xl text-xs">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xs md:text-2xl">${regularPrice}</span>
            )}
            <span className="text-xs">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 md:text-2xl text-xs">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="md:text-lg text-xs font-bold uppercase">
                  Total
                </span>{" "}
                <span className="md:text-2xl text-lg font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="md:block hidden border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
      {range.from || range.to ? (
        <button
          className="md:hidden block py-4 px-4 text-sm font-semibold w-full bg-accent-800"
          onClick={() => resetRange()}
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}

export default DateSelector;
