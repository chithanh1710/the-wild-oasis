"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function DeleteReservation({
  bookingId,
  deleteBooking,
}: {
  bookingId: string;
  deleteBooking: any;
}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isDelete) {
      deleteBooking(bookingId);
      setIsDelete(false);
      setIsDelete(false);
    }
  }, [isDelete, deleteBooking, bookingId]);

  return (
    <>
      <button
        onClick={() => setIsSubmit(true)}
        name="bookingId"
        value={bookingId}
        className="group max-md:justify-center flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      >
        <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">Delete</span>
      </button>
      {isSubmit && (
        <div
          onClick={() => setIsSubmit(false)}
          className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/80"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:p-10 p-6 rounded-lg bg-accent-800 "
          >
            <p className="text-lg md:text-2xl mb-4">
              Are you sure you want to delete?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsSubmit(false)}
                className="w-full py-3 rounded bg-red-900 text-xs md:text-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDelete(true)}
                className="w-full py-3 rounded bg-green-700 text-xs md:text-xl"
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
