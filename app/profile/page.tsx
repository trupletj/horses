'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { CircleUser, Calendar, Clock, House, Award, MapPin, Mail, Shield } from 'lucide-react'
import { useSession } from 'next-auth/react'

type UserProfile = {
    id: string;
    name: string;
    email: string;
    role: string;
    registeredAt: string;
    // Add other fields as needed
}

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState({
        horsesCount: 0,
        awardedHorses: 0,
        regions: 0
    })

    useEffect(() => {
        const fetchProfile = async () => {
            if (status === 'loading') return

            try {
                // In a real app, fetch the user profile from your API
                const mockProfile = {
                    id: '1',
                    name: 'Админ',
                    email: 'admin@example.com',
                    role: 'admin',
                    registeredAt: '2023-01-15'
                };

                setProfile(mockProfile)
            } catch (error) {
                console.error('Error fetching profile:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [status])

    useEffect(() => {
        const fetchStats = async () => {
            if (status === 'loading') return

            try {
                // In a real app, fetch stats from your API
                // For now, we'll use mock data
                setStats({
                    horsesCount: 12,
                    awardedHorses: 3,
                    regions: 4
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        fetchStats()
    }, [status])

    if (status === 'loading' || isLoading) {
        return <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    if (status === 'unauthenticated') {
        return <div className="text-center p-8">
            <p>Та нэвтрээгүй байна. <a href="/auth/login" className="text-blue-600">Нэвтрэх</a></p>
        </div>
    }

    const user = session?.user

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative -mt-20 md:-mt-24">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full p-1 shadow-lg">
                                    {user?.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name || "User"}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                                            <CircleUser className="w-12 h-12 md:w-14 md:h-14 text-blue-600" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{user?.name}</h2>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {user?.role === 'admin' ? 'Админ' : 'Хэрэглэгч'}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-blue-500" />
                            Үндсэн мэдээлэл
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <CircleUser className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-700">Нэр</p>
                                    <p className="text-gray-900">{profile?.name}</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Mail className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-700">И-мэйл</p>
                                    <p className="text-gray-900">{profile?.email}</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Shield className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-700">Эрх</p>
                                    <p className="text-gray-900">{profile?.role === 'admin' ? 'Админ' : 'Хэрэглэгч'}</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-700">Байршил</p>
                                    <p className="text-gray-900">Улаанбаатар, Монгол</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                            Цаг хугацаа
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Calendar className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-700">Бүртгүүлсэн огноо</p>
                                    <p className="text-gray-900">2023-01-15</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Clock className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-700">Хамгийн сүүлд нэвтэрсэн</p>
                                    <p className="text-gray-900">2024-05-15 14:30</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <House className="mr-2 h-5 w-5 text-blue-500" />
                        Статистик
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                                <House className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">12</h3>
                            <p className="text-gray-500">Бүртгэсэн морьд</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                                <Award className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">3</h3>
                            <p className="text-gray-500">Шагналтай морьд</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                                <MapPin className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">4</h3>
                            <p className="text-gray-500">Аймаг/Хот</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 