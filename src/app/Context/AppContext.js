'use client'
import {createContext, useContext, useState} from "react";
export const AppContext = createContext({});
export function AppContextProvider({ children }) {
    const [appState, setAppState] = useState({
        isMobile: false,
        routes: [
            {
                name: 'Home', path: '/', icon: <i className="bi bi-house"></i>
            }, {
                name: 'Openai', path: '/lab', icon: <i className="bi bi-lightning"></i>
            }, {
                name: 'Result', path: '/result', icon: <i className="bi bi-bucket-fill"></i>
            }
        ],
        privateRoutes: ['/', '/lab', '/result']
    });


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
