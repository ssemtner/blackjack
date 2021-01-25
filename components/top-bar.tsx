import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { useAppContext } from './state'

export default function TopBar() {
    const state = useAppContext()

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h5'>Blackjack</Typography>
                <Typography variant='h6' style={{ marginLeft: 'auto' }}>
                    Balance: ${state.balance}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
