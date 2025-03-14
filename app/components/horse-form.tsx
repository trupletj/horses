'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { Loader2, Upload } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
// Horse type definition
type HorseFormData = {
    name: string
    chipId: string
    description: string
    number: string
    origin: string
    percentage: string
    ancestry: string
    brand: string
    age: string
    gender: string
    status: string
    province: string
    district: string
    originalOwner: string
    currentOwner: string
    acquisitionYear: string
    listedYear: string
    image: File | null
}

export default function HorseForm() {
    const { data: session } = useSession()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const [formData, setFormData] = useState<HorseFormData>({
        name: "",
        chipId: "",
        description: "",
        number: "",
        origin: "",
        percentage: "",
        ancestry: "",
        brand: "",
        age: "",
        gender: "Морь", // Default value
        status: "Амьд", // Default value
        province: "",
        district: "",
        originalOwner: "",
        currentOwner: "",
        acquisitionYear: "",
        listedYear: "",
        image: null
    })

    // Handle text input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Handle select input changes
    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null

        if (file) {
            setFormData(prev => ({ ...prev, image: file }))

            // Create preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setFormData(prev => ({ ...prev, image: null }))
            setPreviewUrl(null)
        }
    }

    // Trigger file input click
    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!session?.user) {
            toast.error("Та эхлээд нэвтрэх шаардлагатай")
            return
        }

        setIsSubmitting(true)

        try {
            // Create FormData for multipart/form-data submission (for image upload)
            const submitData = new FormData()

            // Add all text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'image' && value !== null) {
                    submitData.append(key, value as string)
                }
            })

            // Add image if exists
            if (formData.image) {
                submitData.append('image', formData.image)
            }

            // Submit to API
            const response = await fetch('/api/horses', {
                method: 'POST',
                body: submitData,
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Морь бүртгэхэд алдаа гарлаа')
            }

            const result = await response.json()

            toast.success("Морь амжилттай бүртгэгдлээ")

            // Redirect to the newly created horse's page
            router.push(`/horses/${result.id}`)
            router.refresh()

        } catch (error) {
            console.error('Error submitting horse:', error)
            toast.error(error instanceof Error ? error.message : "Морь бүртгэхэд алдаа гарлаа")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Морь бүртгэх</CardTitle>
                <CardDescription>
                    Шинэ морины мэдээллийг бүртгэнэ үү
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {/* Image Upload Section */}
                    <div className="space-y-2">
                        <Label htmlFor="image">Зураг</Label>
                        <div
                            onClick={handleImageClick}
                            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            {previewUrl ? (
                                <div className="relative w-full aspect-video">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="mx-auto max-h-64 rounded-md object-contain"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Зураг солихын тулд дарна уу</p>
                                </div>
                            ) : (
                                <div className="py-8 flex flex-col items-center">
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm font-medium">Зураг оруулахын тулд дарна уу</p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP зэрэг форматууд дэмжигдэнэ</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Нэр</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="chipId">Чип</Label>
                            <Input
                                id="chipId"
                                name="chipId"
                                value={formData.chipId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Тайлбар</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">Дугаар</Label>
                            <Input
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="origin">Нутаг</Label>
                            <Input
                                id="origin"
                                name="origin"
                                value={formData.origin}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="percentage">Хувь</Label>
                            <Input
                                id="percentage"
                                name="percentage"
                                value={formData.percentage}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ancestry">Угшил</Label>
                            <Input
                                id="ancestry"
                                name="ancestry"
                                value={formData.ancestry}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand">Тамга</Label>
                            <Input
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Age and Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="age">Нас</Label>
                            <Select
                                name="age"
                                value={formData.age}
                                onValueChange={(value: string) => handleSelectChange('age', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Насыг сонгоно уу" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((age) => (
                                        <SelectItem key={age} value={age.toString()}>
                                            {age}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender">Хүйс</Label>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onValueChange={(value: string) => handleSelectChange('gender', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Хүйсийг сонгоно уу" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Азарга">Азарга</SelectItem>
                                    <SelectItem value="Морь">Морь</SelectItem>
                                    <SelectItem value="Гүү">Гүү</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="status">Төлөв</Label>
                        <Select
                            name="status"
                            value={formData.status}
                            onValueChange={(value: string) => handleSelectChange('status', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Төлөвийг сонгоно уу" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Амьд">Амьд</SelectItem>
                                <SelectItem value="Зарсан">Зарсан</SelectItem>
                                <SelectItem value="Бэлгэлсэн">Бэлгэлсэн</SelectItem>
                                <SelectItem value="Тогоо тосолсон">Тогоо тосолсон</SelectItem>
                                <SelectItem value="Маханд өгсөн">Маханд өгсөн</SelectItem>
                                <SelectItem value="Алдсан">Алдсан</SelectItem>
                                <SelectItem value="Үхсэн">Үхсэн</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="province">Аймаг</Label>
                            <Input
                                id="province"
                                name="province"
                                value={formData.province}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="district">Сум</Label>
                            <Input
                                id="district"
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Ownership */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="originalOwner">Унаган эзэн</Label>
                            <Input
                                id="originalOwner"
                                name="originalOwner"
                                value={formData.originalOwner}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currentOwner">Эзэн</Label>
                            <Input
                                id="currentOwner"
                                name="currentOwner"
                                value={formData.currentOwner}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Years */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="acquisitionYear">Авсан он</Label>
                            <Input
                                id="acquisitionYear"
                                name="acquisitionYear"
                                value={formData.acquisitionYear}
                                onChange={handleInputChange}
                                type="number"
                                min="1900"
                                max="2100"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="listedYear">Зарлагдсан он</Label>
                            <Input
                                id="listedYear"
                                name="listedYear"
                                value={formData.listedYear}
                                onChange={handleInputChange}
                                type="number"
                                min="1900"
                                max="2100"
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Буцах
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Бүртгэж байна...
                            </>
                        ) : (
                            "Бүртгэх"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
} 