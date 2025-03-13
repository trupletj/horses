'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HorseForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        number: '',
        location: '',
        ageCategory: '',
        age: 0,
        status: '',
        province: '',
        district: '',
        // Optional fields
        chipNumber: '',
        description: '',
        share: 0,
        brand: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = new FormData()

        // Add all required fields
        Object.entries(formData).forEach(([key, value]) => {
            form.append(key, value.toString())
        })

        try {
            const response = await fetch('/api/horses', {
                method: 'POST',
                body: form
            })
            if (!response.ok) throw new Error('Failed to create horse')
            router.push('/horses')
        } catch (error) {
            console.error('Error:', error)
            // Handle error (e.g., show error message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div>
                <label htmlFor="name" className="block mb-2 font-medium">Морины нэр</label>
                <Input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="color" className="block mb-2 font-medium">Зүс</label>
                <Input
                    type="text"
                    id="color"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="number" className="block mb-2 font-medium">Дугаар</label>
                <Input
                    type="text"
                    id="number"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="location" className="block mb-2 font-medium">Байршил</label>
                <Input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="ageCategory" className="block mb-2 font-medium">Насны ангилал</label>
                <Input
                    type="text"
                    id="ageCategory"
                    value={formData.ageCategory}
                    onChange={(e) => setFormData({ ...formData, ageCategory: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="age" className="block mb-2 font-medium">Нас</label>
                <Input
                    type="number"
                    id="age"
                    min="0"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                />
            </div>

            <div>
                <label htmlFor="status" className="block mb-2 font-medium">Төлөв</label>
                <Input
                    type="text"
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="province" className="block mb-2 font-medium">Аймаг</label>
                <Input
                    type="text"
                    id="province"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="district" className="block mb-2 font-medium">Сум</label>
                <Input
                    type="text"
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="chipNumber" className="block mb-2 font-medium">Чипийн дугаар</label>
                <Input
                    type="text"
                    id="chipNumber"
                    value={formData.chipNumber}
                    onChange={(e) => setFormData({ ...formData, chipNumber: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 font-medium">Тайлбар</label>
                <textarea
                    id="description"
                    className="w-full border rounded-md p-2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="share" className="block mb-2 font-medium">Хуваарь</label>
                <Input
                    type="number"
                    id="share"
                    value={formData.share}
                    onChange={(e) => setFormData({ ...formData, share: parseFloat(e.target.value) })}
                />
            </div>

            <div>
                <label htmlFor="brand" className="block mb-2 font-medium">Брэнд</label>
                <Input
                    type="text"
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
            </div>

            <Button type="submit" className="w-full">
                Бүртгэх
            </Button>
        </form>
    )
} 