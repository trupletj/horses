import { Metadata } from "next"
import HorseForm from "@/app/components/horse-form"

export const metadata: Metadata = {
    title: "Морь бүртгэх",
    description: "Шинэ морь бүртгэх хуудас",
}

export default function RegisterHorsePage() {
    return (
        <div className="container mx-auto py-10">
            <HorseForm />
        </div>
    )
} 