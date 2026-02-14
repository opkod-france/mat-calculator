import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mat Calculator | Professional Photo Framing Tool',
  description: 'Professional mat calculator for photo framing. Calculate optimal mat dimensions with 5 different styles: proportional, uniform, talon, panoramic, portrait.',
  keywords: ['mat calculator', 'photo framing', 'matting', 'framing calculator', 'picture framing'],
  authors: [{ name: 'Mat Calculator Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖼️</text></svg>"
  },
  openGraph: {
    type: 'website',
    title: 'Mat Calculator - Professional Photo Framing Tool',
    description: 'Calculate optimal mat dimensions for photo framing with professional accuracy',
    url: 'https://mat-calculator.opkod.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mat Calculator - Professional Photo Framing Tool',
    description: 'Calculate optimal mat dimensions for photo framing with professional accuracy',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

