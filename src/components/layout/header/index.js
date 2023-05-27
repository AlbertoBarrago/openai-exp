'use client';
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {handleClick} from "../../../../modules/utils";
import {AppContext} from "@/app/Context/AppContext";
import {Swap} from "react-daisyui";

let preventDoubleCb = 0;
export const Header = () => {
    const pathname = usePathname(),
        [isPrivateView, setIsPrivateView] = useState(null),
        {appState, setAppState} = useContext(AppContext);

    const toggleTheme = () => {
        if(preventDoubleCb === 0) setAppState({...appState, theme: appState.theme === 'night' ? 'light' : 'night'});
        document.querySelector('html').setAttribute('data-theme', appState.theme);
        preventDoubleCb++;
        setTimeout(() => preventDoubleCb = 0, 0);
    }

    const swampConfig = {
        onElement:  (<i className="bi bi-sun-fill"></i>),
        offElement: (<i className="bi bi-moon-fill"></i>),
        flip: true,
    }


    const renderMenu = () => {
        if (!appState.isMobile) {
            return (
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {appState.routes.map((route, i) => (
                            <li className={`mb-3`} key={i}>
                                <Link href={route.path}
                                      onClick={handleClick}
                                      className={`btn btn-ghost text-secondary me-2 ${pathname === route.path ? 'btn-active' : ''}`}>
                                    {route.icon} {route.name}
                                </Link>
                            </li>))}
                    </ul>
                </div>
            )
        }
        if (appState.isMobile) {
            return (
                <div className="dropdown dropdown-end me-4">
                    <label tabIndex={0} className="btn btn-ghost btn-xs">
                        Menù
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {appState.routes.map((route, i) => (
                            <li className={`mb-3`} key={i}>
                                <Link href={route.path}
                                      onClick={handleClick}
                                      className={`btn btn-ghost text-secondary ${pathname === route.path ? 'btn-active' : ''}`}>
                                    {route.icon} {route.name}
                                </Link>
                            </li>))}
                    </ul>
                </div>
            )
        }

    }

    const eventResize = () => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setAppState({...appState, isMobile: true})

            }
            if (window.innerWidth > 768) {
                setAppState({...appState, isMobile: false})
            }
        })
        return () => {
            window.removeEventListener('resize', () => {
                if (window.innerWidth < 768) {
                    setAppState({...appState, isMobile: true})
                }
                if (window.innerWidth > 768) {
                    setAppState({...appState, isMobile: false})
                }
            })
        }
    }

    const eventLoad = () => {
        window.addEventListener('load', () => {
            if (window.innerWidth < 768) {
                setAppState({...appState, isMobile: true})

            }
            if (window.innerWidth > 768) {
                setAppState({...appState, isMobile: false})
            }
        });
        return () => {
            window.removeEventListener('load', () => {
                if (window.innerWidth < 768) {
                    setAppState({...appState, isMobile: true})
                }
                if (window.innerWidth > 768) {
                    setAppState({...appState, isMobile: false})
                }
            })
        }
    }
    const checkRoutes = () => {
        if (appState.privateRoutes.includes(pathname)) {
            setIsPrivateView(true);
        } else {
            setIsPrivateView(false);
        }
    }

    useEffect(() => {
        checkRoutes();
        eventLoad();
        eventResize();
    }, [pathname]);

    return (<>
        {isPrivateView && (<div className="navbar">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl text-primary">
                    <svg width="24px" height="24px" viewBox="140 140 520 520">
                        <path
                            d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"
                            fill="#FFFFFF">
                        </path>
                    </svg>
                    <span className={`ms-2 text-secondary`}>Openai-Exp</span></Link>
                <Swap onClick={toggleTheme} {...swampConfig}/>
            </div>
            <div className="flex-none gap-2 me-5">
                {renderMenu()}
                <div className={`relative me-3 ${!appState.isMobile ? 'bottom-2' : ''}`}><UserButton/></div>
            </div>
        </div>)}
    </>)
}