import {
    Button,
    Collapse,
    Grid,
    IconButton,
    TextField,
} from '@material-ui/core'
// import CloseIcon from '@material-ui/icons/close'
import Alert from '@material-ui/lab/Alert'
import { useRouter } from 'next/dist/client/router'
import React, { ChangeEvent, useState } from 'react'
import { useAppContext } from '../components/state'

export default function Bet() {
    const state = useAppContext()
    const router = useRouter()
    const [amount, setAmmount] = useState<number>(5)
    const [status, setStatus] = useState<false | string>(false)

    function allIn() {
        setAmmount(state.balance)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setAmmount(Number(event.target.value))
    }

    function submit() {
        if (amount > state.balance) {
            setStatus('You cannot bet more than your balance')
        } else if (amount < 1) {
            setStatus('You must bet something')
        } else {
            setStatus(false)
            state.setBet(amount)
            state.setBalance(state.balance - amount)
            router.push('/game')
        }
    }

    return (
        <Grid container direction='column'>
            <Collapse in={status != false} style={{ margin: 10 }}>
                <Alert
                    severity='error'
                    action={
                        <IconButton
                            aria-label='dismiss'
                            size='small'
                            onClick={() => {
                                setStatus(false)
                            }}
                        >
                            {/* <CloseIcon /> */}
                            X
                        </IconButton>
                    }
                >
                    {status}
                </Alert>
            </Collapse>
            <Grid
                item
                container
                justify='center'
                alignItems='center'
                spacing={4}
            >
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={allIn}
                    >
                        All In
                    </Button>
                </Grid>
                <Grid item>
                    <TextField
                        variant='outlined'
                        id='amount'
                        label='Amount'
                        type='number'
                        value={amount}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={submit}
                    >
                        Place Bet
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
