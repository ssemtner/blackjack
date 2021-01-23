import { Button } from '@material-ui/core'
import PlayingCard from '../components/playing-card'

export default function Home() {
    return (
        <>
            <PlayingCard suit="spade" value="king"/>
            <PlayingCard suit="heart" value="2" back/>
            
        </>
    )
}
