'use client'
import {createContext, useContext, useState} from "react";
export const AppContext = createContext({});
export function AppContextProvider({ children }) {
    const [appState, setAppState] = useState(false);

    let contextValue = {
        appState,
        setAppState,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
