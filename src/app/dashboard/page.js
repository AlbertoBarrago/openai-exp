'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {
    checkIfIsGreaterThan4MB, convertFileToType,
    editImage, handleJpeg, handlePng,
    showAlert,
    showConfettiForSeconds
} from "../../../utils/utils";
import {AlertComponent} from "@/components/alert";
import Confetti from "react-confetti";
import {LoaderComponent} from "@/components/loader";
import {Uploader} from "@/components/uploader";
import {UploaderImage} from "@/components/uploaderImage";
import {useState} from "react";
import {Title} from "@/components/title";

export default function Dashboard() {
    const {isLoaded, isSignedIn} = useAuth(),
        [isLoading, setIsLoading] = useState(false),
        [width, setWidth] = useState(0),
        [height, setHeight] = useState(0),
        [alertSetUp, setAlertSetUp] = useState({show: false, message: ''}),
        [imageEdited, setImageEdited] = useState(''),
        {setValue, register, handleSubmit, formState: {errors}} = useForm();

    const handleForm = async (data) => {
        setIsLoading(true);

        if (data.file[0].type !== 'image/png' && data.file[0].type !== 'image/jpeg') {
            showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
            setValue('file', '');
            setIsLoading(false);
            return;
        }

        if (checkIfIsGreaterThan4MB(data.file)) {
            showAlert('File is greater than 4MB', setAlertSetUp);
            setValue('file', '');
            setIsLoading(false);
            return;
        }

        if (data.file[0].type === 'image/jpeg') {
            void handleJpeg(data, setValue, setImageEdited, setIsLoading, setWidth, setHeight);
            return;
        }

        if (data.file[0].type === 'image/png') {
            void handlePng(data, setValue, setImageEdited, setIsLoading, setWidth, setHeight);
        }

    }
    const goToOpenaiApi = () => {
        window.open('https://platform.openai.com/docs/api-reference/images/create-edit', '_blank');
    }
    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>;
        }
        return (
            <>
                <main className="flex w-100 text-center flex-col justify-between p-2">
                    <Confetti width={width} height={height} numberOfPieces={100}/>
                    <Title title={'OpenAi'} subTitle={'Edit image'}/>
                    <article className="m-auto w-100 mb-3">
                        <h4>Here, we are testing:
                            <br/>
                            <code className={`text-xs md:text-[1rem] relative top-2 cursor-pointer rounded bg-primary text-red-600 p-1 mt-3`} onClick={() => goToOpenaiApi()}>
                                POST https://api.openai.com/v1/images/edits
                            </code>
                        </h4>
                    </article>
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
                        <LoaderComponent
                            icon={"🥷"}/>
                    )}
                    {!isLoading && !imageEdited && (
                        <>
                            <Uploader
                                errors={errors}
                                handleForm={handleForm}
                                handleSubmit={handleSubmit}
                                register={register}/>
                        </>
                    )}
                    {imageEdited !== '' && (
                        <>
                            <UploaderImage
                                isLoading={isLoading}
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