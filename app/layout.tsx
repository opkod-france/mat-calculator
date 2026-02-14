import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import '../styles/globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mat-calculator.opkod.dev'),
  title: {
    default: 'Mat Calculator | Professional Photo Framing Tool',
    template: '%s | Mat Calculator',
  },
  description: 'Free professional mat calculator for photo framing. Calculate optimal mat dimensions with 5 styles: proportional, uniform, talon, panoramic, portrait. Used by framers worldwide.',
  keywords: ['mat calculator', 'photo framing', 'matting', 'framing calculator', 'picture framing', 'marie-louise', 'calculateur marie-louise', 'mat board calculator', 'photo mat dimensions', 'frame mat cutting'],
  authors: [{ name: 'Mat Calculator' }],
  creator: 'Mat Calculator',
  publisher: 'Mat Calculator',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='2' y='2' width='28' height='28' rx='4' fill='%23C8863A'/><rect x='8' y='8' width='16' height='16' rx='1' fill='%23FAF7F2'/><rect x='11' y='11' width='10' height='10' fill='%23E8E0D4'/></svg>",
  },
  openGraph: {
    type: 'website',
    title: 'Mat Calculator — Professional Photo Framing Tool',
    description: 'Calculate optimal mat dimensions for photo framing with professional accuracy. 5 cutting styles, real-time preview, free to use.',
    url: 'https://mat-calculator.opkod.dev',
    siteName: 'Mat Calculator',
    locale: 'en_US',
    alternateLocale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mat Calculator — Professional Photo Framing Tool',
    description: 'Calculate optimal mat dimensions for photo framing. Free professional tool with 5 styles.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mat-calculator.opkod.dev',
  },
}

// Static JSON-LD structured data (no user input - safe for inline script)
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mat Calculator',
  description: 'Professional mat calculator for photo framing. Calculate optimal mat dimensions with 5 different styles.',
  url: 'https://mat-calculator.opkod.dev',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: ['Proportional mat calculation', 'Talon style calculation', 'Panoramic mat calculation', 'Portrait mat calculation', 'Real-time visual preview', 'Bilingual (English/French)'],
  inLanguage: ['en', 'fr'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        {/* JSON-LD: static structured data with no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
