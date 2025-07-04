// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      avatar?: string | null;
      isVerified?: boolean;
    };
  }

  interface User {
    id?: string;
    role?: string;
    avatar?: string | null;
    isVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    avatar?: string | null;
    isVerified?: boolean;
  }
}
