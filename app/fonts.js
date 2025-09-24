import localFont from 'next/font/local'
import { Hind_Siliguri } from 'next/font/google'

export const amyTagline = localFont({
  src: './fonts/amy-tagline.ttf', // stays relative to /app/fonts.js
  // If you know the file is not 700, change this to the real one (e.g., "600" or "400")
  weight: '700',
  style: 'normal',
  variable: '--font-amy-tagline',
  display: 'swap',
  fallback: ['system-ui', 'Arial'], // CSS fallback; Hind is added via variable below
  preload: true, // make sure it loads ASAP
})

export const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
})
