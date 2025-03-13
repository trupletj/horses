import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    // Define public paths that don't require authentication
    const publicPaths = ['/', '/auth/login', '/auth/register']
    const isPublicPath = publicPaths.includes(path)

    // Get the session token
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // Redirect logic
    if (!token && !isPublicPath) {
        // Redirect to login if trying to access a protected route without being logged in
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (token && (path === '/auth/login' || path === '/auth/register')) {
        // Redirect to dashboard if already logged in and trying to access login/register
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 