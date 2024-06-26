"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { useFirstMount } from "@/app/_hook/useFirstMount";

export function ButtonPageEdit() {
  const { pending } = useFirstMount("Edit success", "/account/reservations");
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? <SpinnerMini /> : "Update reservation"}
    </button>
  );
}
