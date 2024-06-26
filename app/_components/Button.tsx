"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Button({ text }: { text: string }) {
  const [count, setCount] = useState(0);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending) {
      setCount((i) => i + 1);
    }
  }, [pending]);

  useEffect(() => {
    if (count >= 2) {
      toast.success("Update success");
    }
  }, [count]);

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? <SpinnerMini /> : text}
    </button>
  );
}
