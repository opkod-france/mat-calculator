'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { GlobeSimple } from '@phosphor-icons/react'
import { analytics } from '../lib/analytics'

export default function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()

  const toggleLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`
    analytics.languageChanged(newLocale)
    router.refresh()
  }

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-cream-dark)',
        color: 'var(--color-charcoal-muted)',
        border: '1px solid var(--color-stone)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-stone-dark)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-stone)'
      }}
      title={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <GlobeSimple size={16} weight="bold" />
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
