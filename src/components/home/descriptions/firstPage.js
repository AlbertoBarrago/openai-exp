import Image from "next/image";

export const DescriptionFirstPage = ({ router }) => {
  return (
    <>
      <article className="prose lg:prose-xl m-auto mb-5 mt-5 md:mt-22">
        <Image
          className={`m-auto cursor-pointer hover:opacity-80 rounded-full animate__animated animate__rollIn}`}
          width={230}
          height={230}
          priority={true}
          onClick={() => {
            void router.push("https://albz.dev");
          }}
          src="https://ujasntkfphywizsdaapi.supabase.co/storage/v1/object/public/content/app_logos/485244ee-9158-4685-8f1e-d349e97b35e1.png"
          alt="me"
        />
        <h3 className={`animated animate__animated animate__tada`}>
          From today GPT-4 is available for testing!
        </h3>
        <h4>Overview:</h4>
        <p>
          Welcome to my personal OpenAI API Testing project! This project is a
          side endeavor where I explore the capabilities of the OpenAI API and
          experiment with its language model. To access and test the API, you
          need to be logged in.
        </p>
        <p>The project may be change at runtime.</p>
      </article>
    </>
  );
};
