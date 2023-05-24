import {LoaderComponent} from "@/components/layout/loader";

function LoadingSkeleton() {
    return (
        <>
            <main className={`grid grid-cols-1 mb-56`}>
                <LoaderComponent/>
            </main>
        </>
    )
}

export default function Loading() {
    return <LoadingSkeleton />;
}