"use client";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import {
  checkIfHasLessThan1000Chars,
  scrollToTop,
  showAlert,
  showConfettiForSeconds,
} from "../../../../modules/utils";
import { AlertComponent } from "@/components/shared/alert";
import Confetti from "react-confetti";
import { UploaderImage } from "@/components/lab/uploaderImage";
import { useContext, useState } from "react";
import { Title } from "@/components/layout/title";
import { CreateImage } from "@/components/lab/createImage";
import { DescriptionTitle } from "@/components/lab/title";
import { SubDescription } from "@/components/lab/subDescription";

import { AppContext } from "@/app/context/appContext";
import { LoaderComponent } from "@/components/layout/loader";

const confettiDuration = 5;

export default function LabImage() {
  const { isLoaded, isSignedIn, userId } = useAuth(),
    { appState } = useContext(AppContext),
    [isLoadingCreate, setIsLoadingCreate] = useState(false),
    [confettiWidth, setConfettiWidth] = useState(0),
    [confettiHeight, setConfettiHeight] = useState(0),
    [alertSetUp, setAlertSetUp] = useState({ show: false, message: "" }),
    [imageCreated, setImageCreated] = useState(""),
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
    // const urlImageByOpenai = await createImageOpenai(data.createDescription);
    //use api folder
    const resp = await fetch(`api/openai/image/create/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: data?.createDescription,
      }),
    });
    if (!resp.ok) {
      //show error
      scrollToTop();
      showAlert("Error on upload openai", setAlertSetUp);
      resetCreate();
      setIsLoadingCreate(false);
    }
    const urlImageByOpenai = await resp.json();
    //get image
    const urlFromCloudinary = await uploadOnCloudinary(
      urlImageByOpenai.urlImage
    );
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

  const goToOpenaiApi = (type) => {
    window.open(
      `//platform.openai.com/docs/api-reference/images/${type.toString()}`,
      "_blank"
    );
  };

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
              <div className={`w-auto m-auto mb-10`}>
                <AlertComponent message={alertSetUp.message} type={"error"} />
              </div>
            )}
          </div>
          <div className={`grid grid-cols-1 text-center`}>
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
          </div>
        </main>
      </>
    );
  };

  return <>{useLabTemplate()}</>;
}
