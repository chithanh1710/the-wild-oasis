"use client";
import { Session } from "next-auth";
import { cabinProps } from "../_interfaces/Cabin";
import { useContextReservation } from "../context/ReservationContext";
import Image from "next/image";
import Link from "next/link";
import { createReservationAction } from "../_libs/actions";
import toast from "react-hot-toast";
import { ButtonReserveNow } from "./ButtonReserveNow";

function ReservationForm({
  cabin,
  sessions,
}: {
  sessions: Session | null;
  cabin: cabinProps;
}) {
  const { range } = useContextReservation();
  const { maxCapacity } = cabin;

  if (!sessions?.user)
    return (
      <div className="flex justify-center items-center w-full bg-primary-800 py-10">
        <p className="text-2xl w-80 text-center">
          <span>Please</span>{" "}
          <Link href="/login" className="text-accent-400 underline">
            login
          </Link>{" "}
          <span>to reserver this cabin right now</span>
        </p>
      </div>
    );

  return (
    <div className="scale-[1.01]">
      {sessions.user.image && sessions.user.name && (
        <div className="bg-primary-800 text-primary-300 md:px-16 px-4 py-4 flex justify-between items-center">
          <p>Logged in as</p>
          <div className="flex gap-4 items-center">
            <Image
              width={32}
              height={32}
              referrerPolicy="no-referrer"
              className="rounded-full"
              src={sessions.user.image}
              alt={sessions.user.name}
            />
            <p>{sessions.user.name}</p>
          </div>
        </div>
      )}

      {range.from && range.to && (
        <p className="text-accent-400 bg-primary-900 text-xl text-center pt-4">
          {range.from?.toDateString()} to {range.to?.toDateString()}
        </p>
      )}
      <form
        action={(formData) => {
          if (range.from && range.to)
            createReservationAction(formData, {
              form: range.from,
              to: range.to,
              cabin,
            });
          else {
            toast.error(" You must select a start date and an end date");
          }
        }}
        className="bg-primary-900 py-10 md:px-16 px-4 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {range.from && range.to ? (
            <ButtonReserveNow />
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
