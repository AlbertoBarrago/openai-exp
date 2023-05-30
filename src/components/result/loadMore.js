export const LoadMore = ({ handleLoadMore, isLoading, isDisabled }) => {
  return (
    <div className={`p-3 mt-4 mb-4`}>
      <button
        disabled={isDisabled}
        onClick={handleLoadMore}
        className={`btn btn-secondary ${isLoading ? "loading" : ""}`}
      >
        {!isDisabled && !isLoading && <p>Load More</p>}
        {isLoading && (
          <>
            {" "}
            <p>Loading...</p>{" "}
          </>
        )}
        {isDisabled && !isLoading && (
          <>
            {" "}
            <i className="bi bi-minecart me-2"></i> <p>No more images...</p>{" "}
          </>
        )}
      </button>
    </div>
  );
};
