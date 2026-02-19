import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mat Calculator — Professional Photo Framing Tool',
    short_name: 'Mat Calc',
    description: 'Calculate optimal mat dimensions for photo framing with professional accuracy. 5 cutting styles, real-time preview.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#2563EB',
    orientation: 'any',
    categories: ['utilities', 'productivity'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
