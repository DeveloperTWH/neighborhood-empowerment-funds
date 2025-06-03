/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt"; // <-- Correct import of JWT type
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

interface CustomToken extends JWT {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  avatar?: string | null;
}

async function yourCustomLogin(email: string, password: string) {
  await connectToDB();
  const user = await User.findOne({ email });

  if (!user || !user.hashedPassword) return null;

  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        return await yourCustomLogin(credentials.email, credentials.password);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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

    async jwt({ token, user }): Promise<CustomToken> {
      const customToken = token as CustomToken;

      if (user) {
        customToken.id = (user as any).id;
        customToken.email = user.email ?? undefined;
        customToken.name = user.name ?? undefined;
        customToken.role = (user as any).role ?? undefined;
        customToken.avatar = (user as any).avatar ?? undefined;
      }
      return customToken;
    },

    async session({ session, token }) {
      if (session.user) {
        const customToken = token as CustomToken;
        session.user.id = customToken.id as string;
        session.user.email = customToken.email ?? undefined;
        session.user.name = customToken.name ?? undefined;
        session.user.role = customToken.role ?? undefined;
        session.user.avatar = customToken.avatar ?? undefined;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
