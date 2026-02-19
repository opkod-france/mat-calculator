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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <nav className="max-w-5xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <FrameCorners size={16} weight="bold" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Mat Calculator
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-100"
                  style={{
                    backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-sunken)'
                      e.currentTarget.style.color = 'var(--text-primary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }
                  }}
                >
                  <Icon size={15} weight={isActive ? 'fill' : 'regular'} />
                  {t(labelKey)}
                </Link>
              )
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-3 animate-in" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex flex-col gap-0.5 pt-2">
              {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
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
