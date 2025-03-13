import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET() {
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

        // For breeds count, you can either:
        // 1. Use a placeholder value until you add breed data to your schema
        const breedsCount = 8;

        // Or 2. Count distinct colors as a temporary substitute
        // const colors = await db.horse.findMany({
        //     select: { color: true },
        //     distinct: ['color'],
        //     where: { color: { not: null } },
        // });
        // const breedsCount = colors.length;

        console.log("Stats data:", { horsesCount, ownersCount, regionsCount: provinces.length, breedsCount });

        return NextResponse.json({
            horsesCount,
            ownersCount,
            regionsCount: provinces.length,
            breedsCount
        });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            {
                error: "Статистик мэдээлэл авахад алдаа гарлаа",
                horsesCount: 0,
                ownersCount: 0,
                regionsCount: 0,
                breedsCount: 0
            },
            { status: 500 }
        );
    }
} 