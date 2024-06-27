import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { cabinProps } from "@/app/_interfaces/Cabin";
import { getBookedDatesByCabinId, getSettings } from "@/app/_libs/data-service";
import { Session } from "next-auth";

export async function Reservation({
  sessions,
  cabin,
}: {
  sessions: Session | null;
  cabin: cabinProps;
}) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 md:border md:border-primary-800 min-h-[400px] overflow-hidden">
      <DateSelector
        bookedDates={bookedDates}
        settings={settings}
        cabin={cabin}
      />
      <ReservationForm sessions={sessions} cabin={cabin} />
    </div>
  );
}
