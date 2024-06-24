import React from "react";
import CabinSkeleton from "./CabinSkeleton";

export default function ListCabinSkeleton() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      <CabinSkeleton />
      <CabinSkeleton />
      <CabinSkeleton />
      <CabinSkeleton />
    </div>
  );
}
