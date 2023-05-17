import Link from "next/link";
import {UserButton} from "@clerk/nextjs";

export const Header = () => {
    return (
        <>
            <div className="navbar">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl text-primary">Openai-Exp</Link>
                </div>
                <div className="flex-none gap-2 me-3">
                    <span><UserButton className="text-left"/></span>
                </div>
            </div>
        </>
    )
}