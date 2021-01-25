import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppWrapper, useAppContext } from '../components/state'
import TopBar from '../components/top-bar'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppWrapper>
            <CssBaseline>
                <Head>
                    <title>Blackjack</title>
                </Head>
                <TopBar/>
                <br />
                <Component {...pageProps} />
            </CssBaseline>
        </AppWrapper>
    )
}

export default MyApp
