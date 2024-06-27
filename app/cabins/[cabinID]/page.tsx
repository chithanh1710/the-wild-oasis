import Spinner from "@/app/_components/Spinner";
import { cabinProps } from "@/app/_interfaces/Cabin";
import { getCabin, getCabins } from "@/app/_libs/data-service";
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import { Reservation } from "../../_components/Reservation";
import CabinDetails from "@/app/_components/CabinDetails";
import { auth } from "@/app/_libs/auth";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { cabinID } = params;
  const cabin: cabinProps = await getCabin(cabinID);
  const { name, description } = cabin;

  return {
    title: `Cabin ${name}`,
    description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const listId = cabins.map((cabin) => {
    return { cabinID: cabin.id.toString() };
  });

  return listId;
}

export default async function page({ params }: { params: Params }) {
  const { cabinID } = params;
  const cabin: cabinProps = await getCabin(cabinID);
  const sessions = await auth();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDetails cabin={cabin} />
      <div>
        <h2 className="md:text-5xl text-3xl font-semibold text-center mb-8 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation sessions={sessions} cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
