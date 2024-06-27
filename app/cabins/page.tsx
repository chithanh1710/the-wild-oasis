import { Metadata } from "next";
import CabinsList from "../_components/CabinsList";
import { Suspense } from "react";
import ListCabinSkeleton from "../_components/ListCabinSkeleton";
import FilterCabins from "../_components/FilterCabins";
import FilterCabinsByPrice from "../_components/MultiRangeSlider";

export const metadata: Metadata = {
  title: "Cabins",
  description: "Cabins by The Wild Oasis",
};

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filterCapacity = searchParams?.capacity ?? "all";
  const filterByPrice = {
    min: Number(searchParams?.priceMin) || 0,
    max: Number(searchParams?.priceMax) || 10000,
  };

  const capacity = {
    field: "capacity",
    list: [
      { name: "All cabins", value: "all" },
      { name: "2-3 guests", value: "small" },
      { name: "4-7 guests", value: "medium" },
      { name: "8-12 guests", value: "large" },
    ],
  };
  return (
    <div>
      <h1 className="md:text-4xl text-2xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 md:text-lg text-sm mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex md:flex-row flex-col md:mb-8 mb-16 items-center justify-between md:gap-4 gap-8">
        <FilterCabins data={capacity} />
        <FilterCabinsByPrice min={0} max={2000} />
      </div>

      <Suspense key={filterCapacity} fallback={<ListCabinSkeleton />}>
        <CabinsList
          filterByPrice={filterByPrice}
          filterCapacity={filterCapacity}
        />
      </Suspense>
    </div>
  );
}
