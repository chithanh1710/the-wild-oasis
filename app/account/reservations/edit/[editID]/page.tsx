import { getBooking, getCabin } from "@/app/_libs/data-service";
import { updateBookingAction } from "./actions";
import { ButtonPageEdit } from "./ButtonPageEdit";

export default async function page({ params }: { params: { editID: string } }) {
  const id = params.editID;
  const booking = await getBooking(id);
  const cabin = await getCabin(booking.cabinID);
  const reservationId = id;
  const { observations, numGuests } = booking;
  const { maxCapacity } = cabin;
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBookingAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <input type="hidden" value={reservationId} readOnly name="id" />
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
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
            defaultValue={observations || ""}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <ButtonPageEdit />
        </div>
      </form>
    </div>
  );
}
