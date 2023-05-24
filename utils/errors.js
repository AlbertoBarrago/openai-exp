/**
 * Renders an error message based on the error code.
 * @param errorCode
 * @return {JSX.Element}
 */
export const renderErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 401:
            return (
                <div>
                    <h2>Invalid Authentication</h2>
                    <p>Cause: Invalid Authentication</p>
                    <p>Solution: Ensure the correct API key and requesting organization are being used.</p>
                </div>
            );
        case 429:
            return (
                <div>
                    <h2>Rate Limit Reached</h2>
                    <p>Cause: You are sending requests too quickly.</p>
                    <p>Solution: Pace your requests. Read the Rate limit guide.</p>
                </div>
            );
        case 500:
            return (
                <div>
                    <h2>Server Error</h2>
                    <p>Cause: Issue on our servers.</p>
                    <p>Solution: Retry your request after a brief wait and contact us if the issue persists. Check the status page.</p>
                </div>
            );
        default:
            return (
                <div>
                    <h2>Error</h2>
                    <p>An error occurred. Please try again later.</p>
                </div>
            );
    }
};