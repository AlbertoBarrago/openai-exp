export const GoToDashboard = ({goToDashboard}) => {
    return (
        <>
            <div className={`w-auto m-auto mb-44`}>
                <button
                    onClick={goToDashboard}
                    className={`btn btn-btn-secondary`}
                >
                    Go to dashboard
                </button>
            </div>
        </>
    )
}