import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create sample horses
    const horses = await Promise.all([
        prisma.horse.create({
            data: {
                name: "Thunder",
                breed: "Arabian",
                color: "Bay",
                age: 5
            }
        }),
        prisma.horse.create({
            data: {
                name: "Storm",
                breed: "Thoroughbred",
                color: "Black",
                age: 7
            }
        }),
        prisma.horse.create({
            data: {
                name: "Luna",
                breed: "Appaloosa",
                color: "Spotted White",
                age: 4
            }
        }),
        prisma.horse.create({
            data: {
                name: "Spirit",
                breed: "Mustang",
                color: "Palomino",
                age: 6
            }
        })
    ])

    console.log('Seeded horses:', horses)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
