import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import PlayingCard, { playingCard } from './playing-card'

export default function Hand({
    dealer,
    hand,
}: {
    dealer?: boolean
    hand: Array<playingCard>
}) {
    if (dealer) {
        console.log('dealer')
        for (let card of hand) {
            card.back = true
        }
        hand[0].back = false
    }

    return (
        <>
            <Grid item container justify='center'>
                <Typography variant='h4'>
                    {dealer ? 'Dealer' : 'Player'}'s Hand
                </Typography>
            </Grid>
            <Grid item container justify='center'>
                {hand.map((card) => (
                    <PlayingCard {...card} />
                ))}
            </Grid>
        </>
    )
}
