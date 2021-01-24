import { Button, Grid } from '@material-ui/core'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import Hand from '../components/hand'
import { playingCard } from '../components/playing-card'
import { drawCard, generateDeck } from '../lib/deck'
import { getHandScore } from '../lib/score'

type winner = false | 'player' | 'dealer'

export default function Home({ startingDeck }) {
    const [deck, setDeck] = useState<Array<playingCard>>([])
    const [playerHand, setPlayerHand] = useState<Array<playingCard>>([])
    const [playerScore, setPlayerScore] = useState<Number>(0)
    const [dealerHand, setDealerHand] = useState<Array<playingCard>>([])
    const [dealerScore, setDealerScore] = useState<Number>(0)
    const [dealerCardsHidden, setDealerCardsHidden] = useState<boolean>(true)
    const [status, setStatus] = useState<String>('')
    const [winner, setWinner] = useState<winner>(false)

    // Handles reseting the deck
    useEffect(() => {
        setDeck(startingDeck)
    }, [])

    // Handles dealing
    useEffect(() => {
        // If no hands exist, deal them
        if (dealerHand.length == 0 && deck.length > 0) {
            setDealerHand([
                drawCard([...deck], setDeck),
                drawCard([...deck], setDeck),
            ])
            setPlayerHand([
                drawCard([...deck], setDeck),
                drawCard([...deck], setDeck),
            ])
        }
    }, [deck])

    // Handles calculting scores
    useEffect(() => {
        setDealerScore(getHandScore(dealerHand))
        setPlayerScore(getHandScore(playerHand))
    }, [playerHand, dealerHand])

    // Handles checking for win conditions
    useEffect(() => {
        if (playerScore > 21) {
            setStatus('Player busted')
        }
    }, [playerScore, dealerScore])

    function handleHit() {
        setPlayerHand([...playerHand, drawCard([...deck], setDeck)])
    }

    function handleStand() {
        setDealerCardsHidden(false)
    }

    return (
        <Grid container direction='column' spacing={2}>
            <Hand dealer hidden={dealerCardsHidden} hand={[...dealerHand]} />
            <Grid item>
                <br />
                <br />
            </Grid>

            <Grid item container justify='center' spacing={2}>
                <p>
                    player score: {playerScore} | dealer score: {dealerScore}
                </p>
                {winner ? (
                    <p>Over</p>
                ) : (
                    <>
                        <Grid item>
                            <Button
                                color='primary'
                                variant='outlined'
                                onClick={handleHit}
                            >
                                Hit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color='primary'
                                variant='outlined'
                                onClick={handleStand}
                            >
                                Stand
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>

            <Hand hand={playerHand} />
        </Grid>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const startingDeck = generateDeck()

    return {
        props: {
            startingDeck,
        },
    }
}
