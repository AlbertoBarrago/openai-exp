/**
 * FilterResult component
 * @param handleFilter
 * @return {JSX.Element}
 * @constructor
 */
export const FilterResult = ({handleFilter}) => {
    return (
        <>
            <div className={`flex flex-row justify-center items-center`}>
                <div>
                    <button onClick={() => {
                        handleFilter('all')
                    }} className={`btn btn-primary me-2`}>All
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        handleFilter('created')
                    }} className={`btn btn-secondary me-2`}>Created
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        handleFilter('edited')
                    }} className={`btn btn-secondary me-2`}>Edited
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        handleFilter('variation')
                    }} className={`btn btn-secondary`}>Variation
                    </button>
                </div>
            </div>
        </>
    )
}