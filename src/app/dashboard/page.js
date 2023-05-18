'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {
    checkIfHasLessThan1000Chars,
    checkIfIsGreaterThan4MB, createImageOpenai,
    handleJpeg, handlePng, produceImageVariations,
    showAlert,
    showConfettiForSeconds
} from "../../../utils/utils";
import {AlertComponent} from "@/components/shared/alert";
import Confetti from "react-confetti";
import {Uploader} from "@/components/dashboard/uploader";
import {UploaderImage} from "@/components/dashboard/uploaderImage";
import {useState} from "react";
import {Title} from "@/components/layout/title";
import {CreateImage} from "@/components/dashboard/createImage";
import {DescriptionTitle} from "@/components/dashboard/title";
import {UploaderVariation} from "@/components/dashboard/variationUploader";

export default function Dashboard() {
    const {isLoaded, isSignedIn, userId} = useAuth(),
        [isLoadingEdited, setIsLoadingEdited] = useState(false),
        [isLoadingCreate, setIsLoadingCreate] = useState(false),
        [isLoadingVariation, setIsLoadingVariation] = useState(false),
        [confettiWidth, setConfettiWidth] = useState(0),
        [confettiHeight, setConfettiHeight] = useState(0),
        [alertSetUp, setAlertSetUp] = useState({show: false, message: ''}),
        [imageEdited, setImageEdited] = useState(''),
        [imageCreated, setImageCreated] = useState(''),
        [imageVariation, setImageVariation] = useState(''),
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
        } = useForm(),
        {
            setValue: setValueVariation,
            register: registerVariation,
            handleSubmit: handleSubmitVariation,
            formState: {errors: errorsVariation}
        } = useForm();

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
        showConfettiForSeconds(7, setConfettiWidth, setConfettiHeight);
    }
    const handleVariationForm = async (data) => {
        setIsLoadingVariation(true);

        if (data.file[0].type !== 'image/png' && data.file[0].type !== 'image/jpeg') {
            showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
            setValueVariation('file', '');
            setIsLoadingVariation(false);
            return;
        }


        if (checkIfIsGreaterThan4MB(data.file)) {
            showAlert('File is greater than 4MB', setAlertSetUp);
            setValueVariation('file', '');
            setIsLoadingVariation(false);
            return;
        }


        void produceImageVariations(data, userId, setValueVariation, setIsLoadingVariation, setImageVariation, setConfettiWidth, setConfettiHeight);

    }
    const handleEditForm = async (data) => {
        setIsLoadingEdited(true);

        if (data.file[0].type !== 'image/png' && data.file[0].type !== 'image/jpeg') {
            showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
            setValue('file', '');
            setIsLoadingEdited(false);
            return;
        }

        if (!checkIfHasLessThan1000Chars(data.prompt)) {
            showAlert('Prompt must be less than 1000 chars', setAlertSetUp);
            setValue('prompt', '');
            setIsLoadingEdited(false);
            return;
        }

        if (checkIfIsGreaterThan4MB(data.file)) {
            showAlert('File is greater than 4MB', setAlertSetUp);
            setValue('file', '');
            setIsLoadingEdited(false);
            return;
        }

        if (data.file[0].type === 'image/jpeg') {
            void handleJpeg(data, setValue, setImageEdited, setIsLoadingEdited, setConfettiWidth, setConfettiHeight);
            return;
        }

        if (data.file[0].type === 'image/png') {
            void handlePng(data, setValue, setImageEdited, setIsLoadingEdited, setConfettiWidth, setConfettiHeight);
        }

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
                <main className="container mx-auto text-center w-100 p-2">
                    <div className={`grid grid-cols-1 text-center`}>
                        <Confetti width={confettiWidth} height={confettiHeight} numberOfPieces={100}/>
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
                    <div className={`grid grid-cols-1 xl:grid-cols-2 text-center`}>
                        <div className="p-3 bg-neutral rounded m-5">
                            <DescriptionTitle goToOpenaiApi={goToOpenaiApi}
                                              h3={'Create Image'}
                                              h4={'Here, we are testing:'}
                                              apiUrl={'POST https://api.openai.com/v1/images/generations'}
                                              type={'client'}/>

                            {(imageCreated === '') && (
                                <>
                                    <CreateImage registerCreate={registerCreate}
                                                 handleCreateForm={handleCreateForm}
                                                 errorsCreate={errorsCreate}
                                                 handleSubmitCreate={handleSubmitCreate}
                                                 isLoadingCreate={isLoadingCreate}/>
                                </>
                            )}
                            {imageCreated !== '' && (
                                <>
                                    <UploaderImage
                                        isLoading={isLoadingCreate}
                                        imageEdited={imageCreated}
                                        setValue={setValueCreate}
                                        setImageEdited={setImageCreated}/>
                                </>
                            )}
                        </div>
                        <div className="p-3 bg-neutral rounded m-5">
                            <DescriptionTitle goToOpenaiApi={goToOpenaiApi}
                                              h3={'Create Variation'}
                                              h4={'Upload an image to create a variation of it'}
                                              apiUrl={'POST https://api.openai.com/v1/images/variation'}
                                              type={'create-variation'}/>

                            {imageVariation === '' && (
                                <>
                                    <UploaderVariation
                                        errors={errorsVariation}
                                        handleForm={handleVariationForm}
                                        handleSubmit={handleSubmitVariation}
                                        register={registerVariation}
                                        isLoading={isLoadingVariation}/>
                                </>
                            )}
                            {imageVariation !== '' && (
                                <>
                                    <UploaderImage
                                        isLoading={isLoadingVariation}
                                        imageEdited={imageVariation}
                                        setImageEdited={setImageVariation}/>
                                </>
                            )}
                        </div>
                        <div className="p-3 bg-neutral rounded m-5">
                            <DescriptionTitle goToOpenaiApi={goToOpenaiApi}
                                              h3={'Edit Image'}
                                              h4={'Upload a mask with specific area to edit your image'}
                                              apiUrl={' POST https://api.openai.com/v1/images/edits'}
                                              type={'create-edit'}/>

                            {imageEdited === '' && (
                                <>
                                    <Uploader
                                        errors={errors}
                                        handleForm={handleEditForm}
                                        handleSubmit={handleSubmit}
                                        register={register}
                                        isLoading={isLoadingEdited}/>
                                </>
                            )}
                            {imageEdited !== '' && (
                                <>
                                    <UploaderImage
                                        isLoading={isLoadingEdited}
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