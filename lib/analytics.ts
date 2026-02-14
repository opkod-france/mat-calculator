import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

let initialized = false

export function initAnalytics() {
  if (initialized || !MIXPANEL_TOKEN || typeof window === 'undefined') return
  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: 'url-with-path',
    persistence: 'localStorage',
  })
  initialized = true
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return
  mixpanel.track(event, properties)
}

export function trackPageView(pageName: string) {
  trackEvent('Page Viewed', { page: pageName })
}

export const analytics = {
  calculationPerformed: (style: string, mode: 'simple' | 'advanced') =>
    trackEvent('Calculation Performed', { style, mode }),
  styleChanged: (style: string) =>
    trackEvent('Style Changed', { style }),
  presetUsed: (preset: string) =>
    trackEvent('Preset Used', { preset }),
  modeToggled: (mode: 'simple' | 'advanced') =>
    trackEvent('Mode Toggled', { mode }),
  contactFormSubmitted: () =>
    trackEvent('Contact Form Submitted'),
  languageChanged: (locale: string) =>
    trackEvent('Language Changed', { locale }),
}
