'use client';
import Image from 'next/image'
import {
    checkIfIsGreaterThan4MB,
    convertJpgToPng,
    editImage,
    editImageOpenai
} from "../../utils/utils";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function Home() {
    const [imageEdited, setImageEdited] = useState('');
    const {setValue, register, handleSubmit, formState: {errors}} = useForm();
    const handleForm = (data) => {
        if(checkIfIsGreaterThan4MB(data.file) || data.file.type !== 'image/png') {
            alert('File is greater than 4MB or is not a png file');
            setValue('file', '');
            return;
        }
         void editImage(data.file, data.prompt, setImageEdited);
    }


    return (
        <main className="flex min-h-screen text-center flex-col items-center justify-between p-10">
            <h1 className="text-[3rem] mb-10">TEST api edit Image</h1>

            <form onSubmit={handleSubmit(handleForm)}>
                <p className="mb-4">Upload .png file ＜ 4MB</p>
                <input type="file"
                       placeholder="Upload png < 4MB"
                       className="file-input w-full max-w-xs mb-2"
                       {...register('file', {required: true})}/>

                <p>{errors.file && (<span>This File is required</span>)}</p>
                <input type="text" placeholder="Type here"
                       className="input w-full max-w-xs mb-2"
                       {...register('prompt',  { required: true })}/>
                <p>{errors.prompt && (<span>This field is required</span>)}</p>
                <input className="mt-5 cursor-pointer" type="submit" />
            </form>
            <div className="flex m-auto flex-col p-4">
                {imageEdited !== '' && (<Image src={imageEdited} width={600} height={600} alt="AI" />)}
            </div>
        </main>
    )
}
