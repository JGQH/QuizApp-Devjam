import '../styles/globals.css'
import Header from '@Components/Header'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='grid gap-1 p-1 h-screen sm:text-2xl'>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
