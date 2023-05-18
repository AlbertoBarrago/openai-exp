'use client';
import {useEffect, useState} from "react";

export const Footer = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            }
            if (window.innerWidth > 768) {
                setIsMobile(false);
            }
        })
        return () => {
            window.removeEventListener('resize', () => {
                if (window.innerWidth < 768) {
                    setIsMobile(true);
                }
                if (window.innerWidth > 768) {
                    setIsMobile(false);
                }
            })
        }
    }, [])
    return (
        <>
            {!isMobile && (<footer className="sticky top-[100vh]">
                <div className="text-center m-auto w-52 pb-5">
                    <p className="text-[0.8rem]">Made with <span className={`animate-pulse`}>❤️</span> by <a href="https://albz.dev">albz</a></p>
                </div>
            </footer>)}
        </>
    )
}