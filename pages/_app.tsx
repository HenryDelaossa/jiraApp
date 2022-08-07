import type { AppProps } from 'next/app'
import { EntriesProvider } from '../context/entries/EntriesProvider';
import { UIProvider } from '../context/ui'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../themes'
import { SnackbarProvider } from "notistack"




function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SnackbarProvider maxSnack={4}>
      <EntriesProvider entries={[]}>
        <UIProvider sideBarMenuOpen={false} isAddingEntry={false} isDragging={false}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>

  )
}

export default MyApp
