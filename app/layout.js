import './globals.css'
import './styles/gradient.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body>{children}</body>
    </html>
  )
}
