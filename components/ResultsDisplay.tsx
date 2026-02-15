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

const DIRS = [
  { key: 'top' as const, icon: ArrowUp },
  { key: 'right' as const, icon: ArrowRight },
  { key: 'bottom' as const, icon: ArrowDown },
  { key: 'left' as const, icon: ArrowLeft },
]

const REC_ICONS: Record<string, React.ReactNode> = {
  recSmallMargins: <WarningCircle size={15} weight="fill" />,
  recGenerousMargins: <Lightbulb size={15} weight="fill" />,
  recTalonApplied: <Scissors size={15} weight="fill" />,
  recBalancedMargins: <Scales size={15} weight="fill" />,
  recOptimalDimensions: <CheckCircle size={15} weight="fill" />,
}

export default function ResultsDisplay({ result, calculator }: ResultsDisplayProps) {
  const formatted = calculator.formatDimensions(result)
  const t = useTranslations('Results')
  const tStyleNames = useTranslations('StyleNames')
  const tCalc = useTranslations('Calculator')

  return (
    <div
      className="rounded-lg p-5 sm:p-6"
      style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <h2 className="text-[16px] font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Ruler size={18} weight="bold" style={{ color: 'var(--accent)' }} />
        {t('title')}
      </h2>

      {/* Dimensions — 4-col grid with large numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {DIRS.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="rounded-md p-3 text-center"
            style={{ backgroundColor: 'var(--bg-sunken)' }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon size={13} style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                {t(key)}
              </span>
            </div>
            <div className="text-[22px] font-semibold tabular-nums" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {formatted[key]}
            </div>
            <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{t('mm')}</div>
          </div>
        ))}
      </div>

      {/* Style badge */}
      <div
        className="flex items-center justify-between rounded-md px-4 py-2.5 mb-4"
        style={{ backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent-medium)' }}
      >
        <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
          {t('styleApplied')}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: 'var(--accent)' }}>
          <Scissors size={14} weight="bold" />
          {tStyleNames(result.style)}
        </span>
      </div>

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <div>
          <h3 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('recommendations')}
          </h3>
          <div className="space-y-1.5">
            {result.recommendations.map((recKey: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-[13px]"
                style={{ backgroundColor: 'var(--success-soft)', color: 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--success)' }}>
                  {REC_ICONS[recKey] || <ArrowsOutSimple size={15} weight="fill" />}
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
