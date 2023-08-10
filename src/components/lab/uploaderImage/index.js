import Image from "next/image";
import Link from "next/link";

export const UploaderImage = ({ imageEdited, setImageEdited, data, reset }) => {
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
              className="float-right mt-3 btn btn-primary"
              onClick={() => {
                setImageEdited("");
                reset();
              }}
            >
              <i className={`bi bi-trash`}></i> Clean result
            </button>
          </div>
          <div>
            <Link
              href={"/imageResult"}
              className={"mt-3 mb-5 btn btn-primary btn-active float-left"}
            >
              <i className={`bi bi-link`}></i> Open result
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
