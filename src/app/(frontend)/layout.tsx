import React from 'react'
import { headers } from 'next/headers'

import './styles.css'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const requestHeaders = await headers()
  const pathname = requestHeaders.get('x-pathname') ?? '/'
  const lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'uk'

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
