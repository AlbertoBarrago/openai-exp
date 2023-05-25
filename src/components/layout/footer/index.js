'use client';
import Link from "next/link";
import {ScrollToTop} from "@/components/commons/scrollToTop";

export const Footer = () => {
    return (
        <>
            {(<footer className="sticky top-[100vh]">
                <ScrollToTop/>
                <div className="text-center m-auto w-52 pb-5">
                    <Link className={`btn btn-ghost  text-primary mb-1`}
                          target={'_blank'}
                          href={`https://www.paypal.com/donate/?hosted_button_id=G8VY4KPVXMMHG`}> 🍺</Link>
                    <p className="text-[0.8rem]">Made with <span className={`animate-pulse`}>❤️</span> by <a href="https://albz.dev">albz</a></p>
                </div>
            </footer>)}
        </>
    )
}