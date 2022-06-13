/* React */
import React from "react";

interface Props {
    children: React.ReactNode;
}

interface SessionContextValue {
    token: string;
    setToken: (param: string) => void;
}

const listInitial: SessionContextValue = {
    token: '',
    setToken:  data => {},
};

const SessionsContext = React.createContext<SessionContextValue>(listInitial);

export function SessionsProvider({ children }: Props) {
    const [ token, setToken ]  = React.useState<string>(listInitial.token);

    return (
        <SessionsContext.Provider value={{ token, setToken }}>
        {children}
        </SessionsContext.Provider>
    );
}

export function useSessions() {
    const context = React.useContext(SessionsContext);
    const  { token, setToken } = context;
    return { token, setToken };
}