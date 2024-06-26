"use client";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export function useFirstMount(message: string, url?: string) {
  const isFirstMount = useRef(false);
  const { pending } = useFormStatus();
  useEffect(() => {
    if (isFirstMount.current) {
      if (!pending) {
        toast.success(message);
        if (url) {
          redirect(url);
        }
      }
    } else {
      isFirstMount.current = true;
    }
  }, [pending, message, url]);
  return { pending };
}
