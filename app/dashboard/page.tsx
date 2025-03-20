'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { db } from "@/lib/db"


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

// Define types for your data
type DashboardStats = {
    horsesCount: number;
    ownersCount: number;
    regionsCount: number;
    breedsCount: number;
}

type RecentHorse = {
    id: string;
    name: string;
    location: string;
    registeredDate: string;
}

export default async function DashboardPage() {
    const horses = await db.horse.findMany({
        orderBy: {
            updatedAt: "desc",
        },
        include: {
            user: true,
            Owner: true,
        },
    })

    // State with proper types


    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Морьдын жагсаалт</h1>
                <Button asChild>
                    <Link href="/horses/register">
                        <Plus className="mr-2 h-4 w-4" />
                        Морь бүртгэх
                    </Link>
                </Button>
            </div>

            {horses.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Одоогоор бүртгэлтэй морь байхгүй байна</p>
                    <Button asChild>
                        <Link href="/horses/register">
                            <Plus className="mr-2 h-4 w-4" />
                            Морь бүртгэх
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {horses.map((horse) => (
                        <Link key={horse.id} href={`/horses/${horse.id}`}>
                            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                                <div className="aspect-video relative">
                                    {horse.imageUrl ? (
                                        <img
                                            src={horse.imageUrl}
                                            alt={horse.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <p className="text-gray-400">Зураггүй</p>
                                        </div>
                                    )}
                                </div>
                                <CardContent className="pt-4">
                                    <h2 className="text-xl font-bold mb-2">{horse.name}</h2>
                                    <p className="text-gray-500">
                                        {horse.age && horse.gender
                                            ? `${horse.age} настай ${horse.gender}`
                                            : "Мэдээлэл байхгүй"}
                                    </p>
                                    {horse.status && (
                                        <p className="text-sm mt-1">
                                            Төлөв: <span className="font-medium">{horse.status}</span>
                                        </p>
                                    )}
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                    <div className="flex justify-between w-full text-sm text-gray-500">
                                        <span>{horse.province || "Тодорхойгүй"}</span>
                                        <span>{new Date(horse.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
} 