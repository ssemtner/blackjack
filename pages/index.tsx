import { Button, Grid } from '@material-ui/core'
import { useState } from 'react'
import Hand from '../components/hand'
import { playingCard } from '../components/playing-card'

export default function Home() {
    const [dealerHand, setDealerHand] = useState<Array<playingCard>>([
        { suit: 'diamond', value: '1' },
        { suit: 'spade', value: '2' },
    ])
    const [playerHand, setPlayerHand] = useState<Array<playingCard>>([
        { suit: 'heart', value: 'jack' },
        { suit: 'diamond', value: '8' },
    ])
    const [inGame, setInGame] = useState<boolean>(true)

    return (
        <Grid container direction='column' spacing={2}>
            <Hand dealer hand={dealerHand} />
            <Grid item>
                <br />
                <br />
            </Grid>

            <Grid item container justify='center' spacing={2}>
                {inGame ? (
                    <>
                        <Grid item>
                            <Button color='primary' variant='outlined'>
                                Test
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button color='primary' variant='outlined'>
                                Test
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <p>Over</p>
                )}
            </Grid>

            <Hand hand={playerHand} />
        </Grid>
    )
}
