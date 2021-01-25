import { Button, Grid } from '@material-ui/core'
import Link from 'next/link'
import { useAppContext } from '../components/state'

export default function Home() {
    const state = useAppContext()

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item container justify='center'>
                <h2>Welcome to blackjack!</h2>
            </Grid>
            <Grid item container justify='center'>
                <p>
                    The game is partialy finished, so be warned you might
                    encounter errors and/or bugs
                </p>
            </Grid>
            <br />
            <Grid item container justify='center'>
                <Link href='/bet'>
                    <Button variant='contained' color='primary'>
                        Start Game
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}
