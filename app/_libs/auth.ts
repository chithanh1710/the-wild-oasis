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
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            created_at: new Date(),
            fullName: user.name,
            email: user.email,
          });
        }
      } catch {
      } finally {
        return true;
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        const guest = await getGuest(session.user.email);

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
