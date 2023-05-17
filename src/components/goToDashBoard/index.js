export const GoToDashBoard = ({goToDashboard}) => {
    return (
        <>
            <div className={`w-auto m-auto mb-10`}>
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