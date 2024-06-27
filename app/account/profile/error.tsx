"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">
        {error.message ===
        "An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error."
          ? "National id is not in correct format. National id needs 6 - 12 numbers"
          : error.message}
      </p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try again
      </button>
      <Link
        className="inline-block border-2 border-accent-500 text-accent-500 px-6 py-3 text-lg"
        href="/"
      >
        Back to home
      </Link>
    </main>
  );
}
