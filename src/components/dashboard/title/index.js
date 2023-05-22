export const DescriptionTitle = ({goToOpenaiApi, h3, h4, apiUrl, type}) => {
    return (
        <>
            <h3 className={`text-[2rem]`}>{h3}</h3>
            <article className="m-auto w-100 mb-3">
                <h4>{h4}
                    <br/>
                    <code
                        className={`text-xs md:text-[1rem] relative top-2 cursor-pointer rounded bg-primary text-red-600 p-1 mt-3`}
                        onClick={() => goToOpenaiApi(type)}>
                        {apiUrl}
                    </code>
                </h4>
            </article>
        </>
    )
}