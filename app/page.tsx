import Image from "next/image";

import bg from "@/public/bg.png";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        className="object-cover object-top absolute"
        fill
        src={bg}
        placeholder="blur"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="md:text-8xl text-6xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 md:px-8 md:py-6 px-6 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
