'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { FrameCorners, Warning, ShieldCheck } from '@phosphor-icons/react'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Disclaimers — compact row */}
        <div
          className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-[13px] mb-4 sm:mb-5 p-3 sm:p-4 rounded-md"
          style={{ backgroundColor: 'var(--bg-sunken)' }}
        >
          <div>
            <div className="flex items-center gap-1.5 font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              <Warning size={14} weight="fill" style={{ color: 'var(--danger)' }} />
              {t('disclaimerTitle')}
            </div>
            <p style={{ color: 'var(--text-tertiary)' }}>
              {t.rich('disclaimerText', { b: (chunks) => <strong style={{ color: 'var(--text-secondary)' }}>{chunks}</strong> })}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              <ShieldCheck size={14} weight="fill" style={{ color: 'var(--success)' }} />
              {t('safetyTitle')}
            </div>
            <p style={{ color: 'var(--text-tertiary)' }}>
              {t.rich('safetyText', { b: (chunks) => <strong style={{ color: 'var(--text-secondary)' }}>{chunks}</strong> })}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
          <div className="flex items-center gap-1.5">
            <FrameCorners size={14} weight="bold" style={{ color: 'var(--accent)' }} />
            <span>{t('copyright', { year: new Date().getFullYear().toString() })}</span>
          </div>
          <span>{t('madeWith')}</span>
        </div>
      </div>
    </footer>
  )
}
