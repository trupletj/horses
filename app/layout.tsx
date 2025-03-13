// app/layout.tsx
'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {!isHomePage && (
          <nav className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
              <div className="flex justify-between items-center">
                {/* Logo/Home link */}
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2"
                >
                  <span className="bg-blue-600 text-white p-2 rounded-lg">
                    MBS
                  </span>
                  <span className="font-semibold text-xl text-gray-900">
                    Морины бүртгэлийн систем
                  </span>
                </Link>

                {/* User menu */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <CircleUser className="h-5 w-5" />
                    <span>Админ</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        )}
        <main>{children}</main>
      </body>
    </html>
  )
} 