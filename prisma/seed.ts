import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        // Эзэмшигч нэмэх
        const owner = await prisma.owner.create({
            data: {
                name: 'Бат-Эрдэнэ',
                phone: '99119911',
                address: 'Төв аймаг, Батсүмбэр сум'
            }
        });

        // Морьд нэмэх
        await prisma.horse.create({
            data: {
                name: 'Хүрэн морь',
                color: 'Хүрэн',
                number: 'MN12345',
                location: 'Төв аймаг, Батсүмбэр сум',
                ageCategory: 'Их нас',
                age: 5,
                status: 'Идэвхтэй',
                province: 'Төв',
                district: 'Батсүмбэр',
                chipNumber: 'CHIP001',
                description: 'Монгол хүрэн морь',
                share: 1,
                brand: 'БЭ',
                ownerId: owner.id
            }
        });

        // Нэмэх морь
        await prisma.horse.create({
            data: {
                name: 'Халиун морь',
                color: 'Халиун',
                number: 'MN12346',
                location: 'Сэлэнгэ аймаг, Мандал сум',
                ageCategory: 'Дунд нас',
                age: 3,
                status: 'Идэвхтэй',
                province: 'Сэлэнгэ',
                district: 'Мандал',
                chipNumber: 'CHIP002',
                description: 'Монгол халиун морь',
                share: 1,
                brand: 'БЭ',
                ownerId: owner.id
            }
        });

        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});