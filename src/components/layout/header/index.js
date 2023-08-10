"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { handleClick } from "../../../../modules/utils";
import { AppContext } from "@/app/context/appContext";
import { Swap } from "react-daisyui";

export const Header = () => {
  const pathname = usePathname(),
    [isPrivateView, setIsPrivateView] = useState(null),
    { appState, setAppState } = useContext(AppContext);

  const toggleTheme = () => {
    setAppState({
      ...appState,
      theme: appState.theme === "business" ? "light" : "business",
    });
  };

  const swampConfig = {
    onElement: <i className="bi bi-sun-fill"></i>,
    offElement: <i className="bi bi-moon-fill"></i>,
    flip: true,
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", appState.theme);
  }, [appState.theme]);

  /**
   * Close daisy dialog
   */
  const handleClick = () => {
    const detail = document.querySelector("details[open]");
    if (detail) {
      detail.removeAttribute("open");
    }
  };

  const responsiveMenu = () => {
    return (
      <div className="navbar pe-0 ps-0 md:pe-10 md:ps-10 xl:pe-20 xl:ps-20">
        <div className="navbar-start ms-2">
          <div className="dropdown">
            <label tabIndex={0} className="cursor-pointer lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content shadow bg-base-100 rounded-box w-32 z-[500] mt-2"
            >
              {appState.mobileRoutes.map((route) => (
                <li className={`w-auto bg-auto`} key={route.index}>
                  {!route.hasSubRoutes && (
                    <Link
                      href={route.path}
                      onClick={handleClick}
                      className={`mb-1 text-secondary ${
                        pathname === route.path ? "btn-active" : ""
                      }`}
                    >
                      {route.icon} {route.name}
                    </Link>
                  )}
                  {route.hasSubRoutes && (
                    <>
                      <span>{route.name}</span>
                      <ul className={`p-2`}>
                        {route.subRoutes.map((subRoute) => (
                          <li key={subRoute.index}>
                            <Link
                              href={subRoute.path}
                              onClick={handleClick}
                              className={`mb-1 text-secondary ${
                                pathname === subRoute.path ? "btn-active" : ""
                              }`}
                            >
                              {subRoute.icon} {subRoute.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/"
            className="ms-2 btn btn-ghost normal-case text-xl text-primary"
          >
            <svg width="24px" height="24px" viewBox="140 140 520 520">
              <path
                d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"
                fill={appState.theme === "night" ? "#FFFFFF" : "#000000"}
              ></path>
            </svg>
            <span className={`ms-2 text-secondary`}>Openai-Exp</span>
          </Link>
          <Swap className={`ms-2`} onChange={toggleTheme} {...swampConfig} />
        </div>
        <div className="navbar-end">
          <div className={`hidden lg:flex`}>
            {appState.routes.map((route) => (
              <ul
                className={`menu menu-horizontal px-1`}
                key={route.index}
                tabIndex={route.hasSubRoutes ? 0 : ""}
              >
                {route.hasSubRoutes && (
                  <>
                    <li tabIndex={0}>
                      <details>
                        <summary className={`btn btn-ghost pt-4`}>
                          <span className={` text-secondary uppercase`}>
                            {route.name}
                          </span>
                        </summary>
                        <ul>
                          {route.subRoutes.map((subRoute) => (
                            <li tabIndex={0} key={subRoute.index}>
                              <Link
                                href={subRoute.path}
                                className={`z-[500] text-secondary ${
                                  pathname === subRoute.path ? "btn-active" : ""
                                }`}
                                onClick={handleClick}
                              >
                                {subRoute.icon} {subRoute.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  </>
                )}
                {!route.hasSubRoutes && (
                  <Link
                    href={route.path}
                    onClick={handleClick}
                    className={`btn btn-ghost rounded-none text-secondary me-2 ${
                      pathname === route.path ? "btn-active" : ""
                    }`}
                  >
                    {route.icon} {route.name}
                  </Link>
                )}
              </ul>
            ))}
          </div>
          <div className={`me-3 ps-5`}>
            <UserButton />
          </div>
        </div>
      </div>
    );
  };

  const eventResize = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setAppState({ ...appState, isMobile: true });
      }
      if (window.innerWidth > 768) {
        setAppState({ ...appState, isMobile: false });
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setAppState({ ...appState, isMobile: true });
        }
        if (window.innerWidth > 768) {
          setAppState({ ...appState, isMobile: false });
        }
      });
    };
  };

  const eventLoad = () => {
    window.addEventListener("load", () => {
      if (window.innerWidth < 768) {
        setAppState({ ...appState, isMobile: true });
      }
      if (window.innerWidth > 768) {
        setAppState({ ...appState, isMobile: false });
      }
    });
    return () => {
      window.removeEventListener("load", () => {
        if (window.innerWidth < 768) {
          setAppState({ ...appState, isMobile: true });
        }
        if (window.innerWidth > 768) {
          setAppState({ ...appState, isMobile: false });
        }
      });
    };
  };
  const checkRoutes = () => {
    if (appState.privateRoutes.includes(pathname)) {
      setIsPrivateView(true);
    } else {
      setIsPrivateView(false);
    }
  };

  useEffect(() => {
    checkRoutes();
    eventLoad();
    eventResize();
  }, []);

  return <>{isPrivateView && <>{responsiveMenu()}</>}</>;
};
