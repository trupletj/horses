'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'

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
    const [error, setError] = useState('')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedImage(file)

            // Create preview URL
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImagePreview(e.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            // Create FormData to handle file upload
            const formDataWithImage = new FormData()

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithImage.append(key, String(value))
            })

            // Add image if selected
            if (selectedImage) {
                formDataWithImage.append('image', selectedImage)
            }

            // Submit the form with image
            const response = await fetch('/api/horses', {
                method: 'POST',
                body: formDataWithImage,
                // Don't set Content-Type header when using FormData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create horse')
            }

            router.push('/horses')
            router.refresh()
        } catch (error) {
            console.error('Error:', error)
            setError(error instanceof Error ? error.message : 'An unexpected error occurred')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Image upload section */}
            <div className="mb-6">
                <label className="block mb-2 font-medium">Морины зураг</label>
                <div className="flex flex-col items-center">
                    {imagePreview ? (
                        <div className="relative w-full h-64 mb-4">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                            <p className="text-gray-500">Зураг сонгоогүй байна</p>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="hidden"
                    />

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Зураг сонгох
                    </Button>
                </div>
            </div>

            {/* Existing form fields */}
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