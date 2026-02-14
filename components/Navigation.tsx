'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FrameCorners, Question, EnvelopeSimple, List, X } from '@phosphor-icons/react'
import LanguageToggle from './LanguageToggle'

const NAV_ITEMS = [
  { href: '/', labelKey: 'calculator' as const, icon: FrameCorners },
  { href: '/how-to', labelKey: 'howTo' as const, icon: Question },
  { href: '/contact', labelKey: 'contact' as const, icon: EnvelopeSimple },
]

export default function Navigation() {
  const pathname = usePathname()
  const t = useTranslations('Nav')
  const tHeader = useTranslations('Header')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--color-cream)',
        borderColor: 'var(--color-stone)',
      }}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: 'var(--color-amber)', color: 'var(--color-white)' }}
            >
              <FrameCorners size={20} weight="bold" />
            </div>
            <div className="hidden sm:block">
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
              >
                {tHeader('title')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--color-amber-glow)' : 'transparent',
                    color: isActive ? 'var(--color-amber-dark)' : 'var(--color-charcoal-muted)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-cream-dark)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                  {t(labelKey)}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--color-charcoal-muted)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div
            className="md:hidden pb-4 animate-slide-down"
            style={{ borderTop: '1px solid var(--color-stone)' }}
          >
            <div className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--color-amber-glow)' : 'transparent',
                      color: isActive ? 'var(--color-amber-dark)' : 'var(--color-charcoal)',
                    }}
                  >
                    <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                    {t(labelKey)}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
