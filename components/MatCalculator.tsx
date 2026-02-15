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
  ArrowRight,
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
      <Navigation />

      <main className="flex-1 max-w-3xl mx-auto px-5 sm:px-6 py-8 w-full">
        {/* Header — left-aligned, tight */}
        <div className="mb-6 animate-in">
          <h1 className="text-[28px] font-semibold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            {tForm('inputParameters')}
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--text-tertiary)' }}>
            {tInfo('description')}
          </p>
        </div>

        {/* Mode Toggle — pill style, compact */}
        <div className="flex items-center gap-3 mb-6 animate-in delay-1">
          <div
            className="inline-flex rounded-md p-0.5"
            style={{ backgroundColor: 'var(--bg-sunken)', border: '1px solid var(--border)' }}
          >
            {(['simple', 'advanced'] as const).map((m) => (
              <button
                key={m}
                onClick={() => handleModeToggle(m)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-medium transition-all duration-100"
                style={{
                  backgroundColor: mode === m ? 'var(--bg-elevated)' : 'transparent',
                  color: mode === m ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  boxShadow: mode === m ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {m === 'simple' ? <Lightning size={14} weight={mode === m ? 'fill' : 'regular'} /> : <Sliders size={14} weight={mode === m ? 'fill' : 'regular'} />}
                {tMode(m)}
              </button>
            ))}
          </div>
          <span className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
            {mode === 'simple' ? tMode('simpleDescription') : tMode('advancedDescription')}
          </span>
        </div>

        {/* Form Card */}
        <div
          className="rounded-lg p-5 sm:p-6 mb-6 animate-in delay-2"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Two-column layout for dimensions */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {/* Frame */}
            <fieldset>
              <legend className="flex items-center gap-1.5 text-[13px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                <FrameCorners size={15} weight="bold" style={{ color: 'var(--accent)' }} />
                {tForm('frameInterior')}
              </legend>
              <p className="text-[12px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {tForm('frameDescription')}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="frame-width" className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                    {tForm('widthMm')}
                  </label>
                  <input id="frame-width" type="number" step="1" min="0" placeholder="300" value={frameWidth} onChange={(e) => validateInput(e.target.value, setFrameWidth)} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="frame-height" className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                    {tForm('heightMm')}
                  </label>
                  <input id="frame-height" type="number" step="1" min="0" placeholder="400" value={frameHeight} onChange={(e) => validateInput(e.target.value, setFrameHeight)} autoComplete="off" />
                </div>
              </div>
            </fieldset>

            {/* Photo */}
            <fieldset>
              <legend className="flex items-center gap-1.5 text-[13px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                <Image size={15} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                {tForm('photo')}
              </legend>
              <p className="text-[12px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {tForm('photoDescription')}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="photo-width" className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                    {tForm('widthMm')}
                  </label>
                  <input id="photo-width" type="number" step="1" min="0" placeholder="200" value={photoWidth} onChange={(e) => validateInput(e.target.value, setPhotoWidth)} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="photo-height" className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                    {tForm('heightMm')}
                  </label>
                  <input id="photo-height" type="number" step="1" min="0" placeholder="300" value={photoHeight} onChange={(e) => validateInput(e.target.value, setPhotoHeight)} autoComplete="off" />
                </div>
              </div>
            </fieldset>
          </div>

          {/* Advanced options row */}
          {mode === 'advanced' && (
            <div className="grid sm:grid-cols-2 gap-5 mb-5 pt-5 animate-in" style={{ borderTop: '1px solid var(--border)' }}>
              {/* Style */}
              <fieldset>
                <legend className="flex items-center gap-1.5 text-[13px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                  <Scissors size={15} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                  {tForm('style')}
                </legend>
                <p className="text-[12px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {tForm('styleDescription')}
                </p>
                <div className="relative">
                  <select
                    id="style-select"
                    value={style}
                    onChange={(e) => handleStyleChange(e.target.value)}
                    className="appearance-none pr-8 text-[14px]"
                  >
                    {STYLE_KEYS.map((styleKey) => (
                      <option key={styleKey} value={styleKey}>{tStyles(styleKey)}</option>
                    ))}
                  </select>
                  <CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
                </div>
              </fieldset>

              {/* Presets */}
              <div>
                <div className="flex items-center gap-1.5 text-[13px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                  <Stack size={15} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                  {tForm('presets')}
                </div>
                <p className="text-[12px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {tForm('presetsDescription')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(PRESETS).map((key) => {
                    const label = key.replace('photo-', '').replace('a4-frame', 'A4')
                    return (
                      <button
                        key={key}
                        onClick={() => handlePreset(key)}
                        className="px-3 py-1.5 rounded text-[13px] font-medium transition-all duration-100"
                        style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.color = 'var(--accent)'
                          e.currentTarget.style.backgroundColor = 'var(--accent-soft)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)'
                          e.currentTarget.style.color = 'var(--text-secondary)'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Actions bar */}
          <div className="flex items-center gap-2.5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={calculate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-[14px] font-semibold transition-all duration-100"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'white',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
            >
              <Calculator size={16} weight="bold" />
              {tForm('calculate')}
              <ArrowRight size={14} weight="bold" />
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[14px] font-medium transition-all duration-100"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-sunken)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ArrowCounterClockwise size={14} />
              {tForm('reset')}
            </button>
            {mode === 'advanced' && (
              <span className="ml-auto text-[12px] hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
                <kbd className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'var(--bg-sunken)', border: '1px solid var(--border)' }}>
                  ⌘↵
                </kbd>{' '}
                {tForm('toCalculate')}
              </span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-md mb-5 animate-in text-[14px]"
            style={{ backgroundColor: 'var(--danger-soft)', border: '1px solid rgba(220,38,38,0.15)', color: 'var(--danger)' }}
          >
            <WarningCircle size={18} weight="fill" />
            <span className="font-medium">{tCalc(error)}</span>
          </div>
        )}

        {/* Results or Empty State */}
        {showResults && result ? (
          <div className="space-y-4 animate-in delay-3">
            <ResultsDisplay result={result} calculator={calculator} />
            <MatPreview result={result} calculator={calculator} />
          </div>
        ) : !error && (
          <div
            className="rounded-lg p-8 text-center animate-in delay-3"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-soft)' }}
            >
              <FrameCorners size={24} weight="duotone" style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-[18px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
              {tInfo('title')}
            </h2>
            <p className="text-[14px] mb-6 max-w-sm mx-auto" style={{ color: 'var(--text-tertiary)' }}>
              {tInfo('description')}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { key: 'styles', icon: <Scissors size={18} weight="regular" /> },
                { key: 'preview', icon: <Image size={18} weight="regular" /> },
                { key: 'recommendations', icon: <Lightning size={18} weight="regular" /> },
              ].map((item) => (
                <div
                  key={item.key}
                  className="rounded-md p-4 text-left"
                  style={{ backgroundColor: 'var(--bg-sunken)' }}
                >
                  <div className="mb-1.5" style={{ color: 'var(--text-secondary)' }}>{item.icon}</div>
                  <div className="text-[13px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    {tInfo(`${item.key}Title` as any)}
                  </div>
                  <div className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                    {tInfo(`${item.key}Description` as any)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
