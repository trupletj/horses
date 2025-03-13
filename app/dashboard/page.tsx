'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import {
    CircleDot,
    CircleUser,
    Map,
    ClipboardList,
    Search,
    FileCheck,
    Tag,
    Info,
} from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header with search */}
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Морины бүртгэл</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Морь хайх..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                        />
                    </div>
                    <select className="px-4 py-2 rounded-lg border border-gray-200">
                        <option>Бүх аймаг</option>
                        <option>Төв аймаг</option>
                        <option>Сэлэнгэ аймаг</option>
                    </select>
                </div>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="flex items-center p-6">
                        <CircleDot className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Нийт морьд</p>
                            <h3 className="text-2xl font-bold">156</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <CircleUser className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Эзэмшигчид</p>
                            <h3 className="text-2xl font-bold">48</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <Map className="h-8 w-8 text-purple-500" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Бүс нутаг</p>
                            <h3 className="text-2xl font-bold">12</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <Tag className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Үүлдэр, омог</p>
                            <h3 className="text-2xl font-bold">8</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Recent Registrations */}
                <Card className="col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Сүүлд бүртгэгдсэн морьд</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/horses">
                                Бүгдийг харах
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                            <CircleDot className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Хүрэн морь</p>
                                            <p className="text-sm text-gray-500">Төв аймаг, Батсүмбэр сум</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">2024.02.2{i}</p>
                                        <Button variant="ghost" size="sm">
                                            Дэлгэрэнгүй
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Үндсэн үйлдлүүд</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button asChild className="w-full justify-start" variant="outline">
                            <Link href="/register">
                                <CircleDot className="mr-2 h-4 w-4" />
                                Шинэ морь бүртгэх
                            </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Бүртгэлийн маягт
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <FileCheck className="mr-2 h-4 w-4" />
                            Гэрчилгээ хэвлэх
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <Info className="mr-2 h-4 w-4" />
                            Заавар, тусламж
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 