// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/providers/auth-provider'
import { ReduxProvider } from '@/providers/redux-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Workplace Analytics',
  description: 'Analytics dashboard for workplace data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  )
}