import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Use',
  description: 'Step-by-step guide to using the Mat Calculator for photo framing. Learn about proportional, talon, panoramic and portrait mat cutting styles.',
  alternates: {
    canonical: 'https://mat-calculator.opkod.dev/how-to',
  },
  openGraph: {
    title: 'How to Use the Mat Calculator',
    description: 'Learn to calculate perfect mat dimensions for photo framing with our step-by-step guide.',
  },
}

export default function HowToLayout({ children }: { children: React.ReactNode }) {
  return children
}
