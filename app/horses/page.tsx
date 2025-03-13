// app/horses/page.tsx
import Link from 'next/link'
import { getHorses } from '@/app/actions/horse'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default async function HorsesPage() {
    const { horses, error } = await getHorses()

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Бүртгэлтэй морьд</h1>
                        <p className="mt-2 text-gray-600">Нийт: {horses?.length || 0} морь</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/register">
                            Шинэ морь бүртгэх
                        </Link>
                    </Button>
                </div>

                {error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                ) : horses && horses.length > 0 ? (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="py-4 font-semibold text-gray-900">Нэр</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Зүс</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Дугаар</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Нас</TableHead>
                                    <TableHead className="font-semibold text-gray-900">Байршил</TableHead>
                                    <TableHead className="font-semibold text-gray-900 text-right">Үйлдэл</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {horses.map((horse) => (
                                    <TableRow
                                        key={horse.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <TableCell className="font-medium">{horse.name}</TableCell>
                                        <TableCell>{horse.color}</TableCell>
                                        <TableCell>{horse.number}</TableCell>
                                        <TableCell>{horse.age} нас</TableCell>
                                        <TableCell>{horse.location}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                                            >
                                                <Link href={`/horses/${horse.id}`}>
                                                    Дэлгэрэнгүй
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Одоогоор бүртгэлтэй морь байхгүй байна</h3>
                        <p className="mt-1 text-sm text-gray-500">Шинэ морь бүртгэж эхлэх үү?</p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/register">
                                    Анхны морио бүртгэх
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}