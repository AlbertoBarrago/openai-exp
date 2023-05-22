'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {
    checkIfHasLessThan1000Chars,
    checkIfIsGreaterThan4MB, createImageOpenai,
    handleJpeg, handlePng, produceImageVariations,
    showAlert,
    showConfettiForSeconds, uploadImage
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
import {SubDescription} from "@/components/dashboard/subDescription";


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

    const insertImageOnMongo = async (imageUrl, title, type) => {
        let body = {
            urlImage: imageUrl,
            userId: userId,
            title: title ? title : "random title",
            creationDate: new Date().getTime(),
            type,
        };
        try {
            const response = await fetch('api/cloudinary/insert', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('success uploaded on mongo', data)
            }
        } catch (e) {
            console.error('error on upload image on mongo', e)
        }
    }
    const handleUploadOnMongoForClient = async (respUrl, setIsLoading) => {
        const respMongoUpload = await insertImageOnMongo(respUrl, 'randomTitle', 'edited')
        if(respMongoUpload){
            setIsLoading(false);
            showConfettiForSeconds(7, setConfettiWidth, setConfettiHeight);
        } else {
            setIsLoading(false);
            setAlertSetUp({show: true, message: 'Error on upload image on mongo'})
        }
    }
    const handleCreateForm = async (data) => {
        const isValid = checkIfHasLessThan1000Chars(data.createDescription);
        if (!isValid) {
            showAlert('Description must be less than 1000 chars', setAlertSetUp);
            setValueCreate('createDescription', '');
            return;
        }
        //loader
        setIsLoadingCreate(true);
        //create image
        const urlImageByOpenai = await createImageOpenai(data.createDescription)
        //upload image
        const urlFromCloudinary = await uploadImage(urlImageByOpenai)
        //insert image on mongo
        void insertImageOnMongo(urlFromCloudinary?.url, 'randomTitle', 'created')
        //set image
        setImageCreated(urlImageByOpenai)
        setIsLoadingCreate(false);
        //show confetti
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


        const respUrl = await produceImageVariations(data, userId, setValueVariation, setImageVariation);
        void handleUploadOnMongoForClient(respUrl, setIsLoadingVariation);
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
            const respUrl= await handleJpeg(data, setValue, setImageEdited);
            void handleUploadOnMongoForClient(respUrl, setIsLoadingEdited);
            return;
        }

        if (data.file[0].type === 'image/png') {
            const respUrl= await handlePng(data, setValue, setImageEdited);
            void handleUploadOnMongoForClient(respUrl, setIsLoadingEdited);
        }

    }

    const goToOpenaiApi = (type) => {
        window.open(`//platform.openai.com/docs/api-reference/images/${type.toString()}`, '_blank');
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
                        <SubDescription description={'Here you can test the OpenAi API'}/>
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
                                              apiUrl={'POST .../v1/result/generations'}
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
                            {(imageCreated !== '') && (
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
                                              apiUrl={'.../v1/result/variation'}
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
                                              apiUrl={'.../v1/result/edits'}
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