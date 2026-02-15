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
      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[13px] font-medium transition-colors duration-100"
      style={{
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-sunken)'
        e.currentTarget.style.color = 'var(--text-primary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = 'var(--text-secondary)'
      }}
      title={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <GlobeSimple size={14} />
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
