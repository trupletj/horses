'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError("Нууц үг таарахгүй байна")
            setIsLoading(false)
            return
        }

        try {
            // Register user via API
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Бүртгэл үүсгэхэд алдаа гарлаа")
            }

            // Sign in the user after successful registration
            await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            // Redirect to dashboard
            router.push('/horses')
        } catch (error) {
            console.error('Registration error:', error)
            setError(error instanceof Error ? error.message : "Бүртгэл үүсгэхэд алдаа гарлаа")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Шинэ хэрэглэгч бүртгүүлэх
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        эсвэл{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                            Нэвтрэх
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Нэр
                        </label>
                        <Input
                            id="name"
                            type="text"
                            required
                            className="mt-1"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Нууц үг давтах
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            required
                            className="mt-1"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isLoading}
                        >
                            {isLoading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
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
                            className="w-full flex items-center justify-center"
                            onClick={() => signIn('google', { callbackUrl: '/horses' })}
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                </g>
                            </svg>
                            Google-ээр бүртгүүлэх
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 