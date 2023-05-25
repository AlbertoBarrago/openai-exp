'use client'
import {createContext, useState} from "react";

export const AppContext = createContext({});

export function AppContextProvider({children}) {
    const [appState, setAppState] = useState({
        isMobile: Boolean,
        routes: [
            {
                name: 'Home', path: '/', icon: <i className="bi bi-house"></i>
            },
            {
                name: 'Images', path: '/lab', icon: <i className="bi bi-images"></i>
            }, {
                name: 'Result', path: '/result', icon: <i className="bi bi-cone"></i>
            },

        ],
        privateRoutes: ['/', '/lab', '/result', '/text']
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
