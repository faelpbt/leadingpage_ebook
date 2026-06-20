import type { Metadata } from 'next'
import { Bebas_Neue, Lora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Guaraná da Amazônia — 50 Receitas | E-book Digital',
  description:
    'Descubra o poder do Guaraná nativo com 50 receitas exclusivas: energéticas naturais, smoothies, sobremesas e muito mais. Acesso imediato ao e-book digital.',
  openGraph: {
    title: 'Guaraná da Amazônia — 50 Receitas',
    description: '50 receitas com Guaraná nativo: energia pura da floresta.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${lora.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
