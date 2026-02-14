'use client'

import React from 'react'
import {
  Ruler,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Scissors,
  Lightbulb,
  WarningCircle,
  CheckCircle,
  Scales,
  ArrowsOutSimple,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { MatCalculator } from '../lib/calculator'

interface ResultsDisplayProps {
  result: any
  calculator: MatCalculator
}

const DIRECTION_META: Record<string, { icon: React.ReactNode; colorVar: string }> = {
  top: { icon: <ArrowUp size={16} weight="bold" />, colorVar: 'var(--color-amber)' },
  right: { icon: <ArrowRight size={16} weight="bold" />, colorVar: 'var(--color-sage)' },
  bottom: { icon: <ArrowDown size={16} weight="bold" />, colorVar: 'var(--color-rust)' },
  left: { icon: <ArrowLeft size={16} weight="bold" />, colorVar: 'var(--color-amber-dark)' },
}

const REC_ICONS: Record<string, React.ReactNode> = {
  recSmallMargins: <WarningCircle size={16} weight="fill" />,
  recGenerousMargins: <Lightbulb size={16} weight="fill" />,
  recTalonApplied: <Scissors size={16} weight="fill" />,
  recBalancedMargins: <Scales size={16} weight="fill" />,
  recOptimalDimensions: <CheckCircle size={16} weight="fill" />,
}

export default function ResultsDisplay({ result, calculator }: ResultsDisplayProps) {
  const formatted = calculator.formatDimensions(result)
  const t = useTranslations('Results')
  const tStyleNames = useTranslations('StyleNames')
  const tCalc = useTranslations('Calculator')

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-stone)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <h2
        className="text-xl font-bold mb-6 flex items-center gap-2"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
      >
        <Ruler size={24} weight="duotone" style={{ color: 'var(--color-amber)' }} />
        {t('title')}
      </h2>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(['top', 'right', 'bottom', 'left'] as const).map((dir) => {
          const meta = DIRECTION_META[dir]
          return (
            <div
              key={dir}
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-stone)' }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span style={{ color: meta.colorVar }}>{meta.icon}</span>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-charcoal-muted)' }}>
                  {t(dir)}
                </span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
                {formatted[dir]}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-charcoal-muted)' }}>{t('mm')}</div>
            </div>
          )
        })}
      </div>

      {/* Style Applied */}
      <div
        className="flex items-center justify-between rounded-xl px-5 py-3.5 mb-6"
        style={{ backgroundColor: 'var(--color-amber-glow)', border: '1px solid rgba(200, 134, 58, 0.2)' }}
      >
        <span className="text-sm font-medium" style={{ color: 'var(--color-charcoal-light)' }}>
          {t('styleApplied')}
        </span>
        <span className="flex items-center gap-2 font-semibold" style={{ color: 'var(--color-amber-dark)' }}>
          <Scissors size={16} weight="bold" />
          {tStyleNames(result.style)}
        </span>
      </div>

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-ink)' }}>
            {t('recommendations')}
          </h3>
          <div className="space-y-2">
            {result.recommendations.map((recKey: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--color-sage-light)',
                  border: '1px solid rgba(122, 139, 111, 0.2)',
                  color: 'var(--color-charcoal)',
                }}
              >
                <span style={{ color: 'var(--color-sage)' }}>
                  {REC_ICONS[recKey] || <ArrowsOutSimple size={16} weight="fill" />}
                </span>
                {tCalc(recKey)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
