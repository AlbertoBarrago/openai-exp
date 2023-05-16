'use client';
import Image from 'next/image'
import {
    checkIfIsGreaterThan4MB, convertJpegToPng, dataURLtoFile, editImage,
} from "../../utils/utils";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Confetti from 'react-confetti'
import {RedirectToSignIn, SignIn, useAuth, UserButton} from "@clerk/nextjs";
import {useRouter} from "next/navigation";


export default function Home() {
    const {isLoaded, userId, isSignedIn} = useAuth();
    const {router, pathname} = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [imageEdited, setImageEdited] = useState('');
    const {setValue, register, handleSubmit, formState: {errors}} = useForm();
    const handleForm = async (data) => {
        setIsLoading(true);
        if (checkIfIsGreaterThan4MB(data.file)) return;
        if (data.file[0].type === 'image/jpeg') {
            data.file = await convertJpegToPng(data.file[0]);
            void editImage(dataURLtoFile(data.file, 'random.png'), data.prompt, setImageEdited, setIsLoading, true).then(
                () => {
                    showConfettiForSeconds(7);
                    setValue('file', '');
                    setValue('prompt', '');
                }
            );
            return;
        }

        if (data.file[0].type !== 'image/png') {
            alert('File is greater than 4MB or is not a png file');
            setValue('file', '');
            setIsLoading(false);
            return;
        }

        void editImage(data.file, data.prompt, setImageEdited, setIsLoading, false).then(
            () => {
                showConfettiForSeconds(7);
                setValue('file', '');
                setValue('prompt', '');
            }
        );
    }
    const showConfettiForSeconds = (seconds) => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setTimeout(() => {
            setWidth(0);
            setHeight(0);
        }, seconds * 1000);
    }
    const signInHandle = async () => {
        void router.push('/sign-up');
    }

    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>;
        }
        return (
            <>
                <div className="container m-auto">
                    <div className="navbar w-100">
                        <div className="flex-1">
                            <a className="btn btn-ghost normal-case text-xl">Openai-Exp</a>
                        </div>
                        <div className="flex-none gap-2">
                            <UserButton className="text-left"/>
                        </div>
                    </div>
                    <main className="flex w-100 text-center flex-col justify-between p-3">
                        <Confetti width={width} height={height} numberOfPieces={100}/>
                        <h1 className="text-[3rem] mb-28">OpenAi
                            <span className="text-xs">Edit image</span></h1>
                        {isLoading && (<p className="text-[2rem] animate-spin">🐈‍</p>)}
                        {!isLoading && !imageEdited && (
                            <>
                                <form onSubmit={handleSubmit(handleForm)}>
                                    <p className="mb-4 text-xs">Upload .png or .jpeg file ＜ 4MB</p>
                                    <input type="file"
                                           placeholder="Upload png < 4MB"
                                           className="file-input w-full max-w-xs mb-2"
                                           {...register('file', {required: true})}/>

                                    <p className="mb-2 text-left">{errors.file && (
                                        <span className="text-red-600">This File is required</span>)}</p>

                                    <input type="text" placeholder="Type here"
                                           className="input w-full max-w-xs mb-2 border-2 border-white"
                                           {...register('prompt', {required: true})}/>

                                    <p className="mb-2 text-left">{errors.prompt && (
                                        <span className="text-red-600">This field is required</span>)}</p>

                                    <input className=" cursor-pointer" type="submit"/>
                                </form>
                            </>
                        )}
                        {imageEdited !== '' && (
                            <>
                                <div className="w-100 m-auto text-center">
                                    {imageEdited !== '' && (
                                        <Image className="shadow border-2 border-accent-focus"
                                               src={imageEdited}
                                               width={300}
                                               height={300} alt="AI"/>)}
                                    <button className="mt-3 m-auto btn btn-wide"
                                            onClick={() => setImageEdited('')}>Delete
                                        image
                                    </button>
                                </div>
                            </>
                        )}

                    </main>
                </div>
                <footer className="w-screen fixed bottom-5">
                    <div className="text-center m-auto w-52">
                        <p className="text-[0.8rem]">Made with ❤️ by <a href="https://albz.dev">albz</a></p>
                    </div>
                </footer>
            </>
        );
    }
    return (
        <>
            {checkAuth()}
        </>
    )
}


