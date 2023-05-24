'use client';
import {useEffect} from 'react';
import {renderErrorMessage} from "../../../utils/errors";

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <main className={`flex h-screen flex-col items-center justify-center`}>
                {/*<h2 className={`mb-5 text-xl`}><span className={`text-red-500`}>Error:</span> {error.message}</h2>*/}
                {renderErrorMessage(error.code)}
                <button
                    className={`btn btn-primary`}
                    onClick={() => reset()}>
                    Try again
                </button>
            </main>
        </div>
    );
}