// app/actions/horse.ts
'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Simple schema for validation
const horseSchema = z.object({
    name: z.string().min(1, "Морины нэр оруулна уу"),
    color: z.string().min(1, "Зүс оруулна уу"),
    number: z.string().min(1, "Дугаар оруулна уу"),
    location: z.string().optional(),
    ageCategory: z.string().optional(),
    age: z.coerce.number().min(0, "Нас 0-ээс их байх ёстой"),
    status: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    chipNumber: z.string().optional(),
    description: z.string().optional(),
    share: z.coerce.number().optional(),
    brand: z.string().optional(),
});

export type HorseFormData = z.infer<typeof horseSchema>;

// Register a new horse
export async function registerHorse(data: HorseFormData) {
    try {
        // Validate form data
        const validatedData = horseSchema.parse(data);

        // Create horse in database
        const horse = await db.horse.create({
            data: {
                ...validatedData,
                share: validatedData.share ? validatedData.share : undefined
            },
        });

        // Revalidate the horses list page
        revalidatePath('/horses');

        return { success: true, horse };
    } catch (error) {
        console.error("Error registering horse:", error);
        return {
            success: false,
            error: error instanceof z.ZodError
                ? "Буруу өгөгдөл оруулсан байна"
                : "Морь бүртгэхэд алдаа гарлаа"
        };
    }
}

// Get all horses
export async function getHorses() {
    try {
        const horses = await db.horse.findMany({
            orderBy: { registeredAt: 'desc' }
        });

        return { horses };
    } catch (error) {
        console.error("Error getting horses:", error);
        return { error: "Морьдын жагсаалтыг ачаалахад алдаа гарлаа" };
    }
}

export async function getHorse(id: string) {
    try {
        const horse = await db.horse.findUnique({
            where: { id }
        });

        if (!horse) {
            return { error: "Морь олдсонгүй" };
        }

        return { horse };
    } catch (error) {
        console.error("Error getting horse:", error);
        return { error: "Мэдээлэл авахад алдаа гарлаа" };
    }
}

export async function getRecentHorses(limit = 3) {
    try {
        const horses = await db.horse.findMany({
            take: limit,
            orderBy: { registeredAt: 'desc' },
            include: {
                Owner: true
            }
        });

        return { horses };
    } catch (error) {
        console.error("Error getting recent horses:", error);
        return { error: "Сүүлийн бүртгэлүүдийг ачаалахад алдаа гарлаа" };
    }
}