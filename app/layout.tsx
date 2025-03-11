// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Horse Registration System',
  description: 'Simple app to register and list horses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-white font-bold">
              Horse Registry
            </Link>
            <div className="space-x-4">
              <Link href="/horses" className="text-white hover:text-gray-300">
                Horses List
              </Link>
              <Link href="/register" className="text-white hover:text-gray-300">
                Register Horse
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
} 