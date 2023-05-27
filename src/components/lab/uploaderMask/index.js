import {LoaderComponent} from "@/components/layout/loader";

export const Uploader = ({handleSubmit, handleForm, register, errors, isLoading}) => {
    return (
        <>
            <form key={2} onSubmit={handleSubmit(handleForm)}>
                <p className="mb-4 text-primary text-xl p-3 rounded">Limit: .png ＜ 4MB</p>
                <p className={`m-auto w-full max-w-md mb-5`}>
                    <i>{`The image edits endpoint allows you to edit and extend an image by uploading a mask.`}</i></p>
                <div className={`grid grid-cols-1 gap-2 mb-2`}>
                    <div>
                        <small>Select file</small> <br/>
                        <input type="file"
                               accept="image/png"
                               className="file-input w-full max-w-xs text-secondary"
                               {...register('file', {required: true})}/>

                        <p className="mb-2">{errors.file && (
                            <span className="text-red-600">This File is required</span>)}</p>
                    </div>
                    <div>
                        <small>Choose mask</small> <br/>
                        <input type="file"
                               accept="image/png"
                               placeholder={"Mask"}
                               className="file-input w-full max-w-xs text-secondary"
                               {...register('mask', {required: true})}/>

                        <p className="mb-2">{errors.mask && (
                            <span className="text-red-600">This Mask is required</span>)}</p>
                    </div>
                </div>

                <textarea placeholder="Less than 1000 chars"
                          className="textarea textarea-primary w-full max-w-md h-24 mb-2 border-2 border-primary mt-5"
                          {...register('prompt', {required: true})}/>

                <p className="mb-2">{errors.prompt && (
                    <span className="text-red-600">This field is required</span>)}</p>

                {isLoading && (
                    <LoaderComponent/>
                )}

                <input className="mt-2 mb-5 cursor-pointer btn btn-secondary" type="submit"/>
            </form>
        </>
    )
}