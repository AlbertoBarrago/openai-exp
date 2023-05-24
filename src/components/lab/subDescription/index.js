/**
 * SubDescription component
 * @param description
 * @param dataLength
 * @param limit
 * @return {JSX.Element}
 * @constructor
 */
export const SubDescription = ({description, dataLength, limit}) => {
    return (
        <>
            <div className={`text-xl text-default mb-3`}> {description} {dataLength && (<span className={`text-sm text-secondary`}>({dataLength} / {limit})</span>)} </div>
        </>
    )
}