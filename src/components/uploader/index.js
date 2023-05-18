export const Uploader = ({handleSubmit, handleForm, register , errors}) => {
    return (
        <>
            <form key={2} onSubmit={handleSubmit(handleForm)}>
                <p className="mb-4 text-red-600 p-3 animate-pulse rounded">Upload a transparent .png or .jpeg ＜ 4MB</p>
                <input type="file"
                       accept="image/png, image/jpeg"
                       className="file-input text-secondary w-full max-w-xs mb-2"
                       {...register('file', {required: true})}/>

                <p className="mb-2">{errors.file && (
                    <span className="text-red-600">This File is required</span>)}</p>

                <input type="text" placeholder="Type here"
                       className="input w-full max-w-xs mt-3 mb-2 border-2 border-white"
                       {...register('prompt', {required: true})}/>

                <p className="mb-2">{errors.prompt && (
                    <span className="text-red-600">This field is required</span>)}</p>

                <input className="mt-2 cursor-pointer btn btn-default" type="submit"/>
            </form>
        </>
    )
}