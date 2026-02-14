'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { FrameCorners, Warning, ShieldCheck } from '@phosphor-icons/react'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer
      className="mt-auto border-t"
      style={{ backgroundColor: 'var(--color-white)', borderColor: 'var(--color-stone)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FrameCorners size={22} weight="fill" style={{ color: 'var(--color-amber)' }} />
              <span
                className="text-lg font-semibold"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
              >
                {t('productName')}
              </span>
            </div>
            <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--color-charcoal-muted)' }}>
              {t('productDescription')}
            </p>
          </div>

          {/* Disclaimers */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: 'var(--color-cream-dark)', border: '1px solid var(--color-stone)' }}
          >
            <div className="grid md:grid-cols-2 gap-5 text-sm">
              <div>
                <h4 className="font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-amber-dark)' }}>
                  <Warning size={18} weight="fill" />
                  {t('disclaimerTitle')}
                </h4>
                <p style={{ color: 'var(--color-charcoal-light)' }}>
                  {t.rich('disclaimerText', {
                    b: (chunks) => <strong>{chunks}</strong>
                  })}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-sage)' }}>
                  <ShieldCheck size={18} weight="fill" />
                  {t('safetyTitle')}
                </h4>
                <p style={{ color: 'var(--color-charcoal-light)' }}>
                  {t.rich('safetyText', {
                    b: (chunks) => <strong>{chunks}</strong>
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="flex flex-col sm:flex-row justify-between items-center text-xs pt-4"
            style={{ borderTop: '1px solid var(--color-stone)', color: 'var(--color-charcoal-muted)' }}
          >
            <span>{t('copyright', { year: new Date().getFullYear().toString() })}</span>
            <span className="mt-1 sm:mt-0">{t('madeWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
