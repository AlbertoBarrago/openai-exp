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
            {!isMobile && (<footer className="w-screen absolute bottom-5">
                <div className="text-center m-auto w-52">
                    <p className="text-[0.8rem]">Made with ❤️ by <a href="https://albz.dev">albz</a></p>
                </div>
            </footer>)}
        </>
    )
}