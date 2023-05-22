'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {
    checkIfHasLessThan1000Chars,
    checkIfIsGreaterThan4MB,
    createImageOpenai,
    handleJpeg,
    handlePng,
    produceImageVariations,
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
    /**
     * Handle upload image on cloudinary
     * @param imageUrl
     * @return {Promise<*>}
     */
    const uploadOnCloudinary = async (imageUrl) => {
        try {
            const cloudResp = await fetch(`api/cloudinary/insertByUrl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl
                })
            })

            const result = await cloudResp.json();
            return result.data;
        } catch (e) {
            console.error('error on upload image on cloudinary', e)
        }
    }
    /**
     * Handle insert image on mongo
     * @param imageUrl
     * @param title
     * @param type
     * @return {Promise<void>}
     */
    const insertImageOnMongo = async (imageUrl, title, type) => {
        let body = {
            urlImage: imageUrl,
            userId: userId,
            title: title ? title : "random title",
            creationDate: new Date().getTime(),
            type,
        };
        try {
            const response = await fetch('api/mongo/insert', {
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
            console.error('error on get image on mongo', e)
        }
    }
    /**
     *
     * @param respUrl
     * @param fileName
     * @return {Promise<void>}
     */
    const handleUploadOnMongoForClient = async (respUrl, fileName) => {
        return await insertImageOnMongo(respUrl, fileName, 'edited');
    }
    /**
     * Handle create image
     * @param data
     * @return {Promise<void>}
     */
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
        //get image
        const urlFromCloudinary = await uploadOnCloudinary(urlImageByOpenai)
        //insert image on mongo
        void insertImageOnMongo(urlFromCloudinary?.url, data.createDescription, 'created')
        //set image
        setImageCreated(urlImageByOpenai)
        setIsLoadingCreate(false);
        //show confetti
        showConfettiForSeconds(7, setConfettiWidth, setConfettiHeight);
    }
    /**
     * Handle variation image
     * @param data
     * @return {Promise<void>}
     */
    const handleVariationForm = async (data) => {
        setIsLoadingVariation(true);
        //check if file is png or jpeg
        if (data.file[0].type !== 'image/png' && data.file[0].type !== 'image/jpeg') {
            showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
            setValueVariation('file', '');
            setIsLoadingVariation(false);
            return;
        }
        // check if file is greater than 4MB
        if (checkIfIsGreaterThan4MB(data.file)) {
            showAlert('File is greater than 4MB', setAlertSetUp);
            setValueVariation('file', '');
            setIsLoadingVariation(false);
            return;
        }
        // Start process
        const respUrl = await produceImageVariations(data, userId);
        const urlFromCloudinary = await uploadOnCloudinary(respUrl)
        const mongoResp = handleUploadOnMongoForClient(urlFromCloudinary.url, data.file[0].name);
        //check if success
        if (mongoResp) {
            //show success
            setIsLoadingVariation(false)
            setValue('file', '');
            setImageVariation(respUrl);
        } else {
            //show error
            showAlert('Error on upload image on mongo', setAlertSetUp);
            setValue('file', '');
            setIsLoadingVariation(false);
        }
    }
    /**
     * Handle edit image
     * @param data
     * @return {Promise<void>}
     */
    const handleEditForm = async (data) => {
        setIsLoadingEdited(true);
        //check if file is png or jpeg
        if (data.file[0].type !== 'image/png' && data.file[0].type !== 'image/jpeg') {
            showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
            setValue('file', '');
            setIsLoadingEdited(false);
            return;
        }
        //check if prompt is less than 1000 chars
        if (!checkIfHasLessThan1000Chars(data.prompt)) {
            showAlert('Prompt must be less than 1000 chars', setAlertSetUp);
            setValue('prompt', '');
            setIsLoadingEdited(false);
            return;
        }
        //check if file is less than 4MB
        if (checkIfIsGreaterThan4MB(data.file)) {
            showAlert('File is greater than 4MB', setAlertSetUp);
            setValue('file', '');
            setIsLoadingEdited(false);
            return;
        }

        //Start process
        const respUrl = data.file[0].type !== 'image/jpeg' ? await handleJpeg(data) : await handlePng(data);
        const urlFromCloudinary = await uploadOnCloudinary(respUrl)
        const mongoResp = await handleUploadOnMongoForClient(urlFromCloudinary.url, data.file[0].name, setIsLoadingEdited);
        //check if success
        if (mongoResp) {
            //set success
            setValue('file', '');
            setValue('prompt', '');
            setImageEdited(respUrl ? respUrl : null);
            setIsLoadingEdited(false);
        } else {
            //show error
            showAlert('Error on upload image on mongo', setAlertSetUp);
            setValue('file', '');
            setValue('prompt', '');
            setIsLoadingEdited(false);
        }


    }
    /**
     * Go to openai api
     * @param type
     */
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