import {LoaderComponent} from "@/components/layout/loader";

export const CreateImage =({handleSubmitCreate, handleCreateForm, registerCreate, errorsCreate, isLoadingCreate}) => {
    return (
        <>
            <form key={1} onSubmit={handleSubmitCreate(handleCreateForm)}>
                <p className="mb-4 text-red-600 p-3 rounded">Insert description: ＜ 1000 chars </p>
                <p className={`m-auto w-5/6 mb-5`}> For create an accurate image give some instructions properly; like style, texture etc...</p>
                <textarea placeholder="Less than 1000 chars"
                       className="textarea textarea-primary w-full max-w-xs mb-2 border-2 border-white"
                       {...registerCreate('createDescription', {required: true})}/>

                <p className="mb-2">{errorsCreate.createDescription && (
                    <span className="text-red-600">This field is required</span>)}</p>
                {isLoadingCreate && (
                    <LoaderComponent/>
                )}
                <input className="mt-2 mb-5 cursor-pointer btn btn-secondary" type="submit"/>
            </form>
        </>
    )
}