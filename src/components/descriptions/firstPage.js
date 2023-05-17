import Image from "next/image";

export const DescriptionFirstPage = () => {
    return (
        <>
            <article className="prose lg:prose-xl m-auto mb-5">
                <Image
                    className={`rounded-full m-auto cursor-pointer hover:opacity-80`}
                    width={280}
                    height={280}
                    onClick={() => {
                        void router.push('https://albz.dev');
                    }}
                    src="https://i.pinimg.com/280x280_RS/7e/72/bc/7e72bc3e4275e649eb87b456eea5a641.jpg"
                    alt="me"/>
                <h4>Overview:</h4>
                <p>
                    Welcome to my personal OpenAI API Testing project! This project is a side endeavor where
                    I explore the capabilities of the OpenAI API and experiment with its language model.
                    To access and test the API, you need to be logged in.
                </p>
                <p>The project may be change at runtime.</p>
            </article>
        </>
    )
}