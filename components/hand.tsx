import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import PlayingCard, { playingCard } from './playing-card'

export default function Hand({
    hand,
    dealer,
    hidden,
}: {
    hand: Array<playingCard>
    dealer?: boolean
    hidden?: boolean
}) {
    let updatedHand: Array<playingCard> = hand.slice()

    if (hidden && dealer) {
        for (let i = 1; i < updatedHand.length; i++) {
            updatedHand[i].back = true
        }
    } else {
        for (let i = 0; i < updatedHand.length; i++) {
            updatedHand[i].back = false
        }
    }

    // TODO: fix the accidental mutation here

    return (
        <>
            <Grid item container justify='center'>
                <Typography variant='h4'>
                    {dealer ? 'Dealer' : 'Player'}'s Hand
                </Typography>
            </Grid>
            <Grid item container justify='center'>
                {hand.map((card, index) => (
                    <PlayingCard {...card} key={index} />
                ))}
            </Grid>
        </>
    )
}
