import { Metadata } from "next";
import { auth } from "../_libs/auth";

export const metadata: Metadata = {
  title: "Account",
  description: "Account by The Wild Oasis",
};

export default async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").at(0);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
