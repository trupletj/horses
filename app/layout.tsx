// app/layout.tsx
'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import { Providers } from './providers'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [mounted, setMounted] = useState(false)

  // This ensures we only render after the component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add debug logs
  useEffect(() => {
    console.log("Session status:", status)
    console.log("Session data:", session)
  }, [session, status])

  if (!mounted) return null
  if (isHomePage || !session) return null

  return (
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

          {/* Navigation Links - Only show for admin */}
          {session.user?.role === 'admin' && (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/horses" className="text-gray-700 hover:text-blue-600">
                Морьдын жагсаалт
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600">
                Морь бүртгэх
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Хянах самбар
              </Link>
            </div>
          )}

          {/* User menu */}
          <div className="flex items-center space-x-6">
            <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}
              <span>{session.user?.name || "Хэрэглэгч"}</span>
              {session.user?.role === 'admin' && (
                <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Админ
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-red-600"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 