import React from 'react'

import './styles.css'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
