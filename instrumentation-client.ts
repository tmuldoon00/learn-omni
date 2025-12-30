// PostHog client-side instrumentation for Next.js 15.3+
// This file is automatically loaded by Next.js for client-side analytics

import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      // Enable automatic pageview tracking
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog initialized')
        }
      },
      // Capture pageviews automatically
      capture_pageview: true,
      // Capture pageleave events
      capture_pageleave: true,
    })
  }
}

