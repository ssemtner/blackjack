import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppWrapper, useAppContext } from '../components/state'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppWrapper>
            <CssBaseline>
                <Head>
                    <title>Blackjack</title>
                </Head>
                <AppBar position='sticky'>
                    <Toolbar>
                        <Typography variant='h5'>Blackjack</Typography>
                        <Typography variant='h6' style={{marginLeft: 'auto'}}>Balance: ${useAppContext().balance}</Typography>
                    </Toolbar>
                </AppBar>
                <br />
                <Component {...pageProps} />
            </CssBaseline>
        </AppWrapper>
    )
}

export default MyApp
