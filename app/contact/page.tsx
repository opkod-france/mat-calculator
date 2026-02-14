'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  EnvelopeSimple,
  PaperPlaneTilt,
  User,
  At,
  ChatText,
  TextAlignLeft,
  CheckCircle,
  GithubLogo,
  Spinner,
} from '@phosphor-icons/react'
import { initAnalytics, trackPageView, analytics } from '../../lib/analytics'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ContactPage() {
  const t = useTranslations('Contact')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    initAnalytics()
    trackPageView('Contact')
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    // Simulate form submission
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      analytics.contactFormSubmitted()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-cream)' }}>
      <Navigation />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Hero */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-amber-glow)' }}
          >
            <EnvelopeSimple size={32} weight="duotone" style={{ color: 'var(--color-amber)' }} />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
          >
            {t('title')}
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--color-charcoal-muted)' }}>
            {t('heroDescription')}
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <div
            className="rounded-2xl p-10 text-center animate-scale-in"
            style={{
              backgroundColor: 'var(--color-sage-light)',
              border: '1px solid rgba(122, 139, 111, 0.3)',
            }}
          >
            <CheckCircle size={48} weight="fill" style={{ color: 'var(--color-sage)', margin: '0 auto 16px' }} />
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-ink)' }}
            >
              {t('successTitle')}
            </h2>
            <p style={{ color: 'var(--color-charcoal-muted)' }}>
              {t('successDescription')}
            </p>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 sm:p-8 animate-fade-in-up delay-2"
            style={{
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-stone)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div className="space-y-5">
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="flex items-center gap-1.5 text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    <User size={16} weight="bold" style={{ color: 'var(--color-amber)' }} />
                    {t('nameLabel')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder={t('namePlaceholder')}
                    className="w-full px-4 py-2.5 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--color-white)',
                      border: '1.5px solid var(--color-stone)',
                      color: 'var(--color-charcoal)',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-amber)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-stone)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="flex items-center gap-1.5 text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    <At size={16} weight="bold" style={{ color: 'var(--color-amber)' }} />
                    {t('emailLabel')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-4 py-2.5 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--color-white)',
                      border: '1.5px solid var(--color-stone)',
                      color: 'var(--color-charcoal)',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-amber)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-stone)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="flex items-center gap-1.5 text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-ink)' }}
                >
                  <ChatText size={16} weight="bold" style={{ color: 'var(--color-amber)' }} />
                  {t('subjectLabel')}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder={t('subjectPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-lg text-sm"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    border: '1.5px solid var(--color-stone)',
                    color: 'var(--color-charcoal)',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-amber)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="flex items-center gap-1.5 text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-ink)' }}
                >
                  <TextAlignLeft size={16} weight="bold" style={{ color: 'var(--color-amber)' }} />
                  {t('messageLabel')}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    border: '1.5px solid var(--color-stone)',
                    color: 'var(--color-charcoal)',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-amber)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-stone)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: sending ? 'var(--color-stone-dark)' : 'var(--color-amber)',
                  color: 'var(--color-white)',
                  boxShadow: sending ? 'none' : '0 2px 8px rgba(200, 134, 58, 0.3)',
                  cursor: sending ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!sending) e.currentTarget.style.backgroundColor = 'var(--color-amber-dark)'
                }}
                onMouseLeave={(e) => {
                  if (!sending) e.currentTarget.style.backgroundColor = 'var(--color-amber)'
                }}
              >
                {sending ? (
                  <>
                    <Spinner size={18} weight="bold" className="animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt size={18} weight="fill" />
                    {t('send')}
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Additional Info */}
        <div
          className="mt-8 rounded-xl p-5 text-center animate-fade-in-up delay-3"
          style={{
            backgroundColor: 'var(--color-cream-dark)',
            border: '1px solid var(--color-stone)',
          }}
        >
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
            {t('infoTitle')}
          </h3>
          <p className="text-sm mb-3" style={{ color: 'var(--color-charcoal-muted)' }}>
            {t('openSource')}
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-charcoal)',
              color: 'var(--color-white)',
            }}
          >
            <GithubLogo size={18} weight="fill" />
            {t('githubLink')}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
