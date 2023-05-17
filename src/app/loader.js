function LoadingSkeleton() {
    return (
        <div className="loader">
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__ball"/>
        </div>
    )
}

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <LoadingSkeleton />;
}