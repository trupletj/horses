// app/register/page.tsx
import HorseForm from '@/components/horse-form'

export default function RegisterPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                Horse Registration System
            </h1>
            <HorseForm />
        </div>
    )
}