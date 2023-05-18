import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <main className="flex justify-center h-screen items-center">
                <SignUp/>
            </main>
        </>
    );
}