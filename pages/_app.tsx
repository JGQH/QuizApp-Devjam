import '../styles/globals.css'
import Header from '@Components/Header'
import type { AppProps } from 'next/app'
import useLocalStorage from '@Hooks/useLocalStorage'
import Button from '@Components/Button'

function MyApp({ Component, pageProps }: AppProps) {
  const [ darkMode, setDarkMode ] = useLocalStorage('dark-mode-enabled', false)

  return (
    <div id='theme-wrapper' className={darkMode ? 'dark' : ''}>
      <div className='grid bg-white dark:bg-gray-900 dark:text-white gap-1 h-screen sm:text-2xl'>
        <Header />
        <Button className='absolute top-1 right-1' onClick={() => setDarkMode(mode => !mode)}>
          {darkMode ? 'Dark' : 'Light'} mode
        </Button>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
