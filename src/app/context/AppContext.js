"use client";
import { createContext, useState } from "react";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({
    isMobile: Boolean,
    routes: [
      {
        index: 1,
        name: "Home",
        path: "/",
        icon: <i className="bi bi-house"></i>,
      },
      {
        index: 2,
        name: "Images",
        icon: <i className="bi bi-caret-down"></i>,
        hasSubRoutes: true,
        subRoutes: [
          {
            index: 2_1,
            name: "Labo...",
            path: "/image",
            icon: <i className="bi bi-images"></i>,
          },
          {
            index: 2_2,
            name: "Result",
            path: "/imageResult",
            icon: <i className="bi bi-book"></i>,
          },
        ],
      },
      {
        index: 3,
        name: "Text",
        path: "/text",
        icon: <i className="bi bi-fonts"></i>,
      },
      {
        index: 4,
        name: "Chat",
        path: "/chat",
        icon: <i className="bi bi-chat"></i>,
      },
    ],
    mobileRoutes: [
      {
        index: 6,
        name: "Home",
        path: "/",
        icon: <i className="bi bi-house"></i>,
      },
      {
        index: 7,
        name: "Text",
        path: "/text",
        icon: <i className="bi bi-fonts"></i>,
      },
      {
        index: 8,
        name: "Image",
        path: "/image",
        icon: <i className="bi bi-caret-down"></i>,
      },
      {
        index: 9,
        name: "Result",
        path: "/imageResult",
        icon: <i className="bi bi-images"></i>,
        isSubRoute: true,
      },
    ],
    privateRoutes: ["/", "/image", "/textResult", "/text", "/chat"],
    theme: "night",
  });

  let contextValue = {
    appState,
    setAppState,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
