'use server'

import { db } from "@/lib/db"
import bcrypt from "bcrypt"

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export async function registerUser(data: RegisterData) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await db.user.create({
            data: {
                name: data.username,
                email: data.email,
                password: hashedPassword,
            },
        })

        return { success: true }
    } catch (error) {
        return { error: 'Registration failed' }
    }
} 