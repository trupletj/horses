// app/register/page.tsx
import HorseForm from '@/app/components/horse-form'

export default function RegisterPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                Морь Бүртгэх
            </h1>
            <HorseForm />
        </div>
    )
}