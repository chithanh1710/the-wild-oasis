import { Metadata } from "next";
import { auth } from "../_libs/auth";
import { getGuest } from "../_libs/data-service";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Account",
  description: "Account by The Wild Oasis",
};

export default async function page() {
  const session = await auth();

  if (!session?.user.email) throw new Error("You need logged");
  const guest = await getGuest(session?.user.email);
  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-semibold text-2xl text-accent-400">
        Welcome, {session?.user.name}
      </h2>
      <h2 className="font-semibold text-xl">Email: {session?.user.email}</h2>
      <h2 className="font-semibold text-xl">
        National ID number: {guest.nationalID}
      </h2>
      <h2 className="flex gap-4  items-center font-semibold text-xl">
        Nationality: {guest.nationality}
        <span>
          <Image
            width={24}
            height={24}
            src={guest.countryFlag}
            alt={guest.nationality}
          />
        </span>
      </h2>
    </div>
  );
}
