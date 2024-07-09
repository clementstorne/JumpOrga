import { DbUser } from "@/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
            select: {
              id: true,
              password: true,
              role: true,
              organizer: {
                select: {
                  id: true,
                },
              },
              official: {
                select: {
                  id: true,
                },
              },
            },
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          const { id, role, organizer, official } = user;

          return {
            id,
            email,
            role,
            organizerId: organizer ? organizer.id : null,
            officialId: official ? official.id : null,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        const userWithDetails = user as Omit<DbUser, "password"> & {
          organizerId: string | null;
          officialId: string | null;
        };
        token.role = userWithDetails.role;
        token.organizerId = userWithDetails.organizerId;
        token.officialId = userWithDetails.officialId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user = {
          // @ts-ignore
          id: token.sub,
          role: token.role,
          organizerId: token.organizerId,
          officialId: token.officialId,
          token: token,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
