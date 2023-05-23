'use client';
import {useEffect, useState} from "react";
import Link from "next/link";

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
                    <Link className={`btn btn-ghost text-red-600 mb-1`} href={`https://www.paypal.com/donate/?hosted_button_id=G8VY4KPVXMMHG`}>Buy me a 🍺</Link>
                    <p className="text-[0.8rem]">Made with <span className={`animate-pulse`}>❤️</span> by <a href="https://albz.dev">albz</a></p>
                </div>
            </footer>)}
        </>
    )
}