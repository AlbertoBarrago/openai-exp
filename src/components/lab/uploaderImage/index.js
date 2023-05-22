import Image from "next/image";
import Link from "next/link";

export const UploaderImage = ({imageEdited, setImageEdited, setValue, isLoading}) => {
        return (
            <>
                <div className="w-100 m-auto text-center mt-5">
                    {imageEdited !== '' && (
                        <Image className="shadow border-2 border-accent-focus mx-auto"
                               src={imageEdited}
                               loader={isLoading}
                               width={300}
                               height={300} alt="AI"/>)}
                    <div className={`grid grid-cols-1`}></div>
                    <div className={`grid grid-cols-1 md:grid-cols-2`}>
                        <div>
                            <button className="mt-3 mb-5 m-auto btn btn-wide"
                                    onClick={() => {
                                        setImageEdited('')
                                        setValue('createDescription', '')
                                    }
                                    }>
                                Clean
                            </button>
                        </div>
                        <div>
                            <Link
                                href={'/result'}
                                className={"mt-3 mb-5 m-auto btn btn-wide"}>
                               Go to results
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
}