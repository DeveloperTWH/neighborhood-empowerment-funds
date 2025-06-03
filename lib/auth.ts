/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.hashedPassword) return null;

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isMatch) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDB();
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            hashedPassword: null,
            oauthProvider: "google",
            oauthId: profile?.sub || undefined,
            role: "user",
            avatar: user.image ?? undefined,
          });
        }

        (user as any).id = existingUser._id.toString();
        (user as any).role = existingUser.role;
        (user as any).avatar = existingUser.avatar ?? undefined;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
        token.role = (user as any).role ?? undefined;
        token.avatar = (user as any).avatar ?? undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? undefined;
        session.user.name = token.name ?? undefined;
        session.user.role = token.role ?? undefined;
        session.user.avatar = token.avatar ?? undefined;
      }
      return session;
    },
  },
};
