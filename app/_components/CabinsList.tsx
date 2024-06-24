import CabinCard from "./CabinCard";
import { cabinProps } from "../_interfaces/Cabin";
import { getCabins } from "../_libs/data-service";

export default async function CabinsList({
  filterCapacity,
  filterByPrice,
}: {
  filterByPrice: { min: number; max: number };
  filterCapacity: string;
}) {
  const cabins: cabinProps[] = await getCabins();
  let dataTemp;

  dataTemp = cabins.filter(
    (item) =>
      item.regularPrice >= filterByPrice.min &&
      item.regularPrice <= filterByPrice.max
  );

  if (filterCapacity === "small") {
    dataTemp = dataTemp.filter((item) => item.maxCapacity <= 3);
  } else if (filterCapacity === "medium") {
    dataTemp = dataTemp.filter(
      (item) => item.maxCapacity >= 4 && item.maxCapacity <= 7
    );
  } else if (filterCapacity === "large") {
    dataTemp = dataTemp.filter((item) => item.maxCapacity >= 8);
  } else {
    dataTemp = dataTemp;
  }

  return (
    dataTemp.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {dataTemp.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
}
