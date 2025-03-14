import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs"
import { writeFile } from "fs/promises"
import { z } from "zod"

// Define validation schema
const horseSchema = z.object({
    name: z.string().min(1, "Нэр заавал шаардлагатай"),
    chipId: z.string().optional(),
    description: z.string().optional(),
    number: z.string().optional(),
    origin: z.string().optional(),
    percentage: z.string().optional(),
    ancestry: z.string().optional(),
    brand: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
    status: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    originalOwner: z.string().optional(),
    currentOwner: z.string().optional(),
    acquisitionYear: z.string().optional(),
    listedYear: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession()
        if (!session?.user) {
            return NextResponse.json(
                { message: "Та эхлээд нэвтэрнэ үү" },
                { status: 401 }
            )
        }

        // Process form data
        const formData = await request.formData()

        // Extract and validate text fields
        const horseData = {
            name: formData.get("name") as string,
            chipId: formData.get("chipId") as string,
            description: formData.get("description") as string,
            number: formData.get("number") as string,
            origin: formData.get("origin") as string,
            percentage: formData.get("percentage") as string,
            ancestry: formData.get("ancestry") as string,
            brand: formData.get("brand") as string,
            age: formData.get("age") as string,
            gender: formData.get("gender") as string,
            status: formData.get("status") as string,
            province: formData.get("province") as string,
            district: formData.get("district") as string,
            originalOwner: formData.get("originalOwner") as string,
            currentOwner: formData.get("currentOwner") as string,
            acquisitionYear: formData.get("acquisitionYear") as string,
            listedYear: formData.get("listedYear") as string,
        }

        // Validate data
        const validatedData = horseSchema.parse(horseData)

        // Handle image upload
        let imagePath = null
        const image = formData.get("image") as File

        if (image && image.size > 0) {
            // Create uploads directory if it doesn't exist
            const uploadsDir = path.join(process.cwd(), "public/uploads")
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true })
            }

            // Generate unique filename
            const uniqueId = uuidv4()
            const fileExtension = image.name.split(".").pop()
            const fileName = `${uniqueId}.${fileExtension}`
            const filePath = path.join(uploadsDir, fileName)

            // Write file to disk
            const buffer = Buffer.from(await image.arrayBuffer())
            await writeFile(filePath, buffer)

            // Store relative path in database
            imagePath = `/uploads/${fileName}`
        }

        // Create horse record in database
        const horse = await db.horse.create({
            data: {
                name: validatedData.name,
                chipId: validatedData.chipId || null,
                description: validatedData.description || null,
                number: validatedData.number || null,
                origin: validatedData.origin || null,
                percentage: validatedData.percentage || null,
                ancestry: validatedData.ancestry || null,
                brand: validatedData.brand || null,
                age: validatedData.age || null,
                gender: validatedData.gender || null,
                status: validatedData.status || "Амьд",
                province: validatedData.province || null,
                district: validatedData.district || null,
                originalOwner: validatedData.originalOwner || null,
                currentOwner: validatedData.currentOwner || null,
                acquisitionYear: validatedData.acquisitionYear || null,
                listedYear: validatedData.listedYear || null,
                imageUrl: imagePath,
                userId: session.user.id || null,
            },
        })

        return NextResponse.json(horse, { status: 201 })

    } catch (error) {
        console.error("Error creating horse:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Буруу өгөгдөл", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Морь бүртгэхэд алдаа гарлаа" },
            { status: 500 }
        )
    }
}