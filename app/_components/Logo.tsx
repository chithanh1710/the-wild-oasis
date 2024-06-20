import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-20">
      <Image
        quality={100}
        width={60}
        height={60}
        src={logo}
        alt="The Wild Oasis"
      />
      {/* <Image
        quality={75}
        width={60}
        height={60}
        src="/logo.png"
        alt="The Wild Oasis"
      /> */}
      <span className="text-xl font-medium text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
