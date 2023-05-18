import {LoaderComponent} from "@/components/layout/loader";

function LoadingSkeleton() {
    return (
        <>
            <main className={`grid grid-cols-1`}>
                <LoaderComponent icon={`🐈‍⬛`}/>
            </main>
        </>
    )
}

export default function Loading() {
    return <LoadingSkeleton />;
}