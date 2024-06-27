import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import Image from "next/image";
import { cabinProps } from "../_interfaces/Cabin";

export default function CabinDetails({ cabin }: { cabin: cabinProps }) {
  return (
    <div className="md:grid md:grid-cols-[3fr_4fr] flex flex-col md:gap-20 gap-6 border border-primary-800 md:py-3 md:px-10 mb-24">
      <div className="relative md:scale-[1.15] md:-translate-x-3 md:h-full w-full h-80">
        <Image
          className="object-cover absolute"
          fill
          sizes="600px"
          priority
          src={cabin.image}
          alt={`Cabin ${cabin.name}`}
        />
      </div>

      <div className="md:px-0 px-4">
        <h3 className="text-accent-100 font-black md:text-7xl text-5xl mb-5 md:translate-x-[-254px] bg-primary-950 md:p-6 pb-1 md:w-[150%]">
          Cabin {cabin.name}
        </h3>

        <p className="md:text-lg text-xs text-primary-300 mb-10">
          <TextExpander description={cabin.description || ""} />
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
              guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
