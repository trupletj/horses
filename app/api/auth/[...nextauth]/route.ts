import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

const handler = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (session.user) {
                if (token) {
                    session.user.id = token.sub || "";
                    session.user.role = (token.role as string) || "user";
                }

                if (user) {
                    session.user.id = user.id;
                    session.user.role = user.role || "user";
                }

                if (!session.user.role && session.user.email) {
                    const dbUser = await db.user.findUnique({
                        where: { email: session.user.email },
                        select: { id: true, role: true },
                    });

                    if (dbUser) {
                        session.user.id = dbUser.id;
                        session.user.role = dbUser.role || "user";
                    }
                }
            }

            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || "user";
            }

            if (!token.role && token.email) {
                const dbUser = await db.user.findUnique({
                    where: { email: token.email as string },
                    select: { role: true },
                });

                if (dbUser) {
                    token.role = dbUser.role || "user";
                }
            }

            return token;
        },
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/auth/login',
    },
    session: {
        strategy: "jwt",
    },
})

export { handler as GET, handler as POST } 