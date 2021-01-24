import { Button, Grid } from '@material-ui/core'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Hand from '../components/hand'
import { playingCard } from '../components/playing-card'
import { drawCard, generateDeck } from '../lib/deck'
import { getHandScore } from '../lib/score'

export default function Game({ startingDeck }) {
    const [deck, setDeck] = useState<Array<playingCard>>(startingDeck)
    const [playerHand, setPlayerHand] = useState<Array<playingCard>>([])
    const [playerScore, setPlayerScore] = useState<Number>(0)
    const [dealerHand, setDealerHand] = useState<Array<playingCard>>([])
    const [dealerScore, setDealerScore] = useState<Number>(0)
    const [turn, setTurn] = useState<'player' | 'dealer' | 'end'>('player')
    const [message, setMessage] = useState<String>('')
    const [winner, setWinner] = useState<'' | 'player' | 'dealer' | 'push'>('')

    // Handles dealing
    useEffect(() => {
        // If no hands exist, deal
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
        if (playerScore == 21 && playerHand.length == 2) {
            if (dealerScore == 21 && dealerHand.length == 2) {
                setMessage('Both blackjack')
                setWinner('push')
            }
            setMessage('Player blackjack')
            setWinner('player')
        } else if (dealerScore == 21 && dealerHand.length == 2) {
            setMessage('Dealer blackjack')
            setWinner('dealer')
        } else if (playerScore > 21) {
            setMessage('Player busted')
            setWinner('dealer')
        } else if (dealerScore > 21) {
            setMessage('Dealer busted')
            setWinner('player')
        }
    }, [playerScore, dealerScore])

    useEffect(() => {
        if (turn == 'end') {
            if (playerScore > dealerScore) {
                setMessage('Player wins')
                setWinner('player')
            } else if (dealerScore > playerScore) {
                setMessage('Dealer wins')
                setWinner('dealer')
            } else {
                setMessage('Push')
                setWinner('push')
            }
        }
    }, [turn, dealerScore])

    useEffect(() => {
        if (turn == 'dealer') {
            if (dealerScore > 21) {
                setMessage('Dealer busted')
                setWinner('player')
            } else if (dealerScore > 16) {
                setTurn('end')
            } else {
                setTimeout(
                    () =>
                        setDealerHand([
                            ...dealerHand,
                            drawCard([...deck], setDeck),
                        ]),
                    500
                )
            }
        }
    }, [turn, dealerScore])

    function hit() {
        setPlayerHand([...playerHand, drawCard([...deck], setDeck)])
    }

    function stand() {
        setTurn('dealer')
    }

    function reset() {
        setWinner('')
        setMessage('')
        setTurn('player')
        setDealerScore(0)
        setPlayerScore(0)
        setDealerHand([])
        setPlayerHand([])
        setDeck(startingDeck)
    }

    return (
        <>
            <Link href='/'>
                <Button
                    variant='outlined'
                    color='secondary'
                    style={{ position: 'absolute', top: 100, left: 50 }}
                >
                    Back
                </Button>
            </Link>
            <Grid container direction='column' spacing={2}>
                <Hand dealer hidden={turn == 'player'} hand={[...dealerHand]} />

                <Grid item container justify='center' spacing={2}>
                    {turn != 'player' ? (
                        <p>
                            player score: {playerScore} | dealer score:{' '}
                            {dealerScore}
                        </p>
                    ) : (
                        ''
                    )}
                </Grid>
                <Grid item container justify='center' spacing={2}>
                    {winner != '' ? (
                        <>
                            <p>{message}</p>
                            <p>{winner.toUpperCase}</p>
                            <Button
                                color='secondary'
                                variant='outlined'
                                onClick={reset}
                            >
                                Reset
                            </Button>
                        </>
                    ) : (
                        <>
                            <Grid item>
                                <Button
                                    color='primary'
                                    variant='outlined'
                                    onClick={hit}
                                >
                                    Hit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color='primary'
                                    variant='outlined'
                                    onClick={stand}
                                >
                                    Stand
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>

                <Hand hand={playerHand} />
            </Grid>
        </>
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

