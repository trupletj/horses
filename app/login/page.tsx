"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Login logic will be added later
        router.push('/home')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Системд нэвтрэх
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            эсвэл{" "}
                            <Link href="/" className="text-blue-600 hover:text-blue-500">
                                буцах
                            </Link>
                        </p>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                И-мэйл
                            </label>
                            <Input
                                id="email"
                                type="email"
                                required
                                className="mt-1"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Нууц үг
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                className="mt-1"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Намайг сана
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500">
                                    Нууц үгээ мартсан?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Нэвтрэх
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Эсвэл
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/register" className="w-full">
                                    Бүртгүүлэх
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 