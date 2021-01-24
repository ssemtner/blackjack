import { Button, Grid } from '@material-ui/core'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import Hand from '../components/hand'
import { playingCard } from '../components/playing-card'
import { generateDeck } from '../lib/deck'
import { getHandScore } from '../lib/score'

export default function Home({ startingDeck }) {
    const [deck, setDeck] = useState<Array<playingCard>>([])
    const [playerHand, setPlayerHand] = useState<Array<playingCard>>([
        { suit: 'heart', value: 'jack' },
        { suit: 'diamond', value: '8' },
    ])
    const [playerScore, setPlayerScore] = useState<Number>(0)
    const [dealerHand, setDealerHand] = useState<Array<playingCard>>([
        { suit: 'diamond', value: '1' },
        { suit: 'spade', value: '2' },
    ])
    const [dealerScore, setDealerScore] = useState<Number>(0)
    const [inGame, setInGame] = useState<boolean>(true)
    const [playerTurn, setPlayerTurn] = useState<boolean>(true)

    // Handles reseting the deck
    useEffect(() => {
        setDeck(startingDeck)
    }, [])

    // Handles hiding dealers cards
    useEffect(() => {
        if (playerTurn) {
            // Hide cards
            const newDealerHand = [...dealerHand]

            for (let i = 1; i < newDealerHand.length; i++) {
                newDealerHand[i].back = true
            }

            setDealerHand(newDealerHand)
        } else {
            // Reveal cards
            const newDealerHand = [...dealerHand]
            for (let card of newDealerHand) {
                card.back = false
            }
            setDealerHand(newDealerHand)

            getHandScore(dealerHand)
        }
    }, [playerTurn])

    // Handles calculting the player hand score
    useEffect(() => {
        getHandScore(playerHand)
    }, [playerHand])

    function handleHit() {
        setPlayerHand([...playerHand, { suit: 'club', value: '3' }])
    }

    function handleStand() {
        setPlayerTurn(false)
    }

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
                ) : (
                    <p>Over</p>
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
