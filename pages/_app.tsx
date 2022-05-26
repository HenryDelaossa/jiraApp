import type { AppProps } from 'next/app'
import { EntriesProvider } from '../context/entries/EntriesProvider';
import { UIProvider } from '../context/ui'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../themes'




function MyApp({ Component, pageProps }: AppProps) {

  return (
    <EntriesProvider entries={[]}>
      <UIProvider sideBarMenuOpen={false}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}

export default MyApp
