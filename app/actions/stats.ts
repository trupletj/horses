'use server'

import { db } from "@/lib/db";

export async function getDashboardStats() {
    try {
        // Get total horses count
        const horsesCount = await db.horse.count();

        // Get total owners count
        const ownersCount = await db.owner.count();

        // Get unique provinces count (for regions)
        const provinces = await db.horse.findMany({
            select: {
                province: true,
            },
            distinct: ['province'],
            where: {
                province: {
                    not: null,
                },
            },
        });

        // Count unique breeds if you have that data
        // This is a placeholder since your schema doesn't have a breed field
        const breedsCount = 8; // Replace with actual query when you have the data

        return {
            horsesCount,
            ownersCount,
            regionsCount: provinces.length,
            breedsCount
        };
    } catch (error) {
        console.error("Error getting dashboard stats:", error);
        return {
            error: "Статистик мэдээлэл авахад алдаа гарлаа",
            horsesCount: 0,
            ownersCount: 0,
            regionsCount: 0,
            breedsCount: 0
        };
    }
} 