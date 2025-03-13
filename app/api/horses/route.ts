import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { z } from "zod";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid @types/uuid

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

export async function POST(request: Request) {
    try {
        // Handle multipart form data
        const formData = await request.formData();

        // Extract form fields
        const horseData = {
            name: formData.get('name') as string,
            color: formData.get('color') as string,
            number: formData.get('number') as string,
            location: formData.get('location') as string,
            ageCategory: formData.get('ageCategory') as string,
            age: parseInt(formData.get('age') as string || '0'),
            status: formData.get('status') as string,
            province: formData.get('province') as string,
            district: formData.get('district') as string,
            chipNumber: formData.get('chipNumber') as string,
            description: formData.get('description') as string,
            share: parseFloat(formData.get('share') as string || '0'),
            brand: formData.get('brand') as string,
        };

        // Validate form data
        const validatedData = horseSchema.parse(horseData);

        // Handle image upload
        let imageUrl = null;
        const image = formData.get('image') as File | null;

        if (image) {
            // Create unique filename
            const fileExtension = image.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;

            // Create directory if it doesn't exist
            const publicDir = join(process.cwd(), 'public');
            const uploadsDir = join(publicDir, 'uploads');

            try {
                // Ensure uploads directory exists
                await mkdir(uploadsDir, { recursive: true });

                // Write file to disk
                const buffer = Buffer.from(await image.arrayBuffer());
                await writeFile(join(uploadsDir, fileName), buffer);

                // Set image URL for database
                imageUrl = `/uploads/${fileName}`;
            } catch (error) {
                console.error('Error saving image:', error);
                throw new Error('Failed to save image');
            }
        }

        // Create horse in database
        const horse = await db.horse.create({
            data: {
                ...validatedData,
                share: validatedData.share ? validatedData.share : undefined,
                imageUrl: imageUrl
            },
        });

        return NextResponse.json({ success: true, horse });
    } catch (error) {
        console.error("Error registering horse:", error);

        const errorMessage = error instanceof z.ZodError
            ? "Буруу өгөгдөл оруулсан байна"
            : "Морь бүртгэхэд алдаа гарлаа";

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 400 }
        );
    }
}