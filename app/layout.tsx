import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import '@fontsource-variable/instrument-sans'
import '../styles/globals.css'

export const viewport: Viewport = {
  themeColor: '#2563EB',
}

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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%232563EB'/><rect x='7' y='7' width='18' height='18' rx='2' fill='white' fill-opacity='0.9'/><rect x='11' y='11' width='10' height='10' fill='%232563EB' fill-opacity='0.15'/></svg>",
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mat Calc',
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

// Static JSON-LD structured data (no user input — safe for inline script)
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mat Calculator',
  description: 'Professional mat calculator for photo framing.',
  url: 'https://mat-calculator.opkod.dev',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
    <html lang={locale}>
      <head>
        {/* JSON-LD: static structured data with no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {/* Service Worker registration — static string, no user input */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
