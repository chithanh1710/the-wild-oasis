import { auth } from "@/app/_libs/auth";
import { getBookings } from "@/app/_libs/data-service";
import { Metadata } from "next";
import { ListBooking } from "../../_components/ListBooking";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Reservations by The Wild Oasis",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session?.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ListBooking bookings={bookings} />
      )}
    </div>
  );
}
