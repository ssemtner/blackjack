import { playingCard } from '../components/playing-card'

export function getHandScore(hand: Array<playingCard>): number {
    let total: number = 0
    let aces: number = 0

    for (let card of hand) {
        let value: number = Number(card.value)

        if (!value) {
            value = 10
        } else if (value == 1) {
            aces++
            value += 10
        }

        total += value

        if (total > 21 && aces > 0) {
            aces--
            total -= 10
        }
    }

    return total
}
