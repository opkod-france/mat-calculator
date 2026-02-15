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
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      analytics.contactFormSubmitted()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
      <Navigation />

      <main className="flex-1 max-w-2xl mx-auto px-5 sm:px-6 py-8 w-full">
        {/* Header */}
        <div className="mb-8 animate-in">
          <h1 className="text-[28px] font-semibold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            {t('title')}
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--text-tertiary)' }}>
            {t('heroDescription')}
          </p>
        </div>

        {submitted ? (
          <div
            className="rounded-lg p-8 text-center animate-scale"
            style={{ backgroundColor: 'var(--success-soft)', border: '1px solid rgba(22,163,74,0.15)' }}
          >
            <CheckCircle size={36} weight="fill" style={{ color: 'var(--success)', margin: '0 auto 12px' }} />
            <h2 className="text-[18px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('successTitle')}
            </h2>
            <p className="text-[14px]" style={{ color: 'var(--text-tertiary)' }}>
              {t('successDescription')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-lg p-5 sm:p-6 animate-in delay-2"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="flex items-center gap-1.5 text-[13px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    <User size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                    {t('nameLabel')}
                  </label>
                  <input id="contact-name" type="text" required placeholder={t('namePlaceholder')} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="flex items-center gap-1.5 text-[13px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    <At size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                    {t('emailLabel')}
                  </label>
                  <input id="contact-email" type="email" required placeholder={t('emailPlaceholder')} />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="flex items-center gap-1.5 text-[13px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  <ChatText size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                  {t('subjectLabel')}
                </label>
                <input id="contact-subject" type="text" required placeholder={t('subjectPlaceholder')} />
              </div>

              <div>
                <label htmlFor="contact-message" className="flex items-center gap-1.5 text-[13px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  <TextAlignLeft size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                  {t('messageLabel')}
                </label>
                <textarea id="contact-message" required rows={5} placeholder={t('messagePlaceholder')} className="resize-none" />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-[14px] font-semibold transition-all duration-100"
                style={{
                  backgroundColor: sending ? 'var(--border-strong)' : 'var(--accent)',
                  color: 'white',
                  cursor: sending ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.backgroundColor = 'var(--accent-hover)' }}
                onMouseLeave={(e) => { if (!sending) e.currentTarget.style.backgroundColor = 'var(--accent)' }}
              >
                {sending ? (
                  <><Spinner size={16} className="animate-spin" />{t('sending')}</>
                ) : (
                  <><PaperPlaneTilt size={16} weight="fill" />{t('send')}</>
                )}
              </button>
            </div>
          </form>
        )}

        {/* GitHub link */}
        <div
          className="mt-6 rounded-md p-4 text-center animate-in delay-3"
          style={{ backgroundColor: 'var(--bg-sunken)' }}
        >
          <p className="text-[13px] mb-2.5" style={{ color: 'var(--text-tertiary)' }}>
            {t('openSource')}
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-100"
            style={{ backgroundColor: 'var(--bg-inverse)', color: 'var(--text-inverse)' }}
          >
            <GithubLogo size={15} weight="fill" />
            {t('githubLink')}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
