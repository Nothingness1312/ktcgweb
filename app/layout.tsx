import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'KTCG Community - Website Community',

  description:
    'Website Komunitas CTF Indonesia yang menyediakan berbagai informasi, sumber daya, dan diskusi seputar dunia cybersecurity.',

  keywords: [
    'CTF Indonesia',
    'Cybersecurity Community',
    'Hacking Community',
    'Capture The Flag',
    'KTCG',
    'Cybersecurity Indonesia',
    'Ethical Hacking',
    'KTCG Website',
    'KTCG Server',
  ],

  authors: [{ name: 'KTCG Community' }],

  creator: 'KTCG Community',

  metadataBase: new URL('https://ktcg.vercel.app'),

  openGraph: {
    title: 'KTCG Community',
    description:
      'Komunitas CTF Indonesia untuk belajar cybersecurity, hacking, dan capture the flag.',
    url: 'https://ktcg.vercel.app',
    siteName: 'KTCG Community',
    images: [
      {
        url: '/ktcg-logo.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'KTCG Community',
    description:
      'Komunitas CTF Indonesia untuk belajar cybersecurity dan hacking.',
    images: ['/ktcg-logo.png'],
  },

  icons: {
    icon: '/ktcg-logo.png',
    apple: '/ktcg-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}