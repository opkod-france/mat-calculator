'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  FrameCorners,
  Image,
  Scissors,
  Ruler,
  Lightbulb,
  ArrowsOutSimple,
} from '@phosphor-icons/react'
import { initAnalytics, trackPageView } from '../../lib/analytics'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

const STYLE_DATA = [
  { key: 'proportional', icon: ArrowsOutSimple },
  { key: 'uniform', icon: FrameCorners },
  { key: 'talon', icon: Scissors },
  { key: 'panoramic', icon: Image },
  { key: 'portrait', icon: Image },
]

const STEP_ICONS = [FrameCorners, Image, Scissors, Ruler]

export default function HowToPage() {
  const t = useTranslations('HowTo')
  const tStyleNames = useTranslations('StyleNames')

  useEffect(() => {
    initAnalytics()
    trackPageView('How To')
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
      <Navigation />

      <main className="flex-1 max-w-3xl mx-auto px-5 sm:px-6 py-8 w-full">
        {/* Header */}
        <div className="mb-8 animate-in">
          <h1 className="text-[28px] font-semibold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            {t('title')}
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--text-tertiary)' }}>
            {t('heroDescription')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-10">
          {[1, 2, 3, 4].map((num) => {
            const Icon = STEP_ICONS[num - 1]
            return (
              <div
                key={num}
                className={`flex gap-4 rounded-lg p-5 animate-in delay-${num}`}
                style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-[14px] font-semibold"
                  style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  {num}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    {t(`step${num}Title` as any)}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t(`step${num}Description` as any)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Styles */}
        <div className="mb-10 animate-in delay-5">
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('stylesTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {STYLE_DATA.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-lg p-4"
                style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={16} weight="bold" style={{ color: 'var(--accent)' }} />
                  <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {tStyleNames(key)}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  {t(`${key}Desc` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="animate-in">
          <h2 className="text-[20px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('tipsTitle')}
          </h2>
          <div
            className="rounded-lg p-5 space-y-3"
            style={{ backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent-medium)' }}
          >
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-start gap-2.5">
                <Lightbulb size={16} weight="fill" className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                  {t(`tip${num}` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
