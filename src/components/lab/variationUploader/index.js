import {LoaderComponent} from "@/components/layout/loader";

export const UploaderVariation = ({handleSubmit, handleForm, register, errors, isLoading}) => {
    return (
        <>
            {isLoading && (
                <LoaderComponent/>
            )}
            {!isLoading && (
                <form key={2} onSubmit={handleSubmit(handleForm)}>
                    <p className="mb-4 text-red-600 p-3 rounded">Upload: .png ＜ 4MB</p>
                    <div className={`grid grid-cols-1 mb-2`}>
                        <div>
                            <small>Select file</small>
                            <br/>
                            <input type="file"
                                   accept="image/png"
                                   className="file-input w-full max-w-xs text-secondary"
                                   {...register('file', {required: true})}/>

                            <p className="mb-2">{errors.file && (
                                <span className="text-red-600">This File is required</span>)}</p>
                        </div>
                    </div>

                    <input className="mt-2 mb-5 cursor-pointer btn btn-secondary" type="submit"/>
                </form>
            )}
        </>
    )
}