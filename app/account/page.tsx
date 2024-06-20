import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Account by The Wild Oasis",
};

export default function page() {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, Chi Thanh
    </h2>
  );
}
