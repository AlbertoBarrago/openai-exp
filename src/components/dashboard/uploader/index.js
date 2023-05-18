export const Uploader = ({handleSubmit, handleForm, register , errors}) => {
    return (
        <>
            <form key={2} onSubmit={handleSubmit(handleForm)}>
                <p className="mb-4 text-red-600 p-3 animate-pulse rounded">Upload a .png ＜ 4MB</p>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 mb-2`}>
                    <div>
                        <small>Select a file</small>
                        <input type="file"
                               accept="image/png, image/jpeg"
                               className="file-input file-input-bordered text-secondary w-full max-w-xs mb-2"
                               {...register('file', {required: true})}/>

                        <p className="mb-2">{errors.file && (
                            <span className="text-red-600">This File is required</span>)}</p>
                    </div>
                    <div>
                        <small>Select a mask</small>
                        <input type="file"
                               accept="image/png, image/jpeg"
                               placeholder={"Mask"}
                               className="file-input file-input-bordered text-secondary w-full max-w-xs mb-2"
                               {...register('mask', {required: true})}/>

                        <p className="mb-2">{errors.mask && (
                            <span className="text-red-600">This Mask is required</span>)}</p>
                    </div>
                </div>

                <textarea placeholder="Less than 1000 chars"
                       className="textarea textarea-primary w-full max-w-xs mb-2 border-2 border-white"
                       {...register('prompt', {required: true})}/>

                <p className="mb-2">{errors.prompt && (
                    <span className="text-red-600">This field is required</span>)}</p>

                <input className="mt-2 cursor-pointer btn btn-secondary" type="submit"/>
            </form>
        </>
    )
}