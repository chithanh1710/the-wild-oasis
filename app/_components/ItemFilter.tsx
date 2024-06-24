"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ItemFilter({
  field,
  name,
  value,
}: {
  field: string;
  name: string;
  value: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isField = searchParams.get(field)
    ? searchParams.get(field) === value
    : "all" === value;

  return (
    <button
      onClick={() => {
        const params = new URLSearchParams(searchParams);
        params.set(field, value);
        router.push(`${pathname}?${params.toString()}`);
      }}
      className={`${
        isField ? "bg-primary-800" : ""
      } px-4 py-2 hover:bg-primary-800`}
    >
      {name}
    </button>
  );
}
