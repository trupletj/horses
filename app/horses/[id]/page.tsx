import { getHorse } from '@/app/actions/horse'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default async function HorsePage({ params }: { params: { id: string } }) {
    const { horse, error } = await getHorse(params.id)

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
                <Button asChild className="mt-4">
                    <Link href="/horses">Буцах</Link>
                </Button>
            </div>
        )
    }

    if (!horse) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Морь олдсонгүй</h1>
                    <Button asChild>
                        <Link href="/horses">Буцах</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{horse.name}</h1>
                <Button asChild>
                    <Link href="/horses">Буцах</Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Морины мэдээлэл</h2>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium">Нэр:</p>
                        <p>{horse.name}</p>
                    </div>
                    <div>
                        <p className="font-medium">Зүс:</p>
                        <p>{horse.color}</p>
                    </div>
                    <div>
                        <p className="font-medium">Дугаар:</p>
                        <p>{horse.number}</p>
                    </div>
                    <div>
                        <p className="font-medium">Нас:</p>
                        <p>{horse.age} нас</p>
                    </div>
                    <div>
                        <p className="font-medium">Насны ангилал:</p>
                        <p>{horse.ageCategory}</p>
                    </div>
                    <div>
                        <p className="font-medium">Байршил:</p>
                        <p>{horse.location}</p>
                    </div>
                    <div>
                        <p className="font-medium">Аймаг:</p>
                        <p>{horse.province}</p>
                    </div>
                    <div>
                        <p className="font-medium">Сум:</p>
                        <p>{horse.district}</p>
                    </div>
                    <div>
                        <p className="font-medium">Чипийн дугаар:</p>
                        <p>{horse.chipNumber || '-'}</p>
                    </div>
                    <div>
                        <p className="font-medium">Төлөв:</p>
                        <p>{horse.status}</p>
                    </div>
                    <div>
                        <p className="font-medium">Хувь:</p>
                        <p>{horse.share}%</p>
                    </div>
                    <div>
                        <p className="font-medium">Тамга:</p>
                        <p>{horse.brand || '-'}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-medium">Тайлбар:</p>
                        <p>{horse.description || '-'}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 