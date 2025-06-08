// lib/auth.ts
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions, User } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      httpOptions: {
        timeout: 10000, // wait 10 seconds
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login, // 👈 ADD THIS LINE
        };
      }
    }),
  ],
};
