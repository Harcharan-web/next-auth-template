import { getServerSession } from "next-auth/next";

// Define AuthOptions interface locally since it's not exported from NextAuth v4
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AuthOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providers: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbacks?: any;
}
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { UserService } from "@/services/user.service";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await UserService.findByEmail(credentials.email);

        if (!user || !user.password) return null;

        const isValid = await UserService.verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        await UserService.updateLastLogin(user.id);

        return {
          id: user.id,
          email: user.email,
          name: UserService.getFullName(user),
          role: user.role ?? undefined,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createUser({ user }: { user: any }) {
      if (!user.email || !user.name) return;

      const [firstName, ...rest] = (user.name || "").split(" ");
      const lastName = rest.join(" ") || null;

      await db
        .update(users)
        .set({
          firstName,
          lastName,
          image: user.image,
        })
        .where(eq(users.id, user.id));
    },
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to dashboard after successful login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export const getSession = () => getServerSession(authOptions);
