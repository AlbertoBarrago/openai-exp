'use client';
import Image from 'next/image'
import {
    checkIfIsGreaterThan4MB, editImage, editImageOpenai,
} from "../../utils/utils";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [imageEdited, setImageEdited] = useState('');
    const {setValue, register, handleSubmit, formState: {errors}} = useForm();
    const handleForm = (data) => {
        setIsLoading(true);
        if (checkIfIsGreaterThan4MB(data.file) || data.file[0].type !== 'image/png') {
            alert('File is greater than 4MB or is not a png file');
            setValue('file', '');
            setIsLoading(false);
            return;
        }
        void editImage(data.file, data.prompt, setImageEdited, setIsLoading);
    }


    return (
        <>
        <head>
            <title>Albz - OpenAi</title>
            <meta name="description" content="OpenAi experiments"/>
        </head>
        <main className="flex min-h-screen text-center flex-col justify-between p-10">
            <h1 className="text-[3rem] mb-1">OpenAi
            <span className="text-xs">Edit image</span></h1>
            {isLoading && (<p className="text-[2rem] animate-spin">🐈‍</p>)}
            {!isLoading && !imageEdited && (
                <>
                    <form onSubmit={handleSubmit(handleForm)}>
                        <p className="mb-4 text-xs">Upload .png file ＜ 4MB</p>
                        <input type="file"
                               placeholder="Upload png < 4MB"
                               className="file-input w-full max-w-xs mb-2"
                               {...register('file', {required: true})}/>

                        <p className="mb-2 text-left">{errors.file && (
                            <span className="text-red-600">This File is required</span>)}</p>

                        <input type="text" placeholder="Type here"
                               className="input w-full max-w-xs mb-2 border-2 border-white"
                               {...register('prompt', {required: true})}/>

                        <p className="mb-2 text-left">{errors.prompt && (
                            <span className="text-red-600">This field is required</span>)}</p>

                        <input className="mt-5 cursor-pointer" type="submit"/>
                    </form>
                </>
            )}
            {imageEdited !== '' && (
                <>
                    <div className="flex m-auto text-center flex-col">
                        {imageEdited !== '' && (<Image src={imageEdited} width={600} height={600} alt="AI"/>)}
                        <button className="mt-2 m-auto btn btn-wide" onClick={() => setImageEdited('')}>Delete image</button>
                    </div>
                </>
            )}
            <footer>
                <p className="text-[0.8rem]">Made with ❤️ by <a href="https://albz.dev">albz</a></p>
            </footer>
        </main>
        </>
    )
}
