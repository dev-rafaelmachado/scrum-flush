/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { Lato, Poppins } from 'next/font/google'
import './globals.css'

import { Toaster } from 'sonner'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Scrum Flush',
  description: 'Scrum Poker for the modern team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} ${poppins.className}`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
