import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "MEMBER";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.email ?? "";
        session.user.role = (token.role as string | undefined) ?? "MEMBER";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
