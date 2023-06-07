"use client";
import { getText } from "@/lib/openai-api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "react-daisyui";
import { Title } from "@/components/layout/title";
import { SubDescription } from "@/components/lab/subDescription";
import Confetti from "react-confetti";
import { useAuth } from "@clerk/nextjs";
import { LoaderComponent } from "@/components/layout/loader";
import Link from "next/link";

export default function TextPage() {
  const { userId } = useAuth(),
    [confettiSetup, setConfettiSetup] = useState({
      width: 0,
      height: 0,
    }),
    [showSuccess, setShowSuccess] = useState(false),
    [showConfetti, setShowConfetti] = useState(false),
    [openaiResponse, setOpenaiResponse] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    {
      setValue,
      getValues,
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        text: "",
      },
    });

  const insertData = async (data) => {
    let request = {
      response: data.text.replace("/n", "").trim(),
      answer: getValues("text"),
      userId: userId,
      creationDate: new Date().getTime(),
    };
    const res = await fetch(`${process.env.BASE_URL}/api/mongo/insert/texts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      next: { revalidate: 10 }, // refresh every 10 second
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const getTextFromOpenAi = async (data) => {
    setIsLoading(true);
    getText(data.text).then((resp) => {
      setValue("textFromOpenai", resp);
      setOpenaiResponse(resp);
      setIsLoading(false);
      setShowSuccess(true);
      setConfettiSetup({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
    });
  };
  const cleanForm = (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setOpenaiResponse("");
    reset();
  };

  useEffect(() => {
    if (openaiResponse) {
      insertData({ text: openaiResponse }).then((resp) => {
        // console.log(resp);
      });
    }
  }, [openaiResponse]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={confettiSetup.width}
          height={confettiSetup.height}
          numberOfPieces={100}
        />
      )}
      <main
        className={`container mx-auto text-center w-100 p-2 animate__animated animate__fadeIn`}
      >
        <Title title={"OpenAi"} subTitle={"text"} />
        <SubDescription
          description={"Here you can test the Text generation API"}
        />
        <p className={`text-secondary italic mb-10`}>
          * The API is based on the GPT-3 model. You can read more about it
          <a
            href={`https://platform.openai.com/docs/guides/completion`}
            target={`_blank`}
            className={`text-primary`}
          >
            {" "}
            here
          </a>
        </p>
        <div className={`flex flex-col justify-center items-center`}>
          <form
            className={`w-10/12 m-auto md:w-8/12 lg:w-6/12`}
            onSubmit={handleSubmit(getTextFromOpenAi)}
          >
            <label className={`label`}>
              <span className={`label-text`}>
                Make it clear what you want...
              </span>
            </label>
            <Textarea
              placeholder={`Write something...`}
              className={`textarea w-full textarea-bordered border-primary`}
              {...register("text", { required: true })}
            />
            <button className={`btn btn-default mt-2 me-2`} onClick={cleanForm}>
              Clean
            </button>
            <button
              disabled={showSuccess}
              className={`btn btn-primary mt-2`}
              type={"submit"}
            >
              Send
            </button>
          </form>
        </div>
        {showSuccess && !isLoading && (
          <div
            className={`flex mt-14 flex-col justify-center items-center animate__animated animate__fadeIn`}
          >
            <label className={`label`}>
              <span className={`label-text`}>And this is the response...</span>
            </label>
            <Textarea
              {...register("textFromOpenai")}
              className={`textarea-lg w-8/12 arial h-[15rem]`}
              disabled={true}
            />
            <Link href={"textResult"} className={`mt-2 btn btn-primary`}>
              Go To Table
            </Link>
          </div>
        )}
        {isLoading && <LoaderComponent />}
      </main>
    </>
  );
}
