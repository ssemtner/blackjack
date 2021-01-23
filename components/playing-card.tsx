export default function PlayingCard({
    suit,
    value,
    back,
}: {
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
}) {
    return (
        <svg
            style={{ margin: '10px' }}
            width='169.075'
            height='244.64'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='xMinYMid'
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
