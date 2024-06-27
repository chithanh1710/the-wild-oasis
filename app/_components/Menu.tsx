"use client";

import { usePathname, useRouter } from "next/navigation";

export function Menu() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <select
      value={pathName.split("/")[1]}
      onChange={(e) => {
        router.push(`/${e.target.value}`);
      }}
      className="z-20 bg-transparent md:hidden block"
    >
      <option value="">Home</option>
      <option value="cabins">Cabin</option>
      <option value="about">About</option>
      <option value="account">Account</option>
    </select>
  );
}
