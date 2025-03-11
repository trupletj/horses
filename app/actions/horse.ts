// app/actions/horse.ts
'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Simple schema for validation
const horseSchema = z.object({
    name: z.string().min(1, "Horse name is required"),
    breed: z.string().min(1, "Breed is required"),
    color: z.string().min(1, "Color is required"),
    age: z.coerce.number().min(0, "Age must be a positive number"),
});

export type HorseFormData = z.infer<typeof horseSchema>;

// Register a new horse
export async function registerHorse(data: HorseFormData) {
    try {
        // Validate form data
        const validatedData = horseSchema.parse(data);

        // Create horse in database
        const horse = await db.horse.create({
            data: validatedData,
        });

        // Revalidate the horses list page
        revalidatePath('/horses');

        return { success: true, horse };
    } catch (error) {
        console.error("Error registering horse:", error);
        return {
            success: false,
            error: error instanceof z.ZodError
                ? "Invalid form data"
                : "Failed to register horse"
        };
    }
}

// Get all horses
export async function getHorses() {
    try {
        const horses = await db.horse.findMany({
            orderBy: { registeredAt: 'desc' },
        });

        return { horses };
    } catch (error) {
        console.error("Error getting horses:", error);
        return { error: "Failed to load horses" };
    }
}