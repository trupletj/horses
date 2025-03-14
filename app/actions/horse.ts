// app/actions/horse.ts
'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "next-auth/next";

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
                age: validatedData.age.toString(),
                share: validatedData.share ? validatedData.share.toString() : undefined
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
export async function getHorses(query: string = "", page: number = 1) {
    try {
        const limit = 10;
        const skip = (page - 1) * limit;

        const horses = await db.horse.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ],
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        });

        const totalHorses = await db.horse.count({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ],
            },
        });

        return {
            horses,
            totalPages: Math.ceil(totalHorses / limit),
        };
    } catch (error) {
        console.error("Error getting horses:", error);
        throw error;
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

// Create horse function
export async function createHorse(data: any) {
    try {
        // Validate that the user is authenticated
        const session = await getServerSession();
        if (!session?.user) {
            throw new Error("Та эхлээд нэвтрэх шаардлагатай");
        }

        // Get the user ID
        const user = await db.user.findUnique({
            where: { email: session.user.email as string },
        });

        if (!user) {
            throw new Error("Хэрэглэгч олдсонгүй");
        }

        // Create the horse
        const horse = await db.horse.create({
            data: {
                name: data.name,
                chipId: data.chipId || null,
                description: data.description || null,
                number: data.number || null,
                origin: data.origin || null,
                percentage: data.percentage || null,
                ancestry: data.ancestry || null,
                brand: data.brand || null,
                age: data.age || null,
                gender: data.gender || null,
                status: data.status || "Амьд",
                province: data.province || null,
                district: data.district || null,
                originalOwner: data.originalOwner || null,
                currentOwner: data.currentOwner || null,
                acquisitionYear: data.acquisitionYear || null,
                listedYear: data.listedYear || null,
                imageUrl: data.imageUrl || null,
                userId: user.id,
                share: data.share ? data.share.toString() : null,
            },
        });

        return horse;
    } catch (error) {
        console.error("Error creating horse:", error);
        throw error;
    }
}

// Get user horses function
export async function getUserHorses(userId: string, page: number = 1) {
    try {
        const limit = 10;
        const skip = (page - 1) * limit;

        const horses = await db.horse.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        });

        const totalHorses = await db.horse.count({
            where: {
                userId,
            },
        });

        return {
            horses,
            totalPages: Math.ceil(totalHorses / limit),
        };
    } catch (error) {
        console.error("Error getting user horses:", error);
        throw error;
    }
}