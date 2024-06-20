import Link from "next/link";
import { ReactNode } from "react";
import SideNavigation from "../_components/SideNavigation";

export default function layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="lg:grid lg:grid-cols-[16rem_1fr] h-full flex flex-col gap-12">
      <SideNavigation />
      <div>{children}</div>
    </main>
  );
}
