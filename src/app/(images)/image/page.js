"use client";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import {
  checkIfHasLessThan1000Chars,
  checkIfIsGreaterThan4MB,
  scrollToTop,
  showAlert,
  showConfettiForSeconds,
} from "../../../../modules/utils";
import { AlertComponent } from "@/components/shared/alert";
import Confetti from "react-confetti";
import { Uploader } from "@/components/lab/uploaderMask";
import { UploaderImage } from "@/components/lab/uploaderImage";
import { useContext, useState } from "react";
import { Title } from "@/components/layout/title";
import { CreateImage } from "@/components/lab/createImage";
import { DescriptionTitle } from "@/components/lab/title";
import { UploaderVariation } from "@/components/lab/variationUploader";
import { SubDescription } from "@/components/lab/subDescription";
import {
  createImageOpenai,
  editImageOpenai,
  produceImageVariations,
} from "@/lib/openai-api";
import { AppContext } from "@/app/context/AppContext";

const confettiDuration = 5;

export default function LabImage() {
  const { isLoaded, isSignedIn, userId } = useAuth(),
    { appState } = useContext(AppContext),
    [isLoadingEdited, setIsLoadingEdited] = useState(false),
    [isLoadingCreate, setIsLoadingCreate] = useState(false),
    [isLoadingVariation, setIsLoadingVariation] = useState(false),
    [confettiWidth, setConfettiWidth] = useState(0),
    [confettiHeight, setConfettiHeight] = useState(0),
    [alertSetUp, setAlertSetUp] = useState({ show: false, message: "" }),
    [imageEdited, setImageEdited] = useState(""),
    [imageCreated, setImageCreated] = useState(""),
    [imageVariation, setImageVariation] = useState(""),
    [dataFromForm, setDataFromForm] = useState({
      create: {},
      edit: {},
      variation: {},
    }),
    {
      setValue: setValueCreate,
      reset: resetCreate,
      register: registerCreate,
      handleSubmit: handleSubmitCreate,
      formState: { errors: errorsCreate },
    } = useForm(),
    {
      setValue: setValueVariation,
      reset: resetVariation,
      register: registerVariation,
      handleSubmit: handleSubmitVariation,
      formState: { errors: errorsVariation },
    } = useForm(),
    {
      setValue: setValueEdit,
      reset: resetEdit,
      register: registerEdit,
      handleSubmit: handleSubmitEdit,
      formState: { errors: errorsEdit },
    } = useForm();

  /**
   * Handle upload image on cloudinary
   * @param imageUrl
   * @return {Promise<*>}
   */
  const uploadOnCloudinary = async (imageUrl) => {
    try {
      const cloudResp = await fetch(`api/cloudinary/insertByUrl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
        }),
      });

      const result = await cloudResp.json();
      return result.data;
    } catch (e) {
      console.error("error on upload image on cloudinary", e);
    }
  };
  /**
   * Handle insert image on mongo
   * @param imageUrl
   * @param title
   * @param type
   * @return {Promise<object>}
   */
  const insertImageOnMongo = async (imageUrl, title, type) => {
    if (!imageUrl) {
      showAlert("Image url is required", setAlertSetUp);
      return;
    }
    let body = {
      urlImage: imageUrl,
      userId: userId,
      title: title ? title : "random title",
      creationDate: new Date().getTime(),
      type,
    };
    try {
      const response = await fetch("api/mongo/insert/images", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.error("error on get image on mongo", e);
      return null;
    }
  };
  /**
   * Handle create image
   * @param data
   * @return {Promise<void>}
   */
  const handleCreateForm = async (data) => {
    const isValid = checkIfHasLessThan1000Chars(data.createDescription);
    if (!isValid) {
      showAlert("Description must be less than 1000 chars", setAlertSetUp);
      setValueCreate("createDescription", "");
      return;
    }
    //set data form
    setDataFromForm({ ...dataFromForm, create: data });
    //loader
    setIsLoadingCreate(true);
    //create image
    const urlImageByOpenai = await createImageOpenai(data.createDescription);
    if (!urlImageByOpenai) {
      //show error
      scrollToTop();
      showAlert("Error on upload openai", setAlertSetUp);
      resetCreate();
      setIsLoadingCreate(false);
    }
    //get image
    const urlFromCloudinary = await uploadOnCloudinary(urlImageByOpenai);
    //insert image on mongo
    const mongoCall = await insertImageOnMongo(
      urlFromCloudinary?.url,
      data.createDescription,
      "created"
    );
    if (mongoCall.success) {
      //set image
      setImageCreated(urlFromCloudinary?.url);
      setIsLoadingCreate(false);
      //show confetti
      if (!appState.isMobile) {
        showConfettiForSeconds(
          confettiDuration,
          setConfettiWidth,
          setConfettiHeight
        );
      }
    }
    if (!mongoCall.success) {
      //show error
      showAlert("Error on upload image on mongo", setAlertSetUp);
      resetCreate();
      setIsLoadingCreate(false);
    }
  };
  /**
   * Handle variation image
   * @param data
   * @return {Promise<void>}
   */
  const handleVariationForm = async (data) => {
    setIsLoadingVariation(true);
    //check if file is png or jpeg
    if (
      data.file[0].type !== "image/png" &&
      data.file[0].type !== "image/jpeg"
    ) {
      showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
      setValueVariation("file", "");
      setIsLoadingVariation(false);
      return;
    }
    // check if file is greater than 4MB
    if (checkIfIsGreaterThan4MB(data.file)) {
      showAlert("File is greater than 4MB", setAlertSetUp);
      setValueVariation("file", "");
      setIsLoadingVariation(false);
      return;
    }
    // Start openai variation
    const respUrl = await produceImageVariations(data, userId);
    if (!respUrl) {
      showAlert("Error on upload image", setAlertSetUp);
      setValueVariation("file", "");
      setIsLoadingVariation(false);
      return;
    }
    //set data form
    setDataFromForm({ ...dataFromForm, variation: data });
    //insert image on cloudinary
    const urlFromCloudinary = await uploadOnCloudinary(respUrl);
    //insert image on mongo
    const mongoCall = await insertImageOnMongo(
      urlFromCloudinary.url,
      data.file[0].name,
      "variation"
    );
    if (mongoCall.success) {
      //show success
      setIsLoadingVariation(false);
      setValueVariation("file", "");
      setImageVariation(respUrl);
      if (!appState.isMobile)
        showConfettiForSeconds(
          confettiDuration,
          setConfettiWidth,
          setConfettiHeight
        );
    }
    if (!mongoCall.success) {
      //show error
      showAlert("Error on upload image on mongo", setAlertSetUp);
      setValueVariation("file", "");
      setIsLoadingVariation(false);
    }
  };
  /**
   * Handle edit image
   * @param data
   * @return {Promise<void>}
   */
  const handleEditForm = async (data) => {
    setIsLoadingEdited(true);
    //check if file is png or jpeg
    if (data.file[0].type !== "image/png") {
      showAlert(`Type ${data.file[0].type} not allow`, setAlertSetUp);
      setValueEdit("file", "");
      setIsLoadingEdited(false);
      return;
    }
    //check if prompt is less than 1000 chars
    if (!checkIfHasLessThan1000Chars(data.prompt)) {
      showAlert("Prompt must be less than 1000 chars", setAlertSetUp);
      setValueEdit("prompt", "");
      setIsLoadingEdited(false);
      if (!appState.isMobile)
        showConfettiForSeconds(
          confettiDuration,
          setConfettiWidth,
          setConfettiHeight
        );
      return;
    }
    //check if file is less than 4MB
    if (checkIfIsGreaterThan4MB(data.file)) {
      showAlert("File is greater than 4MB", setAlertSetUp);
      setValueEdit("file", "");
      setIsLoadingEdited(false);
      if (!appState.isMobile)
        showConfettiForSeconds(
          confettiDuration,
          setConfettiWidth,
          setConfettiHeight
        );
      return;
    }
    //set data form
    setDataFromForm({ ...dataFromForm, edit: data });
    //Start openai edit
    const respUrl = await editImageOpenai(data);
    if (!respUrl) {
      scrollToTop();
      showAlert("Error on edit image", setAlertSetUp);
      resetEdit();
      setIsLoadingVariation(false);
      return;
    }
    //insert image on cloudinary
    const urlFromCloudinary = await uploadOnCloudinary(respUrl);
    //insert image on mongo
    const mongoCall = await insertImageOnMongo(
      urlFromCloudinary.url,
      data.prompt,
      "edited"
    );
    //check if success
    if (mongoCall.success) {
      //set success
      resetEdit();
      setImageEdited(respUrl);
      setIsLoadingEdited(false);
      if (!appState.isMobile)
        showConfettiForSeconds(
          confettiDuration,
          setConfettiWidth,
          setConfettiHeight
        );
    }
    if (!mongoCall.success) {
      //show error
      showAlert("Error on upload image on mongo", setAlertSetUp);
      resetEdit();
      setIsLoadingEdited(false);
    }
  };
  /**
   * Go to openai api
   * @param type
   */
  const goToOpenaiApi = (type) => {
    window.open(
      `//platform.openai.com/docs/api-reference/images/${type.toString()}`,
      "_blank"
    );
  };
  /**
   * Check auth
   * @return {JSX.Element}
   */
  const useLabTemplate = () => {
    if (!isLoaded || !isSignedIn) {
      return <RedirectToSignIn />;
    }
    return (
      <>
        <main className="container mx-auto text-center w-100 p-2">
          <Confetti
            width={confettiWidth}
            height={confettiHeight}
            numberOfPieces={100}
          />
          <div className={`grid grid-cols-1 text-center`}>
            <Title title={"OpenAi"} subTitle={"Lab"} />
            <SubDescription
              description={"Here you can test the Image generation API"}
            />
            {alertSetUp.show && (
              <>
                <div className={`w-auto m-auto mb-10`}>
                  <AlertComponent message={alertSetUp.message} type={"error"} />
                </div>
              </>
            )}
          </div>
          <div className={`grid grid-cols-1 xl:grid-cols-3 text-center`}>
            {/*Create ----------*/}
            <div className="p-3 rounded m-5">
              <DescriptionTitle
                goToOpenaiApi={goToOpenaiApi}
                h3={"Create Image"}
                h4={"Here, we are testing:"}
                apiUrl={"POST .../v1/textResult/generations"}
                type={"create"}
              />

              {imageCreated === "" && (
                <CreateImage
                  registerCreate={registerCreate}
                  handleCreateForm={handleCreateForm}
                  errorsCreate={errorsCreate}
                  handleSubmitCreate={handleSubmitCreate}
                  isLoadingCreate={isLoadingCreate}
                />
              )}
              {imageCreated !== "" && (
                <UploaderImage
                  isLoading={isLoadingCreate}
                  imageEdited={imageCreated}
                  reset={resetCreate}
                  setImageEdited={setImageCreated}
                  data={dataFromForm.create}
                />
              )}
            </div>
            {/*Edit ----------*/}
            <div className="p-3 rounded m-5">
              <DescriptionTitle
                goToOpenaiApi={goToOpenaiApi}
                h3={"Edit Image"}
                h4={"Produce a mask and start to edit your image:"}
                apiUrl={".../v1/textResult/edits"}
                type={"create-edit"}
              />
              {imageEdited === "" && (
                <>
                  <Uploader
                    errors={errorsEdit}
                    handleForm={handleEditForm}
                    handleSubmit={handleSubmitEdit}
                    register={registerEdit}
                    isLoading={isLoadingEdited}
                  />
                </>
              )}
              {imageEdited !== "" && (
                <>
                  <UploaderImage
                    isLoading={isLoadingEdited}
                    imageEdited={imageEdited}
                    reset={resetEdit}
                    setImageEdited={setImageEdited}
                    data={dataFromForm.edit}
                  />
                </>
              )}
            </div>
            {/*Variation ----------*/}
            <div className="p-3 rounded m-5">
              <DescriptionTitle
                goToOpenaiApi={goToOpenaiApi}
                h3={"Create Variation"}
                h4={"Upload an image to create a variation of it:"}
                apiUrl={".../v1/textResult/variation"}
                type={"create-variation"}
              />
              {imageVariation === "" && (
                <>
                  <UploaderVariation
                    errors={errorsVariation}
                    handleForm={handleVariationForm}
                    handleSubmit={handleSubmitVariation}
                    register={registerVariation}
                    isLoading={isLoadingVariation}
                  />
                </>
              )}
              {imageVariation !== "" && (
                <>
                  <UploaderImage
                    isLoading={isLoadingVariation}
                    imageEdited={imageVariation}
                    reset={resetVariation}
                    setImageEdited={setImageVariation}
                    data={dataFromForm.variation}
                  />
                </>
              )}
            </div>
          </div>
        </main>
      </>
    );
  };

  return <>{useLabTemplate()}</>;
}
