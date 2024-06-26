import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      console.log("User during signIn:", user);

      if (user.email) {
        const existingGuest = await getGuest(user.email);
        console.log("Existing guest:", existingGuest);

        if (!existingGuest) {
          await createGuest({
            created_at: new Date(),
            fullName: user.name,
            email: user.email,
          });
        }
      }

      return true;
    },
    async session({ session }) {
      console.log("Session during callback:", session);
      if (session.user?.email) {
        const guest = await getGuest(session.user.email);
        console.log("Guest found:", guest);

        if (guest) {
          session.user.guestId = guest.id;
        } else {
          session.user.guestId = null;
        }
      } else {
        session.user.guestId = null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
