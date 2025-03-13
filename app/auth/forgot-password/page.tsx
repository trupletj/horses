'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // In a real app, you would call an API to send a password reset email
            // For now, we'll just simulate success
            await new Promise(resolve => setTimeout(resolve, 1000))
            setIsSubmitted(true)
        } catch (error) {
            setError("Нууц үг сэргээх хүсэлт илгээхэд алдаа гарлаа")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Нууц үг сэргээх
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                            Нэвтрэх хуудас руу буцах
                        </Link>
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {isSubmitted ? (
                    <div className="text-center">
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                            Нууц үг сэргээх зааврыг таны и-мэйл хаяг руу илгээлээ.
                        </div>
                        <p className="text-gray-600 mb-4">
                            Хэрэв та и-мэйл хүлээж аваагүй бол спам хавтсаа шалгана уу.
                        </p>
                        <Button asChild variant="outline">
                            <Link href="/auth/login">
                                Нэвтрэх хуудас руу буцах
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                И-мэйл
                            </label>
                            <p className="text-sm text-gray-500 mb-2">
                                Бүртгэлтэй и-мэйл хаягаа оруулна уу. Бид танд нууц үг сэргээх холбоос илгээх болно.
                            </p>
                            <Input
                                id="email"
                                type="email"
                                required
                                className="mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Илгээж байна..." : "Нууц үг сэргээх хүсэлт илгээх"}
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
} 