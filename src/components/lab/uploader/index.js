import {LoaderComponent} from "@/components/layout/loader";

export const Uploader = ({handleSubmit, handleForm, register, errors, isLoading}) => {
    return (
        <>
            {isLoading && (
                <LoaderComponent/>
            )}
            {!isLoading && (
                <form key={2} onSubmit={handleSubmit(handleForm)}>
                    <p className="mb-4 text-red-600 p-3 rounded">Upload: .png ＜ 4MB</p>
                    <div className={`grid grid-cols-1 gap-2 mb-2`}>
                        <div>
                            <small>Select file</small> <br/>
                            {/*<label>*/}
                            {/*    <span className="btn me-1"> 📁</span>*/}
                            {/*</label>*/}
                            <input type="file"
                                   accept="image/png, image/jpeg"
                                   className="file-input w-full max-w-xs text-secondary"
                                   {...register('file', {required: true})}/>

                            <p className="mb-2">{errors.file && (
                                <span className="text-red-600">This File is required</span>)}</p>
                        </div>
                        <div>
                            <small>Choose mask</small> <br/>
                            {/*<label>*/}
                            {/*    <span className="btn me-1">👺</span>*/}
                            {/*</label>*/}
                            <input type="file"
                                   accept="image/png, image/jpeg"
                                   placeholder={"Mask"}
                                   className="file-input w-full max-w-xs text-secondary"
                                   {...register('mask', {required: true})}/>

                            <p className="mb-2">{errors.mask && (
                                <span className="text-red-600">This Mask is required</span>)}</p>
                        </div>
                    </div>

                    <p className={`m-auto w-5/6 mb-5`}> For create an accurate image give some instructions properly; like style, texture etc...</p>
                    <textarea placeholder="Less than 1000 chars"
                              className="textarea textarea-primary w-full max-w-xs mb-2 border-2 border-white"
                              {...register('prompt', {required: true})}/>

                    <p className="mb-2">{errors.prompt && (
                        <span className="text-red-600">This field is required</span>)}</p>

                    <input className="mt-2 mb-5 cursor-pointer btn btn-secondary" type="submit"/>
                </form>
            )}
        </>
    )
}