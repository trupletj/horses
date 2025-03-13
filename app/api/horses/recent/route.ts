import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET() {
    try {
        const recentHorses = await db.horse.findMany({
            take: 3,
            orderBy: { registeredAt: 'desc' },
            include: {
                Owner: true
            }
        });

        // Transform the data to match your UI needs
        const formattedHorses = recentHorses.map(horse => ({
            id: horse.id,
            name: horse.name,
            location: horse.location || `${horse.province || ''} ${horse.district ? ', ' + horse.district : ''}`,
            registeredDate: horse.registeredAt.toISOString().split('T')[0]
        }));

        console.log("Recent horses data:", formattedHorses);

        return NextResponse.json(formattedHorses);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
} 