import Image from "next/image";
import Link from "next/link";

export const UploaderImage = ({ imageEdited, setImageEdited, data, reset }) => {
  console.log(data);
  return (
    <>
      <div className="w-100 m-auto text-center mt-5">
        {imageEdited !== "" && (
          <Image
            className="shadow border-2 border-accent-focus mx-auto"
            src={imageEdited}
            width={300}
            height={300}
            alt="AI"
          />
        )}
        <div
          className={`grid grid-cols-1 w-full capitalize m-auto max-w-md mt-6 mb-3 text-secondary`}
        >
          {data?.createDescription}
          {data?.prompt}
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
          <div>
            <button
              className="mt-3 w-full btn btn-primary"
              onClick={() => {
                setImageEdited("");
                reset();
              }}
            >
              Clean
            </button>
          </div>
          <div>
            <Link
              href={"/imageResult"}
              className={"mt-3 mb-5 w-full  btn btn-primary btn-active"}
            >
              Go to results
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
