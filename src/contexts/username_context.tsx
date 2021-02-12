import React, { useContext, useMemo, useState } from 'react';

interface UsernameContextValue {
    username: string;
    setUsername: (_: string) => any;
    accepted: boolean;
    setAccepted: (_: boolean) => any;
}

const contextDefault: UsernameContextValue = {
    username: '',
    setUsername: (_: string) => { },
    accepted: false,
    setAccepted: (_: boolean) => {},
}

const UsernameContext = React.createContext(contextDefault)

export function UsernameProvider(props: any) {
    const [id, setId] = useState('');
    const [acc, setAcc] = useState(false)
    const value = useMemo((): UsernameContextValue => {
        return {
            username: id,
            setUsername: setId,
            accepted: acc,
            setAccepted: setAcc
        }
    }, [id, acc])
    return <UsernameContext.Provider value={value} {...props} />
}

export function useUsername() {
    const context = useContext(UsernameContext)
    if (!context)
        throw new Error('useId must be used within a IDProvider')

    return context
}