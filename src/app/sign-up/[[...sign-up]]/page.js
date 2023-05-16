import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <main className="flex justify-center text-center mt-20">
                <SignUp/>
            </main>
        </>
    );
}