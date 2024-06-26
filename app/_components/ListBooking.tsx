"use client";
import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteReservationAction } from "../_libs/actions";
import toast from "react-hot-toast";

export function ListBooking({ bookings }: { bookings: any }) {
  const [bookingsOptimistic, deleteBookingsOptimistic] = useOptimistic(
    bookings,
    (state, id) => state.filter((item: any) => item.id !== id)
  );

  async function deleteBooking(id: string) {
    deleteBookingsOptimistic(id);
    try {
      await deleteReservationAction(id);
    } catch (error) {
      toast.error("Delete fail");
    }
  }

  return (
    <ul className="space-y-6">
      {bookingsOptimistic.map((booking: any) => (
        <ReservationCard
          deleteBooking={deleteBooking}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
