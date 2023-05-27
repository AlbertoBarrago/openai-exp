import {scrollToTop} from "../../../../modules/utils";
import {useEffect, useState} from "react";

export const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 400) {
            setShowScroll(true)
        } else if (showScroll && window.scrollY <= 400) {
            setShowScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }

    }, [showScroll])


    return (
        <>
            {showScroll && (
                <div className={`flex justify-center`}>
                    <div className="sticky right-10" onClick={() => scrollToTop()}>
                        <i className="bi bi-arrow-up-circle hover:cursor-pointer text-primary text-[1.5rem] duration-300 transition ease-in-out hover:text-secondary hover:delay-75"></i>
                    </div>
                </div>
            )}
        </>
    )
}