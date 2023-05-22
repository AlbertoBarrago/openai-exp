/**
 * SubDescription component
 * @param description
 * @param dataLength
 * @return {JSX.Element}
 * @constructor
 */
export const SubDescription = ({description, dataLength}) => {
    return (
        <>
            <div className={`text-xl text-info mb-3`}> {description} {dataLength && (<span className={`text-sm text-neutral`}>({dataLength})</span>)} </div>
        </>
    )
}