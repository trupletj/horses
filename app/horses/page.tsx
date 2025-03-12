// app/horses/page.tsx
import Link from 'next/link'
import { getHorses } from '@/app/actions/horse'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default async function HorsesPage() {
    const { horses, error } = await getHorses()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Registered Horses</h1>
                <Button asChild>
                    <Link href="/register">
                        Register New Horse
                    </Link>
                </Button>
            </div>

            {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            ) : horses && horses.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Breed</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Registered</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {horses.map((horse) => (
                            <TableRow key={horse.id}>
                                <TableCell className="font-medium">{horse.name}</TableCell>
                                <TableCell>{horse.breed}</TableCell>
                                <TableCell>{horse.color}</TableCell>
                                <TableCell>{horse.age} years</TableCell>
                                <TableCell>{new Date(horse.registeredAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="rounded-lg border p-6 text-center">
                    <p className="text-muted-foreground">No horses registered yet.</p>
                    <Button asChild className="mt-4">
                        <Link href="/register">
                            Register Your First Horse
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}