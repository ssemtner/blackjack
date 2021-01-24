import { cardSuit, cardValue, playingCard } from '../components/playing-card'

export function generateDeck() {
    let deck: Array<playingCard> = []

    for (let suit of ['heart', 'diamond', 'club', 'spade']) {
        for (let value of [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            'jack',
            'queen',
            'king',
        ]) {
            deck.push({ suit: suit as cardSuit, value: value as cardValue })
        }
    }

    return deck
}

export function drawCard(
    deck: Array<playingCard>,
    setter: Function
): playingCard {
    const index: number = Math.floor(Math.random() * deck.length)
    const toReturn: playingCard = deck[index]
    
    deck.splice(index, 1)

    setter(deck)

    return toReturn
}
