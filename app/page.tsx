// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Horse Registration System</h1>
      <p className="text-xl mb-8">
        A simple system to register and track horses
      </p>

      <div className="space-x-4">
        <Link
          href="/horses"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          View Horses
        </Link>
        <Link
          href="/register"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          Register New Horse
        </Link>
      </div>
    </div>
  )
}