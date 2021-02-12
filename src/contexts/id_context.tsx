import React, { useContext, useMemo, useState } from 'react';

interface IdContextValue {
    id: string;
    setId: (_: string) => any
}

const usernameContextDefault: IdContextValue = {
    id: '',
    setId: (_: string) => { }
}

const IDContext = React.createContext(usernameContextDefault)

export function IDProvider(props: any) {
    const [ id, setId ]= useState('');
    const value = useMemo((): IdContextValue => {
        return { id: id, setId: setId }
    }, [id])
    return <IDContext.Provider value={value} {...props} />
}

export function useId() {
    const context = useContext(IDContext)
    if (!context)
        throw new Error('useId must be used within a IDProvider')
    
    return context
}