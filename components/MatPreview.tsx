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
  const rightMargin = formatted.right * scale
  const bottomMargin = formatted.bottom * scale
  const leftMargin = formatted.left * scale

  const t = useTranslations('Preview')
  const tResults = useTranslations('Results')

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-stone)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div className="flex flex-col items-center space-y-5">
        <h3
          className="text-lg font-bold flex items-center gap-2"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
        >
          <Eye size={22} weight="duotone" style={{ color: 'var(--color-amber)' }} />
          {t('title')}
        </h3>

        <div
          className="relative animate-scale-in"
          style={{
            width: `${frameWidth + 40}px`,
            height: `${frameHeight + 40}px`,
            minWidth: '200px',
            minHeight: '200px',
          }}
        >
          {/* Frame (dark border) */}
          <div
            className="absolute shadow-lg"
            style={{
              width: `${frameWidth + 16}px`,
              height: `${frameHeight + 16}px`,
              top: '12px',
              left: '12px',
              backgroundColor: 'var(--color-charcoal)',
              border: '2px solid var(--color-ink)',
              borderRadius: '2px',
            }}
          />

          {/* Mat (white area) */}
          <div
            className="absolute"
            style={{
              width: `${frameWidth}px`,
              height: `${frameHeight}px`,
              top: '20px',
              left: '20px',
              backgroundColor: 'var(--color-cream)',
              border: '2px solid var(--color-stone-dark)',
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
                backgroundColor: 'var(--color-cream-dark)',
                border: '2px solid var(--color-charcoal-light)',
              }}
            >
              <div className="text-center p-2">
                <Image
                  size={24}
                  weight="duotone"
                  style={{ color: 'var(--color-charcoal-muted)', margin: '0 auto 4px' }}
                />
                <div className="text-xs font-medium" style={{ color: 'var(--color-charcoal)' }}>
                  {t('photo')}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-charcoal-muted)' }}>
                  {result.photo.width} × {result.photo.height} {tResults('mm')}
                </div>
              </div>
            </div>

            {/* Annotations */}
            {[
              { value: formatted.top, className: 'absolute -top-6 left-1/2 -translate-x-1/2' },
              { value: formatted.right, className: 'absolute top-1/2 -right-10 -translate-y-1/2 rotate-90 origin-center' },
              { value: formatted.bottom, className: 'absolute -bottom-6 left-1/2 -translate-x-1/2' },
              { value: formatted.left, className: 'absolute top-1/2 -left-10 -translate-y-1/2 -rotate-90 origin-center' },
            ].map((ann, i) => (
              <div
                key={i}
                className={`${ann.className} text-xs font-bold px-2 py-0.5 rounded`}
                style={{
                  backgroundColor: 'var(--color-amber)',
                  color: 'var(--color-white)',
                  whiteSpace: 'nowrap',
                }}
              >
                {ann.value} {tResults('mm')}
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-center" style={{ color: 'var(--color-charcoal-muted)' }}>
          {t('frame', { width: result.frame.width, height: result.frame.height })}
          <br />
          {t('scale', { percentage: Math.round(scale * 100) })}
        </div>
      </div>
    </div>
  )
}
