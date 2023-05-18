'use client';
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const privateRoutes = ['/', '/dashboard'];

export const Header = () => {
    const pathname = usePathname();
    const [isPrivateView, setIsPrivateView] = useState(null);

    useEffect(() => {
        console.log(pathname);
        if (privateRoutes.includes(pathname)) {
            setIsPrivateView(true);
        } else {
            setIsPrivateView(false);
        }
    }, [pathname]);

    return (
        <>
            {isPrivateView && (<div className="navbar">
                    <div className="flex-1">
                        <Link href="/" className="btn btn-ghost normal-case text-xl text-primary">Openai-Exp</Link>
                    </div>
                    <div className="flex-none gap-2 me-3">
                        <Link href="/dashboard" className="btn btn-ghost normal-case text-primary">Dashboard</Link>
                        <span><UserButton className="text-left"/></span>
                    </div>
                </div>
            )}
        </>
    )
}