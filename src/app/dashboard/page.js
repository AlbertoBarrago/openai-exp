'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {
    checkIfHasLessThan1000Chars,
    checkIfIsGreaterThan4MB, createImageOpenai,
    handleJpeg, handlePng,
    showAlert,
    showConfettiForSeconds
} from "../../../utils/utils";
import {AlertComponent} from "@/components/shared/alert";
import Confetti from "react-confetti";
import {LoaderComponent} from "@/components/layout/loader";
import {Uploader} from "@/components/dashboard/uploader";
import {UploaderImage} from "@/components/dashboard/uploaderImage";
import {useState} from "react";
import {Title} from "@/components/layout/title";
import {CreateForm} from "@/components/dashboard/createForm";
import {DescriptionTitle} from "@/components/dashboard/title";

export default function Dashboard() {
    const {isLoaded, isSignedIn} = useAuth(),
        [isLoading, setIsLoading] = useState(false),
        [isLoadingCreate, setIsLoadingCreate] = useState(false),
        [width, setWidth] = useState(0),
        [height, setHeight] = useState(0),
        [alertSetUp, setAlertSetUp] = useState({show: false, message: ''}),
        [imageEdited, setImageEdited] = useState(''),
        [imageCreated, setImageCreated] = useState(''),
        {
            setValue,
            register,
            handleSubmit,
            formState: {errors}
        } = useForm(),
        {
            setValue: setValueCreate,
            register: registerCreate,
            handleSubmit: handleSubmitCreate,
            formState: {errors: errorsCreate}
        } = useForm();


    const handleEditForm = async (data) => {
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
    const handleCreateForm = async (data) => {
        const isValid = checkIfHasLessThan1000Chars(data.createDescription);
        if (!isValid) {
            showAlert('Description must be less than 1000 chars', setAlertSetUp);
            setValueCreate('createDescription', '');
            return;
        }
        setIsLoadingCreate(true);
        const urlImageByOpenai = await createImageOpenai(data.createDescription)
        setImageCreated(urlImageByOpenai);
        setIsLoadingCreate(false);
        showConfettiForSeconds(7, setWidth, setHeight);
    }
    const goToOpenaiApi = (type) => {
        window.open(`//platform.openai.com/docs/api-reference/images/${type}`, '_blank');
    }
    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>;
        }
        return (
            <>
                <main className="w-100 p-2">
                    <div className={`grid grid-cols-1 text-center`}>
                        <Confetti width={width} height={height} numberOfPieces={100}/>
                        <Title title={'OpenAi'} subTitle={'Lab'}/>
                        {alertSetUp.show && (
                            <>
                                <div className={`w-auto m-auto mb-10`}>
                                    <AlertComponent
                                        message={alertSetUp.message}
                                        type={"error"}/>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-2 text-center`}>
                        <div>
                            <DescriptionTitle goToOpenaiApi={goToOpenaiApi}
                                              h3={'Create Image'}
                                              h4={'Here, we are testing:'}
                                              apiUrl={'POST https://api.openai.com/v1/images/generations'}
                                              type={'client'}/>
                            {(imageCreated === '' && !isLoadingCreate) && (
                                <>
                                    <CreateForm registerCreate={registerCreate}
                                                handleCreateForm={handleCreateForm}
                                                errorsCreate={errorsCreate}
                                                handleSubmitCreate={handleSubmitCreate}

                                    />
                                </>
                            )}
                            {isLoadingCreate && (
                                <LoaderComponent icon={"🤪"}/>
                            )}
                            {!isLoadingCreate && imageCreated !== '' && (
                                <>
                                    <UploaderImage
                                        isLoading={isLoadingCreate}
                                        imageEdited={imageCreated}
                                        setValue={setValueCreate}
                                        setImageEdited={setImageCreated}/>
                                </>
                            )}
                        </div>
                        <div>
                            <DescriptionTitle goToOpenaiApi={goToOpenaiApi}
                                              h3={'Edit Image'}
                                              h4={'Miss the mask... We are working on it...'}
                                              apiUrl={' POST https://api.openai.com/v1/images/edits'}
                                              type={'create-edit'}/>
                            {isLoading && (
                                <LoaderComponent
                                    icon={"🥷"}/>
                            )}
                            {!isLoading && !imageEdited && (
                                <>
                                    <Uploader
                                        errors={errors}
                                        handleForm={handleEditForm}
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
                        </div>
                    </div>
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