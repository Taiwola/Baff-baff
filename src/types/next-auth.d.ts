import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole
    } & DefaultSession["user"];
  }

   interface User {
    id: string
    email: string
    name: string
    role: UserRole
  }

  interface JWT {
    role?: UserRole
  }
}
