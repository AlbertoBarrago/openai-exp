'use client'
import {createContext, useState} from "react";

export const AppContext = createContext({});

export function AppContextProvider({children}) {
    const [appState, setAppState] = useState({
        isMobile: Boolean,
        routes: [
            {
                index: 0, name: 'Home', path: '/', icon: <i className="bi bi-house"></i>
            },

            {
                index:3, name: 'Text', path: '/text', icon: <i className="bi bi-fonts"></i>
            },
            {
                index: 1, name: 'Images', icon: <i className="bi bi-caret-down"></i>, hasSubRoutes: true,
                subRoutes: [
                    { index: 1_1, name: 'Lab', path: '/lab', icon: <i className="bi bi-images"></i> },
                    { index: 1_2, name: 'Result', path: '/result', icon: <i className="bi bi-book"></i> },
                ]
            },

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
