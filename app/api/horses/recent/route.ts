import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Түр зуурын тестийн өгөгдөл
        const mockHorses = [
            {
                id: '1',
                name: 'Хүрэн морь',
                location: 'Төв аймаг, Батсүмбэр сум',
                registeredDate: '2024-02-25'
            },
            {
                id: '2',
                name: 'Халиун морь',
                location: 'Сэлэнгэ аймаг, Мандал сум',
                registeredDate: '2024-02-24'
            },
            {
                id: '3',
                name: 'Хар морь',
                location: 'Төв аймаг, Зуунмод сум',
                registeredDate: '2024-02-23'
            }
        ];

        // 200 статустай хариу буцаах
        return NextResponse.json(mockHorses);

    } catch (error) {
        // Алдаа гарвал 500 статустай хариу буцаах
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
} 