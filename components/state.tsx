import { createContext, useContext } from 'react'

const Context = createContext({ balance: 10 })

export function AppWrapper({ children }) {
    let state: { balance: number } = {
        balance: 10,
    }

    return <Context.Provider value={state}>{children}</Context.Provider>
}

export function useAppContext() {
    return useContext(Context)
}
