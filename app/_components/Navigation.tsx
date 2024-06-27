import Link from "next/link";
import { auth } from "../_libs/auth";
import Image from "next/image";
import { Menu } from "./Menu";

export default async function Navigation() {
  const session = await auth();
  return (
    <>
      <nav className="text-xl z-10 hidden md:block">
        <ul className="flex gap-16 items-center">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                <Image
                  src={session.user.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={session.user.name || "Guest area img"}
                  referrerPolicy="no-referrer"
                />
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Menu />
    </>
  );
}
