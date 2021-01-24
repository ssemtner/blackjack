export interface playingCard {
    suit: 'heart' | 'diamond' | 'spade' | 'club'
    value:
        | '1'
        | '2'
        | '3'
        | '4'
        | '5'
        | '6'
        | '7'
        | '8'
        | '9'
        | '10'
        | 'jack'
        | 'queen'
        | 'king'
    back?: boolean
}

const SCALE: number = 0.8
const WIDTH: number = 169.075
const HEIGHT: number = 244.64

export default function PlayingCard({
    suit,
    value,
    back,
}: playingCard) {
    return (
        <svg
            style={{ margin: '-25px 10px', transform: `scale(${SCALE})` }}
            width={WIDTH}
            height={HEIGHT}
            xmlns='http://www.w3.org/2000/svg'
        >
            <use
                href={
                    back
                        ? 'svg-cards.svg#back'
                        : `svg-cards.svg#${suit}_${value}`
                }
                y='0'
                x='0'
            />
        </svg>
    )
}
