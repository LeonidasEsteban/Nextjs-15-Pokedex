'use client';
import './globals.css'
import './styles/gradient.css'
import { Roboto } from 'next/font/google'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})
export default function BlogLayout({ children }) {
  return (
    <html lang="es" className={roboto.className}>
      <body>
        <ProgressBar
          height="4px"
          color="#ff0000"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </body>
    </html>
  );
}