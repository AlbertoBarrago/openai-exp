import {LoaderComponent} from "@/components/layout/loader";

export const CreateImage =({handleSubmitCreate, handleCreateForm, registerCreate, errorsCreate, isLoadingCreate}) => {
    return (
        <>
            <form key={1} onSubmit={handleSubmitCreate(handleCreateForm)}>
                <p className="mb-4 text-primary text-xl p-3 rounded">Limit: ＜ 1000 chars </p>
                <p className={`m-auto w-full max-w-md mb-5`}>
                    <i>{`The more detailed the description, 
                    the more likely you are to get the result that you want.`}</i>
                   </p>
                <textarea placeholder="Less than 1000 chars"
                       className="textarea textarea-primary w-full max-w-md h-36 mb-2 border-2 border-primary"
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