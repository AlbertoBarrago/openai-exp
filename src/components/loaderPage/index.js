'use client'
import {useEffect, useState} from "react";

export const LoaderPage = () => {
    const [loaderNumber, setLoaderNumber] = useState(0);
    const eachTimeLoaderNumber = () => {
        setInterval(() => {
            setLoaderNumber(loaderNumber + 1);
        },10);
    }

    useEffect(() => {
        eachTimeLoaderNumber();
    });

    return (
        <>
            <div className="radial-progress" style={{"--value":loaderNumber}}>${loaderNumber}</div>
        </>
    )
}