'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Eye, Image } from '@phosphor-icons/react'
import { MatCalculator } from '../lib/calculator'

interface MatPreviewProps {
  result: any
  calculator: MatCalculator
}

export default function MatPreview({ result, calculator }: MatPreviewProps) {
  const scale = 0.8
  const frameWidth = result.frame.width * scale
  const frameHeight = result.frame.height * scale
  const photoWidth = result.photo.width * scale
  const photoHeight = result.photo.height * scale

  const formatted = calculator.formatDimensions(result)
  const topMargin = formatted.top * scale
  const leftMargin = formatted.left * scale

  const t = useTranslations('Preview')
  const tResults = useTranslations('Results')

  return (
    <div
      className="rounded-lg p-5 sm:p-6"
      style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-[16px] font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Eye size={18} weight="bold" style={{ color: 'var(--accent)' }} />
          {t('title')}
        </h3>

        <div
          className="relative animate-scale"
          style={{
            width: `${frameWidth + 40}px`,
            height: `${frameHeight + 40}px`,
            minWidth: '200px',
            minHeight: '200px',
          }}
        >
          {/* Frame */}
          <div
            className="absolute"
            style={{
              width: `${frameWidth + 16}px`,
              height: `${frameHeight + 16}px`,
              top: '12px',
              left: '12px',
              backgroundColor: 'var(--bg-inverse)',
              borderRadius: '2px',
            }}
          />

          {/* Mat */}
          <div
            className="absolute"
            style={{
              width: `${frameWidth}px`,
              height: `${frameHeight}px`,
              top: '20px',
              left: '20px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Photo */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: `${photoWidth}px`,
                height: `${photoHeight}px`,
                top: `${topMargin}px`,
                left: `${leftMargin}px`,
                backgroundColor: 'var(--bg-sunken)',
                border: '1px solid var(--border-strong)',
              }}
            >
              <div className="text-center p-1">
                <Image size={20} weight="regular" style={{ color: 'var(--text-tertiary)', margin: '0 auto 2px' }} />
                <div className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {result.photo.width}×{result.photo.height}
                </div>
              </div>
            </div>

            {/* Annotations */}
            {[
              { value: formatted.top, pos: 'absolute -top-5 left-1/2 -translate-x-1/2' },
              { value: formatted.right, pos: 'absolute top-1/2 -right-9 -translate-y-1/2 rotate-90 origin-center' },
              { value: formatted.bottom, pos: 'absolute -bottom-5 left-1/2 -translate-x-1/2' },
              { value: formatted.left, pos: 'absolute top-1/2 -left-9 -translate-y-1/2 -rotate-90 origin-center' },
            ].map((ann, i) => (
              <div
                key={i}
                className={`${ann.pos} text-[10px] font-semibold px-1.5 py-0.5 rounded-sm tabular-nums`}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                {ann.value}
              </div>
            ))}
          </div>
        </div>

        <div className="text-[12px] text-center" style={{ color: 'var(--text-tertiary)' }}>
          {t('frame', { width: result.frame.width, height: result.frame.height })} &middot; {t('scale', { percentage: Math.round(scale * 100) })}
        </div>
      </div>
    </div>
  )
}
