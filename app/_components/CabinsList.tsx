import CabinCard from "./CabinCard";
import { cabinProps } from "../_interfaces/Cabin";
import { getCabins } from "../_libs/data-service";

export default async function CabinsList() {
  const cabins: cabinProps[] = await getCabins();

  return (
    cabins.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
}
