import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { db } from "@/lib/db"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth from "next-auth/next"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) {
                    return null
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!passwordMatch) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.isAdmin = user.isAdmin
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.isAdmin = token.isAdmin
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 