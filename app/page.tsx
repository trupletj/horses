// app/page.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Hero Section */}
          <div className="relative w-full max-w-2xl mb-10">
            <Image
              src="/horse-hero.jpg" // Энд таны морины зургийг хийнэ
              alt="Mongolian Horse"
              width={800}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="max-w-3xl mb-10">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              Морины Бүртгэлийн Систем
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Морьдын бүртгэл, хяналт, удирдлагын систем
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login">
                Нэвтрэх
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/register-user">
                Бүртгүүлэх
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}