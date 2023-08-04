import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import '@/styles/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
