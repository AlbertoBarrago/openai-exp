'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <>
            <main className={`flex flex-col text-center justify-center items-center`}>
                <Image src={'/cat404.png'} alt={'cat404'} width={340} height={340} className={`mb-5 mt-24`}/>
                    <h1 className={`text-[5rem]`}>Meow, so sad...</h1>
                    <p className={`text-[2rem]`}>Nothing here!</p>
                   <button onClick={()=> router.back()} className={`btn btn-default animate-bounce mt-10 mb-48`}>Back</button>
            </main>
        </>
    );
}