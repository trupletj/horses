'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { CircleUser, Settings, Edit, Bike } from 'lucide-react'

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Хэрэглэгчийн профайл</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div>
                    <Card className="p-4">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <CircleUser className="w-12 h-12 text-blue-600" />
                            </div>
                            <h2 className="text-lg font-semibold">Админ</h2>
                            <p className="text-sm text-gray-500">admin@example.com</p>
                        </div>

                        <nav className="space-y-1">
                            <Link
                                href="/profile"
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                            >
                                <CircleUser className="w-5 h-5" />
                                <span>Профайл</span>
                            </Link>

                            <Link
                                href="/profile/edit"
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                            >
                                <Edit className="w-5 h-5" />
                                <span>Профайл засах</span>
                            </Link>

                            <Link
                                href="/profile/horses"
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                            >
                                <Bike className="w-5 h-5" />
                                <span>Миний морьд</span>
                            </Link>

                            <Link
                                href="/profile/settings"
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                            >
                                <Settings className="w-5 h-5" />
                                <span>Тохиргоо</span>
                            </Link>
                        </nav>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    )
} 