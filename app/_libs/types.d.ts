import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      guestId: string | null;
    } & DefaultSession["user"];
  }
}
