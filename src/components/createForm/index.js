export const CreateForm =({handleSubmitCreate, handleCreateForm, registerCreate, errorsCreate}) => {
    return (
        <>
            <form key={1} onSubmit={handleSubmitCreate(handleCreateForm)}>
                <p className="mb-4 text-red-600 p-3 rounded">Insert a description</p>

                <textarea placeholder="Type here"
                       className="textarea textarea-primary w-full max-w-xs mb-2 border-2 border-white"
                       {...registerCreate('createDescription', {required: true})}/>

                <p className="mb-2">{errorsCreate.createDescription && (
                    <span className="text-red-600">This field is required</span>)}</p>

                <input className="mt-2 cursor-pointer btn btn-default" type="submit"/>
            </form>
        </>
    )
}