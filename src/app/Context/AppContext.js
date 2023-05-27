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
                name: 'Images', icon: <i className="bi bi-images"></i>, hasSubRoutes: true,
                subRoutes: [
                    { name: 'Lab', path: '/lab', icon: <i className="bi bi-flask"></i> },
                    { name: 'Result', path: '/result', icon: <i className="bi bi-book"></i> },
                ]
            },
            {
                name: 'Text', path: '/text', icon: <i className="bi bi-fonts"></i>
            }

        ],
        privateRoutes: ['/', '/lab', '/result', '/text'],
        theme: 'night',
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
