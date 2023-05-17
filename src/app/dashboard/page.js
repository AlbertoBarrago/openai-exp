'use client';
import {RedirectToSignIn, useAuth, UserButton} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {checkIfIsGreaterThan4MB, editImage, showAlert, showConfettiForSeconds} from "../../../utils/utils";
import Link from "next/link";
import {AlertComponent} from "@/components/alert";
import Confetti from "react-confetti";
import {LoaderComponent} from "@/components/loader";
import {UploaderComponent} from "@/components/uploaderComponent";
import {UploaderImageComponent} from "@/components/uploaderImageComponent";
import {useState} from "react";
import {Title} from "@/components/title";

export default function Dashboard() {
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
                <main className="flex w-100 text-center flex-col justify-between p-3">
                    <Confetti width={width} height={height} numberOfPieces={100}/>
                    <Title title={'OpenAi'} subTitle={'Edit image'}/>
                    {alertSetUp.show && (
                        <>
                            <div className={`w-auto m-auto mb-10`}>
                                <AlertComponent
                                    message={alertSetUp.message}
                                    type={"error"}/>
                            </div>
                        </>
                    )}
                    {isLoading && (
                        <>
                            <LoaderComponent
                                icon={"🥷"}/>
                        </>
                    )}
                    {!isLoading && !imageEdited && (
                        <>
                            <UploaderComponent
                                errors={errors}
                                handleForm={handleForm}
                                handleSubmit={handleSubmit}
                                register={register}/>
                        </>
                    )}
                    {imageEdited !== '' && (
                        <>
                            <UploaderImageComponent
                                imageEdited={imageEdited}
                                setImageEdited={setImageEdited}/>
                        </>
                    )}
                </main>
            </>
        );
    }
    return (
        <>
            {checkAuth()}
        </>
    )
}