import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ChevronLeft, Edit } from "lucide-react"

interface HorsePageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: HorsePageProps): Promise<Metadata> {
    const horse = await db.horse.findUnique({
        where: {
            id: params.id,
        },
    })

    if (!horse) {
        return {
            title: "Морь олдсонгүй",
        }
    }

    return {
        title: `${horse.name} | Морины дэлгэрэнгүй`,
        description: horse.description || `${horse.name} морины дэлгэрэнгүй мэдээлэл`,
    }
}

export default async function HorsePage({ params }: HorsePageProps) {
    const horse = await db.horse.findUnique({
        where: {
            id: params.id,
        },
        include: {
            user: true,
        },
    })

    if (!horse) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <Button asChild variant="outline" size="sm">
                    <Link href="/horses">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Бүх морьд
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card className="overflow-hidden">
                        {horse.imageUrl ? (
                            <img
                                src={horse.imageUrl}
                                alt={horse.name}
                                className="w-full aspect-square object-cover"
                            />
                        ) : (
                            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                                <p className="text-gray-400">Зураггүй</p>
                            </div>
                        )}
                        <CardContent className="p-4">
                            <h1 className="text-2xl font-bold mb-2">{horse.name}</h1>
                            <p className="text-gray-500 mb-4">
                                {horse.age && horse.gender
                                    ? `${horse.age} настай ${horse.gender}`
                                    : "Мэдээлэл байхгүй"}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {horse.status || "Амьд"}
                                </span>
                                <Button asChild size="sm" variant="outline">
                                    <Link href={`/horses/${horse.id}/edit`}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Засах
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Дэлгэрэнгүй мэдээлэл</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Чип</h3>
                                        <p className="mt-1">{horse.chipId || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Дугаар</h3>
                                        <p className="mt-1">{horse.number || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                {horse.description && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Тайлбар</h3>
                                        <p className="mt-1 whitespace-pre-line">{horse.description}</p>
                                    </div>
                                )}

                                {/* Origin and Ancestry */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Нутаг</h3>
                                        <p className="mt-1">{horse.origin || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Угшил</h3>
                                        <p className="mt-1">{horse.ancestry || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                </div>

                                {/* Percentage and Brand */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Хувь</h3>
                                        <p className="mt-1">{horse.percentage || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Тамга</h3>
                                        <p className="mt-1">{horse.brand || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Аймаг</h3>
                                        <p className="mt-1">{horse.province || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Сум</h3>
                                        <p className="mt-1">{horse.district || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                </div>

                                {/* Ownership */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Унаган эзэн</h3>
                                        <p className="mt-1">{horse.originalOwner || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Одоогийн эзэн</h3>
                                        <p className="mt-1">{horse.currentOwner || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                </div>

                                {/* Years */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Авсан он</h3>
                                        <p className="mt-1">{horse.acquisitionYear || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Зарлагдсан он</h3>
                                        <p className="mt-1">{horse.listedYear || "Мэдээлэл байхгүй"}</p>
                                    </div>
                                </div>

                                {/* Registration Info */}
                                <div className="border-t pt-4 mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Бүртгэсэн</h3>
                                            <p className="mt-1">{horse.user?.name || "Тодорхойгүй"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Бүртгэсэн огноо</h3>
                                            <p className="mt-1">{new Date(horse.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}