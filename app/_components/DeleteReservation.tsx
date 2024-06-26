"use client";
import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteReservation({
  bookingId,
  deleteBooking,
}: {
  bookingId: string;
  deleteBooking: any;
}) {
  function handleDelete() {
    if (confirm("sure delete")) deleteBooking(bookingId);
  }

  return (
    <button
      onClick={handleDelete}
      name="bookingId"
      value={bookingId}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">Delete</span>
    </button>
  );

  // return !isPending ? (
  //   <button
  //     onClick={handleDelete}
  //     name="bookingId"
  //     value={bookingId}
  //     className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
  //   >
  //     <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
  //     <span className="mt-1">Delete</span>
  //   </button>
  // ) : (
  //   <div className="group flex justify-center items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
  //     <SpinnerMini />
  //   </div>
  // );
}

export default DeleteReservation;
