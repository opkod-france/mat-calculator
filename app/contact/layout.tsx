import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Mat Calculator team. Report bugs, suggest features, or ask questions about photo framing calculations.',
  alternates: {
    canonical: 'https://mat-calculator.opkod.dev/contact',
  },
  openGraph: {
    title: 'Contact — Mat Calculator',
    description: 'Have a question about the Mat Calculator? Reach out to our team.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
