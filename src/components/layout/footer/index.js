'use client';
import Link from "next/link";
import {ScrollToTop} from "@/components/commons/scrollToTop";

export const Footer = () => {
    return (
        <>
            {(<footer className="sticky top-[100vh]">
                <ScrollToTop/>
                <div className="text-center m-auto w-52 pb-5">
                    <p className="text-[0.8rem]">
                        <a href="https://albz.dev">🥷 albz </a> - <a target={'_blank'} href="https://www.paypal.com/donate/?hosted_button_id=G8VY4KPVXMMHG">Offer me a 🍺</a> </p>
                </div>
            </footer>)}
        </>
    )
}