'use client'
import {getText} from "@/lib/openai-api";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {Input, Textarea} from "react-daisyui";
import {Title} from "@/components/layout/title";
import {SubDescription} from "@/components/lab/subDescription";
import Confetti from "react-confetti";
import {showConfettiForSeconds} from "../../../modules/utils";

export default function TextPage() {
    const [confettiHeight, setConfettiHeight] = useState(0);
    const [confettiWidth, setConfettiWidth] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const  {
        setValue,
        reset,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            text: ''
        }
    });
    const getTextFromOpenAi = async (data) => {
        getText(data.text).then(resp => {
            showConfettiForSeconds(5, setConfettiHeight, setConfettiWidth)
            setValue('textFromOpenai', resp);
            setShowSuccess(true);
        });
    }

    const cleanForm = (e) => {
        e.preventDefault();
        setShowSuccess(false);
        reset();
    }

    return (
        <>
            <main className={`container mx-auto text-center w-100 p-2`}>
                <Confetti width={confettiWidth} height={confettiHeight} numberOfPieces={100}/>
                <Title title={'OpenAi'} subTitle={'text'}/>
                <SubDescription description={'Here you can test the Text generation API'}/>
                   <div className={`flex flex-col justify-center items-center`}>
                       <form className={`w-8/12`} onSubmit={handleSubmit(getTextFromOpenAi)}>
                           <label className={`label`}>
                               <span className={`label-text`}>Make it clear what you want...</span>
                           </label>
                           <Textarea placeholder={`Write something...`} className={`textarea w-full`} {...register('text', {required: true})} />
                           <button className={`btn btn-default mt-2 me-2`} onClick={cleanForm}>Clean </button>
                           <button className={`btn btn-primary mt-2`} type={'submit'}>Send </button>
                       </form>
                   </div>
                {showSuccess && (
                    <div className={`flex mt-2 flex-col justify-center items-center`}>
                        <Input {...register('textFromOpenai')} className={`input w-8/12`} disabled={true}/>
                    </div>
                )}
            </main>
        </>
    )
}