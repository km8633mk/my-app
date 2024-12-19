import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Friendspace',
  description: 'Verbinde dich mit deinen Freunden und plane gemeinsame Aktivitäten',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

