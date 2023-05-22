export const LoadMore = ({handleLoadMore, isLoading}) => {
    return (
        <div className={`p-3 mt-4 mb-4`}>
            <button onClick={handleLoadMore} className={`btn btn-secondary`}>Load More
                {isLoading && (<> <i className="animate-spin bi bi-arrow-clockwise"></i> </>)}
            </button>
        </div>
    )
}