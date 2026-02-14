'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Calculator,
  ArrowCounterClockwise,
  Image,
  FrameCorners,
  Stack,
  WarningCircle,
  Sliders,
  Lightning,
  CaretDown,
  Scissors,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { MatCalculator } from '../lib/calculator'
import { initAnalytics, trackPageView, analytics } from '../lib/analytics'
import MatPreview from './MatPreview'
import ResultsDisplay from './ResultsDisplay'
import Navigation from './Navigation'
import Footer from './Footer'

interface Preset {
  frame: { width: number; height: number }
  photo: { width: number; height: number }
}

const PRESETS: Record<string, Preset> = {
  'photo-10x15': { frame: { width: 200, height: 250 }, photo: { width: 100, height: 150 } },
  'photo-13x18': { frame: { width: 230, height: 280 }, photo: { width: 130, height: 180 } },
  'photo-20x30': { frame: { width: 300, height: 400 }, photo: { width: 200, height: 300 } },
  'a4-frame': { frame: { width: 210, height: 297 }, photo: { width: 150, height: 200 } },
}

const STYLE_KEYS = ['proportional', 'uniform', 'talon', 'panoramic', 'portrait'] as const

const STYLE_ICONS: Record<string, React.ReactNode> = {
  proportional: <Stack size={16} weight="bold" />,
  uniform: <FrameCorners size={16} weight="bold" />,
  talon: <Scissors size={16} weight="bold" />,
  panoramic: <Image size={16} weight="bold" />,
  portrait: <Image size={16} weight="bold" style={{ transform: 'rotate(90deg)' }} />,
}

export default function MatCalculatorComponent() {
  const [calculator] = useState(() => new MatCalculator())
  const [frameWidth, setFrameWidth] = useState('')
  const [frameHeight, setFrameHeight] = useState('')
  const [photoWidth, setPhotoWidth] = useState('')
  const [photoHeight, setPhotoHeight] = useState('')
  const [style, setStyle] = useState('proportional')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple')

  const tForm = useTranslations('Form')
  const tStyles = useTranslations('Styles')
  const tInfo = useTranslations('Info')
  const tCalc = useTranslations('Calculator')
  const tMode = useTranslations('Mode')

  // Initialize analytics & restore mode
  useEffect(() => {
    initAnalytics()
    trackPageView('Calculator')
    const saved = localStorage.getItem('mat-calc-mode')
    if (saved === 'advanced') setMode('advanced')
  }, [])

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const calculate = useCallback(() => {
    setError(null)
    if (!frameWidth || !frameHeight || !photoWidth || !photoHeight) {
      setShowResults(false)
      return
    }
    const frame = { width: frameWidth, height: frameHeight }
    const photo = { width: photoWidth, height: photoHeight }
    const calculationResult = calculator.calculate(frame, photo, style)
    if (calculationResult.error) {
      setError(calculationResult.error)
      setShowResults(false)
      return
    }
    setResult(calculationResult)
    setShowResults(true)
    analytics.calculationPerformed(style, mode)
  }, [calculator, frameWidth, frameHeight, photoWidth, photoHeight, style, mode])

  const debouncedCalculate = useCallback(debounce(calculate, 300), [calculate])

  useEffect(() => {
    debouncedCalculate()
  }, [frameWidth, frameHeight, photoWidth, photoHeight, style, debouncedCalculate])

  const handleReset = () => {
    setFrameWidth('')
    setFrameHeight('')
    setPhotoWidth('')
    setPhotoHeight('')
    setStyle('proportional')
    setResult(null)
    setError(null)
    setShowResults(false)
  }

  const handlePreset = (presetKey: string) => {
    const preset = PRESETS[presetKey]
    if (preset) {
      setFrameWidth(preset.frame.width.toString())
      setFrameHeight(preset.frame.height.toString())
      setPhotoWidth(preset.photo.width.toString())
      setPhotoHeight(preset.photo.height.toString())
      analytics.presetUsed(presetKey)
    }
  }

  const handleStyleChange = (newStyle: string) => {
    setStyle(newStyle)
    analytics.styleChanged(newStyle)
  }

  const handleModeToggle = (newMode: 'simple' | 'advanced') => {
    setMode(newMode)
    localStorage.setItem('mat-calc-mode', newMode)
    analytics.modeToggled(newMode)
  }

  const validateInput = (value: string, setter: (value: string) => void) => {
    const numValue = parseFloat(value)
    if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
      setter(value)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        calculate()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        handleReset()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [calculate])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-cream)' }}>
      <Navigation />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Page Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
          >
            {tForm('inputParameters')}
          </h1>
          <p className="text-base" style={{ color: 'var(--color-charcoal-muted)' }}>
            {tInfo('description')}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8 animate-fade-in-up delay-1">
          <div
            className="inline-flex rounded-xl p-1"
            style={{ backgroundColor: 'var(--color-cream-dark)', border: '1px solid var(--color-stone)' }}
          >
            <button
              onClick={() => handleModeToggle('simple')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: mode === 'simple' ? 'var(--color-white)' : 'transparent',
                color: mode === 'simple' ? 'var(--color-amber-dark)' : 'var(--color-charcoal-muted)',
                boxShadow: mode === 'simple' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <Lightning size={18} weight={mode === 'simple' ? 'fill' : 'regular'} />
              {tMode('simple')}
            </button>
            <button
              onClick={() => handleModeToggle('advanced')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: mode === 'advanced' ? 'var(--color-white)' : 'transparent',
                color: mode === 'advanced' ? 'var(--color-amber-dark)' : 'var(--color-charcoal-muted)',
                boxShadow: mode === 'advanced' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <Sliders size={18} weight={mode === 'advanced' ? 'fill' : 'regular'} />
              {tMode('advanced')}
            </button>
          </div>
        </div>

        {/* Calculator Form */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up delay-2"
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-stone)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div className={`grid gap-6 ${mode === 'advanced' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>

            {/* Frame Dimensions */}
            <fieldset>
              <legend className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                <FrameCorners size={18} weight="bold" style={{ color: 'var(--color-amber)' }} />
                {tForm('frameInterior')}
              </legend>
              <p className="text-xs mb-3" style={{ color: 'var(--color-charcoal-muted)' }}>
                {tForm('frameDescription')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="frame-width" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-charcoal-light)' }}>
                    {tForm('widthMm')}
                  </label>
                  <input
                    id="frame-width"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="300"
                    value={frameWidth}
                    onChange={(e) => validateInput(e.target.value, setFrameWidth)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="frame-height" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-charcoal-light)' }}>
                    {tForm('heightMm')}
                  </label>
                  <input
                    id="frame-height"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="400"
                    value={frameHeight}
                    onChange={(e) => validateInput(e.target.value, setFrameHeight)}
                    autoComplete="off"
                  />
                </div>
              </div>
            </fieldset>

            {/* Photo Dimensions */}
            <fieldset>
              <legend className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                <Image size={18} weight="bold" style={{ color: 'var(--color-sage)' }} />
                {tForm('photo')}
              </legend>
              <p className="text-xs mb-3" style={{ color: 'var(--color-charcoal-muted)' }}>
                {tForm('photoDescription')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="photo-width" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-charcoal-light)' }}>
                    {tForm('widthMm')}
                  </label>
                  <input
                    id="photo-width"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="200"
                    value={photoWidth}
                    onChange={(e) => validateInput(e.target.value, setPhotoWidth)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="photo-height" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-charcoal-light)' }}>
                    {tForm('heightMm')}
                  </label>
                  <input
                    id="photo-height"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="300"
                    value={photoHeight}
                    onChange={(e) => validateInput(e.target.value, setPhotoHeight)}
                    autoComplete="off"
                  />
                </div>
              </div>
            </fieldset>

            {/* Style Selection — Advanced only */}
            {mode === 'advanced' && (
              <fieldset className="animate-fade-in">
                <legend className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                  <Scissors size={18} weight="bold" style={{ color: 'var(--color-rust)' }} />
                  {tForm('style')}
                </legend>
                <p className="text-xs mb-3" style={{ color: 'var(--color-charcoal-muted)' }}>
                  {tForm('styleDescription')}
                </p>
                <div className="relative">
                  <select
                    id="style-select"
                    value={style}
                    onChange={(e) => handleStyleChange(e.target.value)}
                    className="appearance-none pr-10"
                  >
                    {STYLE_KEYS.map((styleKey) => (
                      <option key={styleKey} value={styleKey}>
                        {tStyles(styleKey)}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={16}
                    weight="bold"
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--color-charcoal-muted)' }}
                  />
                </div>
              </fieldset>
            )}

            {/* Presets — Advanced only */}
            {mode === 'advanced' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                  <Stack size={18} weight="bold" style={{ color: 'var(--color-amber-light)' }} />
                  {tForm('presets')}
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--color-charcoal-muted)' }}>
                  {tForm('presetsDescription')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(PRESETS).map((key) => {
                    const label = key.replace('photo-', '').replace('a4-frame', 'A4')
                    return (
                      <button
                        key={key}
                        onClick={() => handlePreset(key)}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--color-cream)',
                          border: '1px solid var(--color-stone)',
                          color: 'var(--color-charcoal)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-amber)'
                          e.currentTarget.style.backgroundColor = 'var(--color-amber-glow)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-stone)'
                          e.currentTarget.style.backgroundColor = 'var(--color-cream)'
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className={mode === 'advanced' ? '' : 'md:col-span-2'}>
              <div className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                <Calculator size={18} weight="bold" style={{ color: 'var(--color-amber)' }} />
                {tForm('actions')}
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--color-charcoal-muted)' }}>&nbsp;</p>
              <div className={`flex gap-3 ${mode === 'simple' ? 'flex-row' : 'flex-col'}`}>
                <button
                  onClick={calculate}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-amber)',
                    color: 'var(--color-white)',
                    boxShadow: '0 2px 8px rgba(200, 134, 58, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-amber-dark)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-amber)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Calculator size={18} weight="bold" />
                  {tForm('calculate')}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-cream)',
                    color: 'var(--color-charcoal-muted)',
                    border: '1px solid var(--color-stone)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone-dark)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone)'
                  }}
                >
                  <ArrowCounterClockwise size={18} weight="bold" />
                  {tForm('reset')}
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts — Advanced only */}
          {mode === 'advanced' && (
            <div
              className="text-xs text-center mt-6 pt-4 animate-fade-in"
              style={{ borderTop: '1px solid var(--color-stone)', color: 'var(--color-charcoal-muted)' }}
            >
              <kbd
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-stone)' }}
              >
                Ctrl + Enter
              </kbd>{' '}
              {tForm('toCalculate')} &middot;{' '}
              <kbd
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-stone)' }}
              >
                Esc
              </kbd>{' '}
              {tForm('toReset')}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-xl mb-6 animate-fade-in-up"
            style={{
              backgroundColor: 'var(--color-rust-light)',
              border: '1px solid var(--color-rust)',
              color: 'var(--color-rust)',
            }}
          >
            <WarningCircle size={22} weight="fill" />
            <span className="font-medium text-sm">{tCalc(error)}</span>
          </div>
        )}

        {/* Results or Info */}
        {showResults && result ? (
          <div className="space-y-6 animate-fade-in-up delay-3">
            <ResultsDisplay result={result} calculator={calculator} />
            <MatPreview result={result} calculator={calculator} />
          </div>
        ) : !error && (
          <section
            className="rounded-2xl p-8 sm:p-10 text-center animate-fade-in-up delay-3"
            style={{
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-stone)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-amber-glow)' }}
            >
              <FrameCorners size={40} weight="duotone" style={{ color: 'var(--color-amber)' }} />
            </div>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
            >
              {tInfo('title')}
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--color-charcoal-muted)' }}>
              {tInfo('description')}
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { key: 'styles', icon: <Scissors size={22} weight="duotone" />, color: 'var(--color-amber)' },
                { key: 'preview', icon: <Image size={22} weight="duotone" />, color: 'var(--color-sage)' },
                { key: 'recommendations', icon: <Lightning size={22} weight="duotone" />, color: 'var(--color-rust)' },
              ].map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-stone)' }}
                >
                  <div className="mb-2" style={{ color: item.color }}>{item.icon}</div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                    {tInfo(`${item.key}Title` as any)}
                  </div>
                  <div style={{ color: 'var(--color-charcoal-muted)' }}>
                    {tInfo(`${item.key}Description` as any)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
