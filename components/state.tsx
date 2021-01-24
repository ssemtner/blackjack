import { createContext, useContext, useState } from 'react'

const Context = createContext({
    balance: 10,
    setBalance: (payload: number) => {},
    bet: 0,
    setBet: (payload: number) => {},
})

export function AppWrapper({ children }) {
    const [balance, setBalance] = useState<number>(10)
    const [bet, setBet] = useState<number>(10)

    let state = {
        balance,
        setBalance,
        bet,
        setBet,
    }

    return <Context.Provider value={state}>{children}</Context.Provider>
}

export function useAppContext() {
    return useContext(Context)
}
