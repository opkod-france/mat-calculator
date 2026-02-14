'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  FrameCorners,
  Image,
  Scissors,
  Ruler,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
  Lightbulb,
  ArrowsOutSimple,
} from '@phosphor-icons/react'
import { initAnalytics, trackPageView } from '../../lib/analytics'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

const STYLE_DATA = [
  { key: 'proportional', icon: ArrowsOutSimple, color: 'var(--color-amber)' },
  { key: 'uniform', icon: FrameCorners, color: 'var(--color-sage)' },
  { key: 'talon', icon: Scissors, color: 'var(--color-rust)' },
  { key: 'panoramic', icon: Image, color: 'var(--color-amber-dark)' },
  { key: 'portrait', icon: Image, color: 'var(--color-charcoal-light)' },
]

const STEP_ICONS = [NumberCircleOne, NumberCircleTwo, NumberCircleThree, NumberCircleFour]
const STEP_COLORS = ['var(--color-amber)', 'var(--color-sage)', 'var(--color-rust)', 'var(--color-amber-dark)']

export default function HowToPage() {
  const t = useTranslations('HowTo')
  const tStyleNames = useTranslations('StyleNames')

  useEffect(() => {
    initAnalytics()
    trackPageView('How To')
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-cream)' }}>
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Hero */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
          >
            {t('title')}
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--color-charcoal-muted)' }}>
            {t('heroDescription')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5 mb-14">
          {[1, 2, 3, 4].map((num) => {
            const Icon = STEP_ICONS[num - 1]
            const color = STEP_COLORS[num - 1]
            return (
              <div
                key={num}
                className={`flex gap-5 rounded-2xl p-6 animate-fade-in-up delay-${num}`}
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-stone)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="shrink-0">
                  <Icon size={40} weight="duotone" style={{ color }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
                  >
                    {t(`step${num}Title` as any)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-charcoal-light)' }}>
                    {t(`step${num}Description` as any)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Styles Explanation */}
        <div className="mb-14 animate-fade-in-up delay-5">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
          >
            {t('stylesTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLE_DATA.map(({ key, icon: Icon, color }) => (
              <div
                key={key}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-stone)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={20} weight="duotone" style={{ color }} />
                  <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>
                    {tStyleNames(key)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-charcoal-muted)' }}>
                  {t(`${key}Desc` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="animate-fade-in-up">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
          >
            {t('tipsTitle')}
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-amber-glow)',
              border: '1px solid rgba(200, 134, 58, 0.2)',
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-start gap-3">
                  <Lightbulb
                    size={20}
                    weight="fill"
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--color-amber)' }}
                  />
                  <p className="text-sm" style={{ color: 'var(--color-charcoal)' }}>
                    {t(`tip${num}` as any)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
