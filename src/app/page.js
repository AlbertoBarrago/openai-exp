'use client';
import {
    checkIfIsGreaterThan4MB, editImage, showAlert, showConfettiForSeconds,
} from "../../utils/utils";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {RedirectToSignIn, useAuth, UserButton} from "@clerk/nextjs";
import {UploaderComponent} from "@/components/uploaderComponent";
import {UploaderImageComponent} from "@/components/uploaderImageComponent";
import Confetti from 'react-confetti'
import Link from "next/link";
import {AlertComponent} from "@/components/alert";
import {LoaderComponent} from "@/components/loader";


export default function Home() {
    const {isLoaded, isSignedIn} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [alertSetUp, setAlertSetUp] = useState({show: false, message: ''});
    const [imageEdited, setImageEdited] = useState('');
    const {setValue, register, handleSubmit, formState: {errors}} = useForm();
    const handleForm = async (data) => {
        setIsLoading(true);

        if (checkIfIsGreaterThan4MB(data.file)) {
            showAlert('File is greater than 4MB', setAlertSetUp);
            setValue('file', '');
            setIsLoading(false);
            return;
        }

        if (data.file[0].type !== 'image/png') {
            showAlert('File is not a png', setAlertSetUp);
            setValue('file', '');
            setIsLoading(false);
            return;
        }

       void editImage(data.file, data.prompt, setImageEdited).then(
            () => {
                showConfettiForSeconds(7, setWidth, setHeight);
                setValue('file', '');
                setValue('prompt', '');
                setIsLoading(false)
            }
        );
    }

    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>;
        }
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
                <div className="container m-auto">
                    {alertSetUp.show && (<AlertComponent message={alertSetUp.message} type={"error"}/>)}
                    <main className="flex w-100 text-center flex-col justify-between p-3">
                        <Confetti width={width} height={height} numberOfPieces={100}/>
                        <h1 className="text-[3rem] mb-28">OpenAi
                            <span className="text-xs">Edit image</span></h1>
                        {isLoading && (<LoaderComponent icon={"🥷"}/>)}
                        {!isLoading && !imageEdited && (
                            <>
                                <UploaderComponent errors={errors} handleForm={handleForm} handleSubmit={handleSubmit} register={register}/>
                            </>
                        )}
                        {imageEdited !== '' && (
                            <>
                               <UploaderImageComponent imageEdited={imageEdited} setImageEdited={setImageEdited}/>
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


