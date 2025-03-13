import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export async function getSession() {
    return await getServerSession()
}

export async function getCurrentUser() {
    const session = await getSession()

    if (!session?.user?.email) {
        return null
    }

    return session.user
}

export async function requireAuth() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return user
}

export async function requireAdmin() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    if (user.role !== "admin") {
        redirect("/dashboard")
    }

    return user
} 