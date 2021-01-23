import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CssBaseline>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6">Blackjack</Typography>
                </Toolbar>
            </AppBar>
            <br/>
            <Component {...pageProps} />
        </CssBaseline>
    )
}

export default MyApp
